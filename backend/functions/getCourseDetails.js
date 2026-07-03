import { Course } from "../../models/courseSchema.js";

export async function getCourseDetails(id) {

    const course = await Course.findOne({courseId: id})
    return course
    
}