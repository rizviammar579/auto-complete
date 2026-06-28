import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";

export async function scheduleRetry(pendingAssignment) {

    await assignmentProcessing.updateOne(
        { assignmentId: pendingAssignment.assignmentId },
        {
            $set: {
                lastAttempt: new Date(),
                nextRetryAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        }
    )

}