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

    workType: {
        type: String,
        required: true
    },

    dueDate: {
        year: Number,
        month: Number,
        day: Number
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
            fileId: String
        }
    ]

})

export const Assignment = mongoose.model('Assignment', assignmentSchema)