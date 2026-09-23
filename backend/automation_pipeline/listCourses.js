import { classroom } from "../services/google/googleService.js";

export async function listCourses() {

  const result = await classroom.courses.list({
    pageSize: 100,
  });

  return result

}

