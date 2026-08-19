import "dotenv/config";
import dotenv from 'dotenv'
import { google } from "googleapis";
import { auth } from "../services/google/googleService.js";
import { runtimeState } from "../utils/runtimeState.js";
import { aiStatus } from '../../models/aiStatusSchema.js'
import { runAutomation } from '../scheduler/runAutomation.js'

export async function fetchSettingsData(req, res) {
    

    try {

        const aistatus = await aiStatus.findOne()

        const oauth2 = google.oauth2({
            auth,
            version: "v2"
        });

        const { data: userData }  = await oauth2.userinfo.get();


        const data = {

            googleDriveConnected: runtimeState.googleDriveConnected,
            googleClassroomConnected: runtimeState.googleClassroomConnected,
            geminiAvailable: !aistatus.aiQuotaExceeded,

            aiQuotaAvailable: !aistatus.aiQuotaExceeded,
            fileUploadQuotaAvailable: !aistatus.fileUploadQuotaExceeded,
            textExtractionFallback: 'Enabled',
            model: process.env.GEMINI_MODEL,

            automationRunning: runtimeState.automationRunning,
            lastSync: runtimeState.lastSync,
            interval: runtimeState.interval,

            username: userData.given_name,
            gmail: userData.email


        }

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

}


export async function runAutomationManually(req, res) {
  
       try {
        const success = await runAutomation();

        if (!success) {
            return res.status(409).json({
                message: "Automation is already running."
            });
        }

        res.status(200).json({
            message: "Automation completed successfully."
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

}


