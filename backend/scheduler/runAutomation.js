import { runtimeState } from "../utils/runtimeState.js";
import { createNotification } from "../utils/createNotification.js";
import { automation } from "../functions/automation.js";

export async function runAutomation() {

    if (runtimeState.automationRunning) {
        return false;
    }

    runtimeState.automationRunning = true;

    try {
        await automation();
        return true;
    } catch (err) {
        console.error(err);

        await createNotification(
            "Unexpected Error",
            "An unexpected error occurred while running automation. Please check the console for more details.",
            "error"
        );

        return false;
    } finally {
        runtimeState.automationRunning = false;
    }
}