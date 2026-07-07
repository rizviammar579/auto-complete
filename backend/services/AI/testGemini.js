import ai from "./geminiService.js";

// async function test() {

//     const response = await ai.models.generateContent({
//         model: process.env.GEMINI_MODEL,
//         const uploadedFile = await ai.files.upload({
//             file: "path/to/organ.jpg",
//             config: { mimeType: "image/jpeg" }
//         })
//     })

//     console.log(response.candidates[0].content.parts[0].text);

// }

// test().catch(console.error)


// SINGLE PDF UPLOAD 

// const prompt = "Summarize this document";

// async function main() {
//   const filePath = './backend/services/AI/sample.pdf';

//   const myfile = await ai.files.upload({
//     file: filePath,
//     config: { mime_type: "application/pdf" },
//   });

//   const interaction = await ai.interactions.create({
//     model: process.env.GEMINI_MODEL,
//     input: [
//         { type: "text", text: prompt },
//         { type: "document", uri: myfile.uri, mime_type: myfile.mimeType }
//     ]
//   });

//   console.log(interaction.output_text);
// }

// await main();


// DOCX AND MAMMOTH

// import mammoth from "mammoth";

// const result = await mammoth.extractRawText({
//   path: "./backend/services/AI/sample.docx"
// });

// const text = result.value;

// console.log(text);


// Make sure to include the following import:
// import {GoogleGenAI} from '@google/genai';

// const response = await ai.models.generateContent({
//   model: process.env.GEMINI_MODEL,
//   contents: text,
// });
// console.log(response.text);


import { createPartFromUri } from "@google/genai";


async function uploadPDF(url, displayName) {

    const file = await ai.files.upload({
        file: url,
        config: {
            displayName: displayName,
        },
    });

    // Wait for the file to be processed.
    let getFile = await ai.files.get({ name: file.name });
    while (getFile.state === 'PROCESSING') {
        getFile = await ai.files.get({ name: file.name });
        console.log(`current file status: ${getFile.state}`);
        console.log('File is still processing, retrying in 5 seconds');

        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });
    }
    if (getFile.state === 'FAILED') {
        throw new Error('File processing failed.');
    }

    return getFile;
}

async function main() {
    const content = [
        'are these two pdfs same',
    ];

    let file1 = await uploadRemotePDF('./backend/services/AI/sample.pdf', "PDF 1")
    
    
    if (file1.uri && file1.mimeType) {
        const fileContent = createPartFromUri(file1.uri, file1.mimeType);
        content.push(fileContent);
    }
    console.log('file 1 uploaded');

    let file2 = await uploadRemotePDF('./backend/services/AI/sample.pdf', "PDF 2")
   
    if (file2.uri && file2.mimeType) {
        const fileContent = createPartFromUri(file2.uri, file2.mimeType);
        content.push(fileContent);
    }
     console.log('file 2 uploaded');

 console.log(content);
 
     console.log("Before generateContent");
   try {
    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: content,
    });

    console.log("After generateContent");
    console.log(response.candidates[0].content.parts[0].text)
} catch (err) {
    console.error(err);
}
}

main().catch(console.error);