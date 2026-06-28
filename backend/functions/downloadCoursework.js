import fs from 'fs'
import { Assignment } from '../../models/assignmentSchema.js'


export async function downloadCoursework(drive,assignment) {

   
        let materials = assignment.materials

        if (materials.length === 0) {
            return
        }

        for (const material of materials) {

            if (material.fileId === "") {
                return
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

            if (mimeType.startsWith('application/vnd.google-apps.')) {


                file = await drive.files.export({
                    fileId: material.fileId,
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                },
                    {
                        responseType: "stream"
                    }
                );

                await fs.mkdirSync(`./downloads/assignment_${assignment.assignmentId}`,{ recursive: true })
                localPath = `./downloads/assignment_${assignment.assignmentId}/${fileName}.docx`
                destination = fs.createWriteStream(localPath)


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

                await fs.mkdirSync(`./downloads/assignment_${assignment.assignmentId}`,{ recursive: true })
                localPath = `./downloads/assignment_${assignment.assignmentId}/${fileName}`
                destination = fs.createWriteStream(localPath)


            }



            if (fs.existsSync(localPath)) {

                return

            }
            else {
                file.data.pipe(destination)

                await new Promise((resolve, reject) => {
                    destination.on("finish", resolve);
                    destination.on("error", reject);
                });

                await Assignment.updateOne(
                    {
                        assignmentId: assignment.assignmentId,
                        "materials._id": material._id
                    },
                    {
                        $set: {
                            "materials.$.localPath": localPath,
                            "materials.$.fileName": fileName,
                            "materials.$.downloadedAt": new Date()
                        }
                    }
                );

            }


        }

    }

