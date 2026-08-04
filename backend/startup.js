import { auth } from './services/google/googleService.js'
import fs from 'fs'
import { downloadCoursework } from './functions/downloadCoursework.js';
import { ListAndUpsertCoursework } from './functions/ListAndUpsertCoursework.js'
import { ListAndUpsertCourses } from './functions/ListAndUpsertCourses.js';
import { scheduler } from './scheduler/scheduler.js';
import { Assignment } from '../models/assignmentSchema.js';
import { canUseAI } from './functions/canUseAI.js';
import connectDB from './services/mongoose/connectDB.js';



export async function startup() {

  await connectDB()


  // Create downloads and solutions folder only once
  await fs.mkdirSync("./downloads", { recursive: true })
  await fs.mkdirSync("./solutions", { recursive: true })


  // Calls API for list of courses and upserts course details in DB
  const courses = await ListAndUpsertCourses()


  // Calls API for coursework of each course and upsert coursework details in DB
  await ListAndUpsertCoursework(courses)



  // Download coursework 
  const DB_assignments = await Assignment.find()
  {
    for (const DB_assignment of DB_assignments) {
      await downloadCoursework(DB_assignment)
    }

    console.log('DOWNLOADS SYNCED SUCCESSFULLY');
  }


  if (await canUseAI()) {  

    await scheduler()

  }


}

