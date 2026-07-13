import { aiStatus } from '../../models/aiStatusSchema.js'

export async function canUseFileUpload() {

    const qouta = await aiStatus.findOne()    

    return !(qouta.fileUploadQuotaExceeded)
    
}