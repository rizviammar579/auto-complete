import { sync } from "../functions/sync.js";
import nodeCron from "node-cron";

export function startScheduler() {

    nodeCron.schedule("*/10 * * * *", async () => {

        try {

            await sync();

        } catch (err) {

            console.error(err);

        }

    });

}