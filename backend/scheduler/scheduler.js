import { automation } from "../functions/automation.js";
import { createNotification } from "../utils/createNotification.js";
import nodeCron from "node-cron";

export function startScheduler() {

    nodeCron.schedule("*/10 * * * *", async () => {

        try {

            await automation();

        } catch (err) {

            console.error(err);

            await createNotification(
                "Unexpected Error",
                "An unexpected error occurred while running automation. Please check the console for more details.",
                "error"
            );

        }

    });

}