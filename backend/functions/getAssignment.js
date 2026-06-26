import { Assignment } from "../../models/assignmentSchema.js";

export async function getAssignment(id) {

    const assignment = Assignment.findOne({ assignmentId: id })
    return assignment

}