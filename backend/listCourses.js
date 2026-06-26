export async function listCourses(classroom) {

  // Get the list of courses.
  const result = await classroom.courses.list({
    pageSize: 100,
  });

  return result

}

