import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireOwner from "../middleware/requireOwner.js";
import { fetchNotificationData, markAllAsRead, deleteAllNotifications, deleteNotification } from "../services/notificationServices.js";
import { markAsRead } from "../services/notificationServices.js"

const router = express.Router();


router.get("/", fetchNotificationData);
router.patch("/read-all", requireAuth, requireOwner, markAllAsRead);
router.patch("/read/:id", requireAuth, requireOwner, markAsRead)
router.delete("/delete-all", requireAuth, requireOwner, deleteAllNotifications);
router.delete("/delete/:id", requireAuth, requireOwner, deleteNotification)



export default router;