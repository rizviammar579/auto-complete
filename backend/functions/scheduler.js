import { getAssignment } from "./getAssignment.js";
import { getPendingAssignments } from "./getPendingAssignments.js";
import { shouldProcessAssignment } from "./shouldProcessAssignment.js";

export async function scheduler() {

    const pendingAssignments = await getPendingAssignments()

    for (const pendingAssignment of pendingAssignments) {

        const res = await shouldProcessAssignment(pendingAssignment)

        if (res) {

            const assignment = await getAssignment(pendingAssignment.assignmentId)
            console.log('processing ',assignment.title);

        }

        if(!res) {
            return
        }

        
    }

}