import { canUseFileUpload } from "./canUseFileUpload.js";
import { getPendingAssignments } from "./getPendingAssignments.js";
import { processWithFileUpload } from "./processWithFileUpload.js";
import { enoughTimeForDeadline } from "./enoughTimeForDeadline.js";
import { scheduleRetry } from "./scheduleRetry.js";
import { processWithTextExtraction } from "./processWithTextExtraction.js";
import { getAssignment } from "./getAssignment.js";


export async function scheduler() {

    const pendingAssignments = await getPendingAssignments()

    if(pendingAssignments.length === 0) return


    for (const pendingAssignment of pendingAssignments) {

        const now = new Date()
        const assignment = await getAssignment(pendingAssignment.assignmentId);

        if (canUseFileUpload()) {

            await processWithFileUpload(pendingAssignment,assignment)

        } else if (enoughTimeForDeadline(pendingAssignment,now)) {

            await scheduleRetry(pendingAssignment)

        }else{

            await processWithTextExtraction(pendingAssignment,assignment);

        }

        return


    }

}