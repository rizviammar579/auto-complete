import ai from "../services/AI/geminiService.js";
import { createPartFromUri } from "@google/genai"
import { uploadPDF } from './uploadPDF.js'
import mammoth from "mammoth";
import path from "path";
import { generateDocx } from "./generateDocx.js";
import fs from 'fs'
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";
import uploadSolnToDrive from "./uploadSolnToDrive.js";
import { classroom } from "../services/google/googleService.js";
import getPrompt from "../services/AI/prompt.js";
import { aiStatus } from '../../models/aiStatusSchema.js'
import { processWithTextExtraction } from "./processWithTextExtraction.js";

export async function generateSolutionWithFiles(filesToUpload, pendingAssignment, assignment, course) {



  const content = []

  const prompt = getPrompt(assignment, course)

  content.push(prompt)


  for (const fileToUpload of filesToUpload) {

    const extension = path.extname(fileToUpload).toLowerCase();

    switch (extension) {
      case ".pdf":

        try {

          const file = await uploadPDF(fileToUpload, 'PDF')

          if (file.uri && file.mimeType) {
            const pdfContent = createPartFromUri(file.uri, file.mimeType);
            content.push(pdfContent);
          }

        } catch (err) {
          if (
            err.status === 429 ||
            err.code === 429 ||
            err.message?.includes("RESOURCE_EXHAUSTED")
          ) {
            const quota = await aiStatus.findOne();

            quota.fileUploadQuotaExceeded = true;

            await quota.save();

            await processWithTextExtraction(pendingAssignment, assignment, course)
          }

          console.log(err);


        }

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

    console.log(err);

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


