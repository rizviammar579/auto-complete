import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireOwner from "../middleware/requireOwner.js";
import { fetchSettingsData, runAutomationManually } from "../services/settingServices.js"

const router = express.Router();


router.get("/", fetchSettingsData);
router.post("/run-automation", requireAuth, requireOwner, runAutomationManually);


export default router;