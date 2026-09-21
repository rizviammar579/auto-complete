import ai from "../services/ai/geminiService.js";
import mammoth from "mammoth";
import path from "path";
import fs from 'fs'
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js"
import { aiStatus } from '../../models/aiStatusSchema.js'
import { generateDocx } from "./generateDocx.js";
import uploadSolnToDrive from "./uploadSolnToDrive.js";
import getPrompt from "../services/ai/prompt.js";
import { createNotification } from "../utils/createNotification.js";
import { cleanupAssignmentDirectories, solutionsDir } from "./tempDirectories.js";
import { notifyForForm } from "./notifyForForm.js"
import { notifyForReview } from "./notifyForReview.js"
import { PDFParse } from "pdf-parse";


export async function processWithTextExtraction(pendingAssignment, assignment, course) {

    const materials = assignment.materials


    if (!materials.length) {

        await notifyForReview(assignment, course)

        return

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
                await notifyForForm(material, assignment, course);
                break;

            case "link":
                // future
                break;

            case "youtube":
                // future
                break;

        }

    }

    if (!filesToUpload.length) return


    const content = []

    const prompt = getPrompt(assignment, course)

    content.push(prompt)


    for (const fileToUpload of filesToUpload) {

        const extension = path.extname(fileToUpload).toLowerCase();

        switch (extension) {
            case ".pdf":

                try {
                    const pdfBuffer = fs.readFileSync(fileToUpload);

                    const parser = new PDFParse({
                        data: pdfBuffer
                    });

                    const result = await parser.getText();

                    await parser.destroy();

                    content.push(`PDF:\n${result.text}`);
                } catch (err) {
                    // console.log(err);

                    await createNotification(
                        'Text Extraction Failed',
                        `${course.courseName} - ${assignment.title} could not be processed using text extraction.`,
                        'warning'
                    )

                    return;

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
                    // console.log(err);

                    await createNotification(
                        'Text Extraction Failed',
                        `${course.courseName} - ${assignment.title} could not be processed using text extraction.`,
                        'warning'
                    )

                    return;

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


        result = response.candidates[0].content.parts[0].text


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

        // console.log(err)

        return
    }

    const uploadDir = path.join(solutionsDir,`assignment_${assignment.assignmentId}`);
  fs.mkdirSync(uploadDir, { recursive: true });

  const uploadPath = path.join(uploadDir,`solution.docx`)


    try {
        const jsonResponse = JSON.parse(result);
        await generateDocx(jsonResponse, uploadPath)
    } catch (err) {
        console.log(err);
        await createNotification(
            "DOCX Generation Failed",
            `Failed to generate a DOCX file for ${course.courseName} - ${assignment.title}. Most likely Gemini gave an invalid JSON response`,
            "error"
        )
        return
    }

    await assignmentProcessing.updateOne({ assignmentId: assignment.assignmentId },

        {
            $set: {
                aiStatus: "GENERATED",
                solutionGeneratedAt: new Date(),
                solutionPath: uploadPath

            }
        }

    )




    try {
        await uploadSolnToDrive(uploadPath, assignment, course)
    } catch (err) {
        console.error(err);
        await createNotification(
            "Drive Upload Failed",
            `The generated DOCX for ${course.courseName} - ${assignment.title} could not be uploaded to Google Drive. The solution was not saved to Drive.`,
            "warning"
        )
        return
    }

    await createNotification(
        'AI Solution Generated',
        `AI solution generated and uploaded to drive for ${course.courseName} - ${assignment.title}`,
        'success'
    )

    await cleanupAssignmentDirectories(assignment.assignmentId)

}