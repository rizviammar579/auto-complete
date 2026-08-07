import { automation } from "../functions/automation.js";
import nodeCron from "node-cron";

export function startScheduler() {

    nodeCron.schedule("*/10 * * * *", async () => {

        try {

            await automation();

        } catch (err) {

            console.error(err);

        }

    });

}