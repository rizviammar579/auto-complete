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

Description: ${assignment.description}

ROLE:
You are a part of assignment automation workflow, behave like an experienced professor from a Tier-1 engineering college preparing a submission-ready assignment for a university student.

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
- The response must be directly parseable using JSON.parse().Double check the response so that it does not cause error while doing JSON.parse().

PROGRAMMING QUESTION RULES

If the assignment asks to:
- Write a program
- Write code
- Implement an algorithm
- Write a function
- Solve using C/C++/Java/Python/C#/JavaScript/etc.

Then:

- Return ONLY the source code.
- Do NOT explain the code.
- Just write question number and its respective answer. NOT like this - "Q3) Kingdom Inheritance System (ThroneInheritance)"
- Do NOT provide an algorithm.
- Do NOT provide a dry run.
- Do NOT provide complexity analysis.
- Do NOT provide headings such as "Explanation", "Output", or "Conclusion".
- The response should consist of a single code_block element unless the question explicitly asks for explanation.
- Do NOT add any comments.
- Do NOT add inline comments.
- Do NOT add block comments.
- Do NOT add documentation comments.
- Comments are strictly prohibited inside source code.
- Use meaningful variable and function names instead of comments.
- The code must be clean, compilable and submission-ready.


Only include explanation if the assignment explicitly asks for explanation, theory, working, algorithm, or analysis.

Allowed element types:
- heading
- paragraph
- bullet_list
- numbered_list
- table
- code_block

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
- Important concepts
- Short labels such as "Definition:", "Note:", "Example:", etc.

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

Whenever information is naturally tabular (comparison, differences, classifications, feature matrix, advantages/disadvantages, software categories, software comparison, protocol comparison, operating system comparison, etc.) use a table instead of bullet points.

CODE BLOCK RULES

Whenever source code, pseudocode, SQL queries, shell commands, terminal commands, configuration files or any programming content is required, use a "code_block" element.Also for coding questions dont write the question and dont explain the answer just give code.

NEVER place source code inside a paragraph.

Preserve exactly:
- indentation
- blank lines
- spacing
- symbols
- capitalization

Always specify the language whenever possible.

Examples:

C++:

{
  "type":"code_block",
  "language":"cpp",
  "code":"#include <iostream>\\nusing namespace std;\\n\\nint main() {\\n    cout << \\"Hello\\";\\n    return 0;\\n}"
}

SQL:

{
  "type":"code_block",
  "language":"sql",
  "code":"SELECT * FROM Student;"
}

Shell:

{
  "type":"code_block",
  "language":"bash",
  "code":"npm install"
}

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
    },

    {
      "type":"code_block",
      "language":"string",
      "code":"string"
    }

  ]

}

Return exactly one valid JSON object.
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
    await uploadSolnToDrive(uploadPath, assignment, course)
  } catch (err) {
    console.error(err);
    return
  }

  console.log('success');








}


