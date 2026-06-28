import mongoose from "mongoose"

const assignmentSchema = new mongoose.Schema({

    assignmentId: {
        type: String,
        required: true,
        unique: true
    },

    courseId: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    description:  {
        type: String,
        default: ""
    },    

    workType: {
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

    maxPoints: {
        type: Number
    },

    alternateLink: {
        type: String
    },

    materials: [
        {
            type: { type: String },
            title: String,
            url: String,
            fileId: String,
            localPath: String,
            fileName: String,
            downloadedAt: Date
        }
    ]

})

export const Assignment = mongoose.model('Assignment', assignmentSchema)