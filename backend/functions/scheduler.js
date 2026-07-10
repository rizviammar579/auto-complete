import { canUseFileUpload } from "./canUseFileUpload.js";
import { getPendingAssignments } from "./getPendingAssignments.js";
import { processWithFileUpload } from "./processWithFileUpload.js";
import { enoughTimeForDeadline } from "./enoughTimeForDeadline.js";
import { processWithTextExtraction } from "./processWithTextExtraction.js";
import { getAssignment } from "./getAssignment.js";
import { getCourseDetails } from "./getCourseDetails.js"


export async function scheduler() {

    const pendingAssignments = await getPendingAssignments()

    if (pendingAssignments.length === 0) return
    let a = 1

    // for (const pendingAssignment of pendingAssignments) {

    // const now = new Date()
    // const assignment = await getAssignment(pendingAssignment.assignmentId);
    // const course = await getCourseDetails(pendingAssignment.courseId)

    // if (canUseFileUpload()) {

    //     await processWithFileUpload(pendingAssignment, assignment, course)

    // } else if (!enoughTimeForDeadline(pendingAssignment, now)) {

    //     await processWithTextExtraction(pendingAssignment, assignment, course);

    // }


    // TEST CASE

    for (const pendingAssignment of pendingAssignments) {
        if (a === 14) {

            const now = new Date()
            const assignment = await getAssignment(pendingAssignment.assignmentId);
            const course = await getCourseDetails(pendingAssignment.courseId)

            if (canUseFileUpload()) {

                await processWithFileUpload(pendingAssignment, assignment, course)

            } else if (!enoughTimeForDeadline(pendingAssignment, now)) {

                await processWithTextExtraction(pendingAssignment, assignment, course);

            }


            return

        } else { a++ }


    }




}