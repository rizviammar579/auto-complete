import { listCourses } from "./listCourses.js";
import { upsertCourses } from "./upsertCourses.js";

export async function ListAndUpsertCourses() {

    const result = await listCourses()

    if (!Object.keys(result.data).length) {

        console.log('No courses found.');
        return [];

    } else {

        const courses = result.data.courses
        await upsertCourses(courses)
        return courses

    }


}