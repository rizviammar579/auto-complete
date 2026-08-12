import { automation } from "../functions/automation.js";
import { createNotification } from "../utils/createNotification.js";
import nodeCron from "node-cron";

export function startScheduler() {

    let automationRunning = false

    nodeCron.schedule("*/5 * * * *", async () => {

        if(automationRunning)  return;

        automationRunning  = true

        try {

            await automation();

        } catch (err) {

            console.error(err);

            await createNotification(
                "Unexpected Error",
                "An unexpected error occurred while running automation. Please check the console for more details.",
                "error"
            );

        } finally{
            automationRunning = false;
        }

    });

}