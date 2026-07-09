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

export async function generateSolutionWithFiles(filesToUpload, assignment, course) {



  const content = []

  const prompt = `
Course: ${course.courseName}

Assignment: ${assignment.title}

Description:
${assignment.description}

ROLE:
You are an experienced professor from a Tier-1 engineering college preparing a submission-ready assignment for a university student.

OBJECTIVE:
- Produce a complete, well-structured assignment.
- Optimize for academic marks.
- Decide the appropriate answer length yourself.
- Maintain a formal academic tone.
- The response will be directly converted into a professionally formatted DOCX document.
- Do not include greetings, notes, explanations or conversational text.

OUTPUT REQUIREMENTS:
- Return ONLY one valid JSON object.
- Do NOT use Markdown.
- Do NOT wrap the JSON inside backticks.
- The response must be directly parseable using JSON.parse().
- If source code is required, place it inside a paragraph element using plain text.

Allowed element types:
- heading
- paragraph
- bullet_list
- numbered_list
- table

Heading levels allowed:
- 1
- 2
- 3

IMPORTANT PARAGRAPH RULES

Every paragraph MUST use "runs".

Each run has the format:

{
  "text":"string",
  "bold":true|false
}

Use bold=true only for:
- Definitions
- Important terms
- Keywords
- Formula names
- Laws
- Software names
- Headings inside paragraphs
- Important concepts

Example:

{
  "type":"paragraph",
  "runs":[
    {
      "text":"Definition: ",
      "bold":true
    },
    {
      "text":"Open Source Software is software whose source code..."
    }
  ]
}

TABLE RULES

Whenever information is naturally tabular (comparison, differences, classifications, feature matrix, advantages/disadvantages, software categories etc.) use a table instead of bullet points.

JSON SCHEMA

{
  "title":"string",

  "elements":[

    {
      "type":"heading",
      "level":1,
      "text":"string"
    },

    {
      "type":"paragraph",
      "runs":[
        {
          "text":"string",
          "bold":false
        }
      ]
    },

    {
      "type":"bullet_list",
      "items":[
        "string"
      ]
    },

    {
      "type":"numbered_list",
      "items":[
        "string"
      ]
    },

    {
      "type":"table",

      "headers":[
        "string"
      ],

      "rows":[
        [
          "string"
        ]
      ]
    }

  ]

}

Return exactly one JSON object.
`;


  content.push(prompt)


  for (const fileToUpload of filesToUpload) {

    const extension = path.extname(fileToUpload).toLowerCase();

    if (extension === '.pdf') {

      try {

        const file = await uploadPDF(fileToUpload, 'PDF')

        if (file.uri && file.mimeType) {
          const pdfContent = createPartFromUri(file.uri, file.mimeType);
          content.push(pdfContent);
        }

      } catch (err) {
        console.error(err);
      }

    }
    else {

      const response = await mammoth.extractRawText({
        path: fileToUpload
      });

      const docxContent = response.value;

      content.push(`DOCX : ${docxContent}`)

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

    console.log(err)

    return
  }

  const uploadDir = `./solutions/assignment_${assignment.assignmentId}`;
  await fs.mkdirSync(uploadDir, { recursive: true });

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
  await uploadSolnToDrive(uploadPath, assignment,course)
  } catch (err) {
    console.error(err);
    return
  }

  console.log('success');
  


  




}


