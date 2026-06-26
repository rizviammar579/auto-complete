import { listCourses } from "./listCourses.js";
import { upsertCourses } from "./upsertCourses.js";

export async function ListAndUpsertCourses(classroom) {

    const result = await listCourses(classroom)

    if (Object.keys(result.data).length === 0) {

        console.log('No courses found.');
        return [];

    } else {

        const courses = result.data.courses
        await upsertCourses(courses)
        return courses

    }


}