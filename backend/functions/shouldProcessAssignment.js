import { canUseAI } from "./canUseAI.js";


export async function shouldProcessAssignment(pendingAssignment) {

    if (canUseAI()) {
        return true
    }

}