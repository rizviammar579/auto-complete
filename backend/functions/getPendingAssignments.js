import { processState } from "../../models/assignmentProcessingSchema.js";

export async function getPendingAssignments(){

     const pendingAssignments =  await processState.find({aiStatus: "pending"})

     console.log(pendingAssignments.length,' assignments pending');

     return pendingAssignments
     

}