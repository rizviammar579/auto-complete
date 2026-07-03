import { notifyForForm } from "./notifyForForm.js"
import { notifyForReview } from "./notifyForReview.js"
import { processWithDesc } from "./processWithDesc.js"
import { generateSolutionWithFiles } from "./generateSolutionWithFiles.js"

export async function processWithFileUpload(pendingAssignment, assignment, course) {

    const materials = assignment.materials
    const filesToUpload = []

    if (materials.length === 0) {

        if (assignment.description === "") {
            await notifyForReview(assignment, course)

        }
        else {
            await processWithDesc(assignment, course)
        }

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


    if (filesToUpload.length > 0) {
        await generateSolutionWithFiles(filesToUpload, assignment, course)
    }




}