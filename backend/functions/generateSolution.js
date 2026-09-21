import { canUseFileUpload } from "./canUseFileUpload.js";
import { getPendingAssignments } from "./getPendingAssignments.js";
import { processWithFileUpload } from "./processWithFileUpload.js";
import { enoughTimeForDeadline } from "./enoughTimeForDeadline.js";
import { processWithTextExtraction } from "./processWithTextExtraction.js";
import { getAssignment } from "./getAssignment.js";
import { getCourseDetails } from "./getCourseDetails.js"
import { createNotification } from "../utils/createNotification.js";


export async function generateSolution() {

    const pendingAssignments = await getPendingAssignments()

    if (!pendingAssignments.length) {

        await createNotification(
            "No Pending Assignments",
            "There are no pending assignments available for solution generation.",
            "info"
        );

        return
    }

    for (const pendingAssignment of pendingAssignments) {

        const now = new Date()
        const assignment = await getAssignment(pendingAssignment.assignmentId);
        const course = await getCourseDetails(pendingAssignment.courseId)

        if (await canUseFileUpload()) {

            await processWithFileUpload(pendingAssignment, assignment, course)

        } else if (!enoughTimeForDeadline(pendingAssignment, now)) {

            await processWithTextExtraction(pendingAssignment, assignment, course);

        }


    }

}