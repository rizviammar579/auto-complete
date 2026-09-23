import fs from "fs";
import path from "path";
import { drive } from "../services/google/googleService.js";
import { Assignment } from '../../models/assignmentSchema.js'
import { downloadsDir } from "./tempDirectories.js";



export async function downloadCoursework(assignment) {

    const materials = assignment.materials

    if (!materials.length) return assignment;


    const assignmentDir = path.join(downloadsDir, `assignment_${assignment.assignmentId}`)
    fs.mkdirSync(assignmentDir, { recursive: true })


    for (const material of materials) {

        if (!material.fileId) continue;

        const metadata = await drive.files.get({
            fileId: material.fileId,
            fields: "name,mimeType",
        });

        const fileName = metadata.data.name
        const mimeType = metadata.data.mimeType
        let file
        let destination
        let localPath = null


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
            localPath = path.join(assignmentDir, `${baseName}.pdf`)


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


            localPath = path.join(assignmentDir, `${fileName}`)


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

        material.localPath = localPath;
        material.fileName = fileName;

    }

    return assignment;

}

