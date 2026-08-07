import { sync } from "../functions/sync";
import nodeCron from "node-cron";

export function startScheduler() {

    nodeCron.schedule("*/3 * * * *", async () => {

        try {

            await sync();

        } catch (err) {

            console.error(err);

        }

    });

}