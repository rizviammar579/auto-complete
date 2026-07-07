export async function listCourses(classroom) {

  const result = await classroom.courses.list({
    pageSize: 100,
  });

  return result

}

