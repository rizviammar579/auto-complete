import ai from "./geminiService.js";

async function test() {

    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: 'hello'
    })

    console.log(response.candidates[0].content.parts[0].text);

}

test().catch(console.error)