import { classroom } from "../services/google/googleService.js";

export async function listCoursework(course) {

  const result = await classroom.courses.courseWork.list({
    courseId: course.id
  });

  return result

}
