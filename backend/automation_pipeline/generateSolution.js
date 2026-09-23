import ai from "../services/ai/geminiService.js";
import mammoth from "mammoth";
import path from "path";
import fs from 'fs'
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";
import { aiStatus } from '../../models/aiStatusSchema.js'
import { generateDocx } from "./generateDocx.js";
import uploadSolnToDrive from "./uploadSolnToDrive.js";
import getPrompt from "../services/ai/prompt.js";
import { createNotification } from "../utils/createNotification.js";
import { solutionsDir } from "./tempDirectories.js";
import { notifyForForm } from "./notifyForForm.js"
import { notifyForReview } from "./notifyForReview.js"
import { createPartFromUri } from "@google/genai"
import { uploadPDF } from './uploadPDF.js'
import { PDFParse } from "pdf-parse";


export async function generateSolution(assignment, course) {

    const materials = assignment.materials

    if (!materials.length) {

        await notifyForReview(assignment, course)

        return false

    }

    const filesToUpload = []


    for (const material of materials) {

        switch (material.type) {

            case "driveFile":

                if (material.localPath) {
                    filesToUpload.push(material.localPath)
                }

                break;

            case "form":
                await notifyForForm(assignment, course);
                break;

            case "link":
                // future
                break;

            case "youtube":
                // future
                break;

        }

    }

    if (!filesToUpload.length) return false


    const content = []

    const prompt = getPrompt(assignment, course)

    content.push(prompt)



    let textExtractionNeeded = false

    for (const fileToUpload of filesToUpload) {

        const extension = path.extname(fileToUpload).toLowerCase();

        switch (extension) {

            case ".pdf":

                if (!textExtractionNeeded) {
                    try {

                        const file = await uploadPDF(fileToUpload, 'PDF')

                        if (file.uri && file.mimeType) {
                            const pdfContent = createPartFromUri(file.uri, file.mimeType);
                            content.push(pdfContent);
                        }
                     
                        break;

                    } catch (err) {
                        if (
                            err.status === 429 ||
                            err.code === 429 ||
                            err.message?.includes("RESOURCE_EXHAUSTED")
                        ) {
                            const quota = await aiStatus.findOne();

                            quota.fileUploadQuotaExceeded = true;

                            await quota.save();

                            await createNotification(
                                'File Upload Quota Exceeded',
                                `Gemini file upload quota has been exceeded. Files will be processed using text extraction until the quota resets.`,
                                'error'
                            )

                        }

                        await createNotification(
                            'File Upload Failed',
                            `${course.courseName} - ${assignment.title} could not be uploaded. The assignment will be processed using text extraction instead.`,
                            'warning'
                        )

                        textExtractionNeeded = true
                    }
                }



                try {

                    const pdfBuffer = fs.readFileSync(fileToUpload);

                    const parser = new PDFParse({
                        data: pdfBuffer
                    });

                    const result = await parser.getText();

                    await parser.destroy();

                    content.push(`PDF:\n${result.text}`);
                 
                } catch (err) {

                    await createNotification(
                        'Text Extraction Failed',
                        `${course.courseName} - ${assignment.title} could not be processed using text extraction.`,
                        'warning'
                    )

                    return false;

                }

                break;

            case ".docx":

                try {
                   
                    const response = await mammoth.extractRawText({
                        path: fileToUpload
                    });

                    const docxContent = response.value.trim();

                    if (docxContent) {
                        content.push(`DOCX:\n${docxContent}`);
                    }

                } catch (err) {

                    await createNotification(
                        'Text Extraction Failed',
                        `${course.courseName} - ${assignment.title} could not be processed using text extraction.`,
                        'warning'
                    )

                    return false;
                }

                break;

            default:

                continue;
        }



    }


    let result

    try {
     
        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: content,
        });

        result = response.candidates?.[0]?.content?.parts?.[0]?.text;
       

        if (!result) return false;

    } catch (err) {

        if (
            err.status === 429 ||
            err.code === 429 ||
            err.message?.includes("RESOURCE_EXHAUSTED")
        ) {
            const quota = await aiStatus.findOne();

            quota.aiQuotaExceeded = true;

            await quota.save();

            await createNotification(
                'AI Quota Exceeded',
                `Gemini daily usage limit has been exceeded. Try again tomorrow.`,
                'error'
            )

        }

        else if (
            err.status === 503 ||
            err.code === 503 ||
            err.message?.includes("UNAVAILABLE")
        ) {
            await createNotification(
                'Gemini Temporarily Unavailable',
                `The selected Gemini model is currently unavailable due to high traffic. The assignment could not be processed at this time.`,
                'warning'
            )
        }

        console.log(err);

        return false
    }

    const uploadDir = path.join(solutionsDir, `assignment_${assignment.assignmentId}`);
    fs.mkdirSync(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, `solution.docx`)

    try {

        const jsonResponse = JSON.parse(result);
        await generateDocx(jsonResponse, uploadPath)
        
    } catch (err) {
        
        await createNotification(
            "DOCX Generation Failed",
            `Failed to generate a DOCX file for ${course.courseName} - ${assignment.title}. Most likely Gemini gave an invalid JSON response.`,
            "error"
        )

        return false;
    }


    try {
        
        await uploadSolnToDrive(uploadPath, assignment, course)
       
    } catch (err) {
        
        await createNotification(
            "Drive Upload Failed",
            `The generated DOCX for ${course.courseName} - ${assignment.title} could not be uploaded to Google Drive. The solution was not saved to Drive.`,
            "warning"
        )

        return false;
    }


    await assignmentProcessing.updateOne({ assignmentId: assignment.assignmentId },

        {
            $set: {
                aiStatus: "GENERATED",
                solutionGeneratedAt: new Date()
            }
        }

    )


    await createNotification(
        'AI Solution Generated',
        `AI solution generated and uploaded to drive for ${course.courseName} - ${assignment.title}`,
        'success'
    )

    return true;



}