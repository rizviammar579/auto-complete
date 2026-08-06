import { createNotification } from "../utils/createNotification.js";

export async function notifyForForm(material,assignment,course) {

    await createNotification(
    `Google Form Found`,
    `${course.courseName} - ${assignment.title} cannot be processed automatically because it uses a Google Form.`,
    'info'
  )
    
    
}