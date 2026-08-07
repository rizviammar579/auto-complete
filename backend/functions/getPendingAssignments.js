import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";

export async function getPendingAssignments(){

     const pendingAssignments =  await assignmentProcessing.find({aiStatus: "pending"})


     return pendingAssignments
     

}