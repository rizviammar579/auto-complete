import fs from 'fs/promises'
import { drive } from '../services/google/googleService.js';
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";

export async function cleanup(assignmentId, driveFileId, solutionPath) {

    if (solutionPath) {
        await fs.rm(solutionPath, {
            force: true
        });
    }

    if (driveFileId) {
        await drive.files.delete({
            fileId: driveFileId
        });
    }

    await assignmentProcessing.updateOne({assignmentId : assignmentId},
        {
            $set:{
                solutionPath : "",
                driveFileId : "",
                driveFileLink : "",
                driveFileName : "",
                aiStatus : "PENDING"
            }
        }
    )

}