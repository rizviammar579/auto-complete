import { generateSolution } from "./generateSolution.js";
import { getPendingAssignments } from "./getPendingAssignments.js";
import { getAssignment } from "./getAssignment.js";
import { getCourseDetails } from "./getCourseDetails.js"
import { createNotification } from "../utils/createNotification.js";
import { downloadCoursework } from "./downloadCoursework.js";
import { cleanupAssignmentDirectories } from "./tempDirectories.js";


export async function processAssignments() {


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


        let assignment = await getAssignment(pendingAssignment.assignmentId);

        const course = await getCourseDetails(pendingAssignment.courseId)

        
        assignment = await downloadCoursework(assignment)

        await generateSolution(assignment, course)

        await cleanupAssignmentDirectories(assignment.assignmentId)

    }

}