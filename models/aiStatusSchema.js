import mongoose from "mongoose"

const aiStatusSchema = new mongoose.Schema({
    aiQuotaExceeded: {
        type: Boolean,
        default: false
    },
    fileUploadQuotaExceeded: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        required: true
    }

})

export const aiStatus = mongoose.model('aiStatus', aiStatusSchema)