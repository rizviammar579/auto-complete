import { aiStatus } from '../../models/aiStatusSchema.js'

export async function dailyQuotaExceeded() {

    const today = new Date().toISOString().split("T")[0];

    let quota = await aiStatus.findOne()

    if (!quota) {

        quota = await aiStatus.create({
            date: today
        });

    }

    if (quota.date !== today) {

        quota.date = today;

        quota.aiQuotaExceeded = false;

        quota.fileUploadQuotaExceeded = false;

        await quota.save();

    }


    return quota.aiQuotaExceeded

    
}