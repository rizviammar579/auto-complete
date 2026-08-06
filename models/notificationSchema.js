import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({

    title: String,

    message: String,

    type: {
        type: String,
        enum: ["info", "success", "warning", "error"]
    },

    read: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

export const notifications = mongoose.model('notifications', notificationSchema)