import moongoose from "mongoose"

const assignmentSchema = new moongoose.Schema({

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
    }
})

export const Assignment = moongoose.model('Assignment', assignmentSchema)