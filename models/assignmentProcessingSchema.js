import mongoose from "mongoose"

const assignmentProcessingSchema = new mongoose.Schema({
    
    assignmentId: {
        type: String,
        required: true,
        unique: true
    },

    courseId: {
        type: String,
        required: true
    },

    submissionDeadline: {
        year: Number,
        month: Number,
        day: Number
    },

    aiStatus: {
        type: String,
        default: "pending"
    },

    lastAttempt: {
        type: Date,
        default: null
    },

    nextRetryAt: {
        type: Date,
        default: null
    },

    solutionPath : {
        type: String,
        default: ""
    },

    solutionGeneratedAt: {
        type: Date,
        default: null
    },

    submissionStatus: {
        type: Boolean,
        default: false
    },

    submittedAt: {
        type: Date,
        default: null
    },

})

export const processState = mongoose.model('processState', assignmentProcessingSchema)