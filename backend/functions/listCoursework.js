export async function listCoursework(classroom, course) {

  const result = await classroom.courses.courseWork.list({
    courseId: course.id
  });

  return result

}
