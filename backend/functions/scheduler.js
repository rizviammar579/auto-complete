import { getAssignment } from "./getAssignment.js";
import { getPendingAssignments } from "./getPendingAssignments.js";
import { shouldProcessAssignment } from "./shouldProcessAssignment.js";

export async function scheduler() {

    const pendingAssignments = await getPendingAssignments()

    for (const pendingAssignment of pendingAssignments) {

        if (shouldProcessAssignment()) {

            const assignment = await getAssignment(pendingAssignment.assignmentId)
            console.log('processing ',assignment.title);

        } else {
            continue
        }

        

    }

}