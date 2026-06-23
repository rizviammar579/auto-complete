import moongoose from "mongoose"

const courseSchema = new moongoose.Schema({
    courseId : {
        type : String,
        required : true,
        unique : true
    },
    courseName : {
        type : String,
        required : true
    },
    courseStatus : {
        type : String,
        required : true
    }

})

export const Course = moongoose.model('Course' , courseSchema)