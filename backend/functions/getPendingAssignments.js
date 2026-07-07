import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";

export async function getPendingAssignments(){

     const pendingAssignments =  await assignmentProcessing.find({aiStatus: "pending"})

     // console.log(pendingAssignments.length,' assignments pending');

     return pendingAssignments
     

}