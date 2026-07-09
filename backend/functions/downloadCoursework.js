import { drive } from "../services/google/googleService.js";
import fs from 'fs'
import { Assignment } from '../../models/assignmentSchema.js'
import path from "path";


export async function downloadCoursework(assignment) {


    let materials = assignment.materials

    if (materials.length === 0) {
        return
    }

    for (const material of materials) {

        if (material.fileId === "") {
            continue
        }

        const metadata = await drive.files.get({
            fileId: material.fileId,
            fields: "name,mimeType",
        });

        const fileName = `${material.fileId}_${metadata.data.name}`
        const mimeType = metadata.data.mimeType
        let file
        let destination
        let localPath = null

        await fs.mkdirSync(`./downloads/assignment_${assignment.assignmentId}`, { recursive: true })

        if (mimeType.startsWith('application/vnd.google-apps.document')) {


            file = await drive.files.export({
                fileId: material.fileId,
                mimeType:
                    "application/pdf"
            },
                {
                    responseType: "stream"
                }
            );


            const baseName = path.parse(fileName).name;
            localPath = `./downloads/assignment_${assignment.assignmentId}/${baseName}.pdf`


        }

        else {

            file = await drive.files.get({
                fileId: material.fileId,
                alt: "media"
            },
                {
                    responseType: "stream"
                }
            );


            localPath = `./downloads/assignment_${assignment.assignmentId}/${fileName}`


        }


        if (!fs.existsSync(localPath)) {

            destination = fs.createWriteStream(localPath)
            file.data.pipe(destination)

            await new Promise((resolve, reject) => {
                destination.on("finish", resolve);
                destination.on("error", reject);
            });

        }

                     await Assignment.updateOne(
            {
                assignmentId: assignment.assignmentId,
                "materials._id": material._id
            },
            {
                $set: {
                    "materials.$.localPath": localPath,
                    "materials.$.fileName": fileName,
                }
            }
        );

        
    }

}

