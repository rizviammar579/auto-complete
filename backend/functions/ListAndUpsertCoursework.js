import { listCoursework } from "./listCoursework.js";
import { upsertCoursework } from "./upsertCoursework.js";



export async function ListAndUpsertCoursework(courses) {

    if (courses.length === 0) return

    for (const course of courses) {

        if (course.courseState === "ACTIVE") {

            try {

                const result = await listCoursework(course)


                if (Object.keys(result.data).length === 0) continue;

                const assignments = result.data.courseWork
                await upsertCoursework(assignments)


            } catch (err) {

                //  console.log(err);

                console.log("CANNOT FETCH ASSIGNMENTS FOR : ", course.name, " (", course.id, ")")

            }


        }

    }



}