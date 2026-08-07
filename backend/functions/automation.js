import { auth } from '../services/google/googleService.js'
import { ListAndUpsertCourses } from './ListAndUpsertCourses.js'
import { ListAndUpsertCoursework } from './ListAndUpsertCoursework.js'
import { Assignment } from '../../models/assignmentSchema.js';
import { downloadCoursework } from './downloadCoursework.js';
import { canUseAI } from './canUseAI.js';
import { generateSolution } from './generateSolution.js';
import { createNotification } from '../utils/createNotification.js';
import { runtimeState } from '../utils/runtimeState.js';

export async function automation() {


    runtimeState.automationRunning = true;

    try {

        // Calls API for list of courses and upserts course details in DB
        const courses = await ListAndUpsertCourses()


        // Calls API for coursework of each course and upsert coursework details in DB
        await ListAndUpsertCoursework(courses)



        // Download coursework 
        const DB_assignments = await Assignment.find()

        for (const DB_assignment of DB_assignments) {
            await downloadCoursework(DB_assignment)
        }

        await createNotification(
            "Google Classroom Synced",
            "Successfully synced courses and assignments.",
            "success"
        )


        if (await canUseAI()) {

            await generateSolution()

        }

        runtimeState.lastSync = new Date();

    } catch (err) {

        console.error(err);

        await createNotification(
            "Automation Failed",
            "An error occurred during synchronization.",
            "error"
        );

    } finally {

        runtimeState.automationRunning = false;

    }

}