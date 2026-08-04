import ai from "../services/ai/geminiService.js";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import path from "path";
import fs from 'fs'
import { notifyForForm } from "./notifyForForm.js"
import { notifyForReview } from "./notifyForReview.js"
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js"
import { generateDocx } from "./generateDocx.js";
import uploadSolnToDrive from "./uploadSolnToDrive.js";
import { classroom } from "../services/google/googleService.js";
import getPrompt from "../services/ai/prompt.js";

export async function processWithTextExtraction(pendingAssignment, assignment, course) {

    const materials = assignment.materials
    const filesToUpload = []


    if (!materials.length) {

        await assignmentProcessing.updateOne({ assignmentId: assignment.assignmentId },
            {
                $set: {
                    aiStatus: "manual review required",
                }
            }
        )
        await notifyForReview(assignment, course)

        return

    }

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

                const pdfBuffer = fs.readFileSync(fileToUpload);

                const parser = new PDFParse({
                    data: pdfBuffer
                });

                const result = await parser.getText();

                await parser.destroy();

                content.push(`PDF:\n${result.text}`);

                break;

            case ".docx":

                const response = await mammoth.extractRawText({
                    path: fileToUpload
                });

                const docxContent = response.value.trim();

                if (docxContent) {
                    content.push(`DOCX:\n${docxContent}`);
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
        }

        console.log(err)

        return
    }

    const uploadDir = `./solutions/assignment_${assignment.assignmentId}`;
    fs.mkdirSync(uploadDir, { recursive: true });

    const uploadPath = `${uploadDir}/solution.docx`;
    const jsonResponse = JSON.parse(result);

    try {
        await generateDocx(jsonResponse, uploadPath)
    } catch (err) {
        console.log(err);
        return
    }

    await assignmentProcessing.updateOne({ assignmentId: assignment.assignmentId },

        {
            $set: {
                aiStatus: "completed",
                solutionGeneratedAt: new Date(),
                solutionPath: uploadPath

            }
        }

    )




    try {
        await uploadSolnToDrive(uploadPath, assignment, course)
    } catch (err) {
        console.error(err);
        return
    }

    console.log('success');



}