import { createNotification } from "../utils/createNotification.js";

export async function notifyForReview(assignment,course){

  await createNotification(
    `Manual Review Required`,
    `${course.courseName} - ${assignment.title} cannot be processed automatically because it has no downloadable material.`,
    'info'
  )

}