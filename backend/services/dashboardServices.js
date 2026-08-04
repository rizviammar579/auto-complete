import { aiStatus } from "../../models/aiStatusSchema";
import { runtimeState } from "../utils/runtimeState";

export async function fetchDashboardData(req, res) {

    try {

        const quota = await aiStatus.findOne()

        const data = {

            systemStatus: {

                googleDriveConnected: runtimeState.googleDriveConnectedConnected,
                googleClassroomConnected: runtimeState.googleClassroomConnected,
                mongoDBConnected: runtimeState.mongoDBConnected,
                automationRunning: runtimeState.automationRunning,
                lastSync: runtimeState.lastSync,
                aiAvailable: !quota.aiQuotaExceeded

            },



        }

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

}