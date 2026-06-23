import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseStatus: {
        type: String,
        required: true
    }

})

export const Course = mongoose.model('Course', courseSchema)