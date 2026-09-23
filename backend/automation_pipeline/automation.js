import { ListAndUpsertCourses } from './ListAndUpsertCourses.js'
import { ListAndUpsertCoursework } from './ListAndUpsertCoursework.js'
import { canUseAI } from './canUseAI.js';
import { processAssignments } from './processAssignments.js';
import { createNotification } from '../utils/createNotification.js';
import { runtimeState } from '../utils/runtimeState.js';

export async function automation() {

    runtimeState.automationRunning = true;

    try {
        
        // Calls API for list of courses and upserts course details in DB
        const courses = await ListAndUpsertCourses()

        // Calls API for coursework of each course and upsert coursework details in DB
        await ListAndUpsertCoursework(courses)


        await createNotification(
            "Google Classroom Synced",
            "Successfully synced courses and assignments.",
            "success"
        )


        if (await canUseAI()) {
    
            await processAssignments()

        } else {

            await createNotification(
                'AI Quota Exceeded',
                `Gemini daily usage limit has been exceeded. Try again tomorrow.`,
                'error'
            )

        }

        runtimeState.lastSync = new Date();

    } finally {
        runtimeState.automationRunning = false;
    }

}