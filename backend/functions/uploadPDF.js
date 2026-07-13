import ai from "../services/AI/geminiService.js";

export async function uploadPDF(url, displayName) {

    try {
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
        
    } catch (err){
        
        throw err 
        
    }
}