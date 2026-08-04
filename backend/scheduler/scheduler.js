import { canUseFileUpload } from "../functions/canUseFileUpload.js";
import { getPendingAssignments } from "../functions/getPendingAssignments.js";
import { processWithFileUpload } from "../functions/processWithFileUpload.js";
import { enoughTimeForDeadline } from "../functions/enoughTimeForDeadline.js";
import { processWithTextExtraction } from "../functions/processWithTextExtraction.js";
import { getAssignment } from "../functions/getAssignment.js";
import { getCourseDetails } from "../functions/getCourseDetails.js"


export async function scheduler() {

    const pendingAssignments = await getPendingAssignments()

    if (pendingAssignments.length === 0) return

    for (const pendingAssignment of pendingAssignments) {

    const now = new Date()
    const assignment = await getAssignment(pendingAssignment.assignmentId);
    const course = await getCourseDetails(pendingAssignment.courseId)

    if (canUseFileUpload()) {

        await processWithFileUpload(pendingAssignment, assignment, course)

    } else if (!enoughTimeForDeadline(pendingAssignment, now)) {

        await processWithTextExtraction(pendingAssignment, assignment, course);

    }


    }

}