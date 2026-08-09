import express from "express";
import { fetchNotificationData , markAllAsRead ,deleteAllNotifications , deleteNotification } from "../services/notificationServices.js";
import { markAsRead } from "../services/notificationServices.js"

const router = express.Router();

 
router.get("/" , fetchNotificationData);
router.patch("/read-all" , markAllAsRead);
router.patch("/read/:id" , markAsRead)
router.delete("/delete-all" , deleteAllNotifications);
router.delete("/delete/:id" , deleteNotification)



export default router;