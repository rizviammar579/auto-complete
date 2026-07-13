import { dailyQuotaExceeded } from "./dailyQuotaExceeded.js"

export async function canUseAI() {

    return !(await dailyQuotaExceeded());

}