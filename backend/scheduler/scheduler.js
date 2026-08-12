import nodeCron from "node-cron";
import { runAutomation } from './runAutomation.js'
import { runtimeState } from "../utils/runtimeState.js";

export function startScheduler() {

    nodeCron.schedule(`*/${runtimeState.interval} * * * *`, async () => {
        
        await runAutomation()

    });

}