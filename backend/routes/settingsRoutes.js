import express from "express";
import { fetchSettingsData , runAutomationManually } from "../services/settingServices.js"

const router = express.Router();

 
router.get("/" , fetchSettingsData );
router.post("/run-automation" , runAutomationManually );


export default router;