import { notifications } from "../../models/notificationSchema.js"

export async function createNotification(title, message, type){

    await notifications.create({
    
          title,
          message,
          type,
          read: false
    
        })

}