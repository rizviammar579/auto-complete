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

    dueDate: {
        type: {
            year: Number,
            month: Number,
            day: Number
        },
        default: null
    },

    dueTime: {
        type: {
            hours: Number,
            minutes: Number
        },
        default: null
    },

    aiStatus: {
        type: String,
        default: "pending"
    },

    
    solutionPath: {
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

    driveFileLink: {
        type: String,
        default: ""
    },

    driveFileName: {
        type: String,
        default: ""
    },

    driveFileId: {
        type: String,
        default: ""
    }

})

export const assignmentProcessing = mongoose.model('assignmentProcessing', assignmentProcessingSchema)