import { dailyQuotaExceeded } from "./dailyQuotaExceeded.js"

export async function canUseAI() {

    if (await dailyQuotaExceeded()) {
        return false
    } else {
        return true
    }

}