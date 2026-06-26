import { listCoursework } from "./listCoursework.js";
import { upsertCoursework } from "./upsertCoursework.js";



export async function ListAndUpsertCoursework(classroom, courses) {

    if(courses.length === 0) return

    for (const course of courses) {

        if (course.courseState === "ACTIVE") {

            try {

                const result = await listCoursework(classroom, course)



                if (Object.keys(result.data).length === 0) {
                    console.log('No assignments found for : ', course.name, " (", course.id, ")");

                }
                else {

                    const assignments = result.data.courseWork

                    await upsertCoursework(assignments)


                }

            } catch {

                console.log("CANNOT FETCH ASSIGNMENTS FOR : ", course.name, " (", course.id, ")")

            }


        }

    }



}