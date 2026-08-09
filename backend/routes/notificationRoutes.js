import express from "express";
import { fetchNotificationData , markAllAsRead } from "../services/notificationServices.js";
import { markAsRead } from "../services/notificationServices.js"

const router = express.Router();

 
router.get("/" , fetchNotificationData);
router.patch("/read-all" , markAllAsRead);
router.patch("/read/:id" , markAsRead)



export default router;