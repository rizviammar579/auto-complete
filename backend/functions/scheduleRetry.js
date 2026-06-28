import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";

export async function scheduleRetry(assignment) {

    await assignmentProcessing.updateOne(
        { assignmentId: assignment.assignmentId },
        {
            $set: {
                lastAttempt: new Date(),
                nextRetryAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        }
    )

}