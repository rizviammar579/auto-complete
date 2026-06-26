import { Course } from '../../models/courseSchema.js';

export async function upsertCourses(courses) {

  for (const course of courses) {

    await Course.updateOne(
      { courseId: course.id },
      {
        courseId: course.id,
        courseName: course.name,
        courseStatus: course.courseState
      },
      { upsert: true }
    );

  }

}