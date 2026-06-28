import { getAssignmentDeadline } from "./getAssignmentDeadline.js"

export function enoughTimeForDeadline(pendingAssignment, now) {

    const RETRY_TIME = 25 * 60 * 60 * 1000 // 25 hours in milliseconds
    const deadline = getAssignmentDeadline(pendingAssignment)

    if (deadline === null) return true


    return deadline - now > RETRY_TIME

}