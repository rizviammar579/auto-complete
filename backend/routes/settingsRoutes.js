import express from "express";
import { fetchSettingsData } from "../services/settingServices.js"

const router = express.Router();

 
router.get("/" , fetchSettingsData );


export default router;