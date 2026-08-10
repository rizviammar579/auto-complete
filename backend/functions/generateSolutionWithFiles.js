import ai from "../services/ai/geminiService.js";
import { createPartFromUri } from "@google/genai"
import { uploadPDF } from './uploadPDF.js'
import mammoth from "mammoth";
import path from "path";
import { generateDocx } from "./generateDocx.js";
import fs from 'fs'
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";
import uploadSolnToDrive from "./uploadSolnToDrive.js";
import { classroom } from "../services/google/googleService.js";
import getPrompt from "../services/ai/prompt.js";
import { aiStatus } from '../../models/aiStatusSchema.js'
import { processWithTextExtraction } from "./processWithTextExtraction.js";
import { createNotification } from "../utils/createNotification.js";

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

          await processWithTextExtraction(pendingAssignment, assignment, course)

          // console.log(err);

          return;


        }

        break;

      case ".docx":

        try{
          const response = await mammoth.extractRawText({
          path: fileToUpload
        });

        const docxContent = response.value.trim();

        if (docxContent) {
          content.push(`DOCX:\n${docxContent}`);
        }
        }catch(err){
          await createNotification(
            'Text Extraction Failed',
            `${course.courseName} - ${assignment.title} could not be processed using text extraction.`,
            'warning'
          )
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

    // console.log(err);

    return
  }

  const uploadDir = `./solutions/assignment_${assignment.assignmentId}`;
  fs.mkdirSync(uploadDir, { recursive: true });

  const uploadPath = `${uploadDir}/solution.docx`;
  
  try {
    const jsonResponse = JSON.parse(result);
    await generateDocx(jsonResponse, uploadPath)
  } catch (err) {

    await createNotification(
      "DOCX Generation Failed",
      `Failed to generate a DOCX file for ${course.courseName} - ${assignment.title}. Most likely Gemini gave an invalid JSON response.`,
      "error"
    )

    // console.log(err);

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
    // console.error(err);
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




}


