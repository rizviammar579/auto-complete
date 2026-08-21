import fs from 'fs/promises'
import { drive } from '../services/google/googleService.js';
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";
import { createNotification } from '../utils/createNotification.js';

export async function cleanup(Assignment) {

    if (Assignment.solutionPath) {
        await fs.rm(Assignment.solutionPath, {
            force: true
        });
    }

    if (Assignment.driveFileId) {
        try {
            await drive.files.delete({
                fileId: Assignment.driveFileId
            });
        } catch (err) {
            if (err.code !== 404) {

                await createNotification(
                    "Drive File Cleanup Failed",
                    `The previous solution file could not be deleted from Drive for ${Assignment.course.courseName} - ${Assignment.assignment.title} while regenerating solution.`,
                    "warning"
                );

            }
        }
    }

    await assignmentProcessing.updateOne({ assignmentId: Assignment.assignmentId },
        {
            $set: {
                solutionPath: "",
                driveFileId: "",
                driveFileLink: "",
                driveFileName: "",
                aiStatus: "REGENERATING"
            }
        }
    )

}