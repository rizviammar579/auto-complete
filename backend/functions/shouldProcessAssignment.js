import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";
import { canUseAI } from "./canUseAI.js";


export async function shouldProcessAssignment(pendingAssignment) {

    if (!canUseAI()) {
        
        console.log('AI quota exhausted. Will retry tomorrow.');

        await assignmentProcessing.updateOne({ assignmentId: pendingAssignment.assignmentId },
            {
                $set: {
                    lastAttempt: Date.now(),
                    nextRetryAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
                }
            },
            { upsert: true }
        )

        return false

    }

}