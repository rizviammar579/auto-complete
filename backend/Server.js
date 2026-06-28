import mongoose from 'mongoose';
import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { listCourses } from './functions/listCourses.js';
import { upsertCourses } from './functions/upsertCourses.js';
import { listCoursework } from './functions/listCoursework.js';
import { upsertCoursework } from './functions/upsertCoursework.js';
import { downloadCoursework } from './functions/downloadCoursework.js';
import { ListAndUpsertCoursework } from './functions/ListAndUpsertCoursework.js'
import { ListAndUpsertCourses } from './functions/ListAndUpsertCourses.js';
import { scheduler } from './functions/scheduler.js';
import { Assignment } from '../models/assignmentSchema.js';
import fs from 'fs'




// The scope for reading Classroom courses,courseworks and driveFiles.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me',
  'https://www.googleapis.com/auth/drive.readonly'];



// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


// Connecting to mongoDB compass
mongoose.connect("mongodb://localhost:27017/assignment-automation-database")



async function main() {

  // Authenticate with Google and get an authorized client.
  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  // Create a new Classroom API client.
  const classroom = google.classroom({ version: 'v1', auth });

  // Create a new Drive API client (v3).
  const drive = google.drive({ version: 'v3', auth });



  // Create downloads folder only once
  // await fs.mkdirSync("./downloads",{ recursive: true })


  // Calls API for list of courses and upserts course details in DB
  const courses = await ListAndUpsertCourses(classroom)


  // Calls API for coursework of each course and upsert coursework details in DB
  await ListAndUpsertCoursework(classroom, courses)



  // Download coursework 
  // const DB_assignments = await Assignment.find()
  // {
  //   for (const DB_assignment of DB_assignments) {
  //     await downloadCoursework(drive, DB_assignment)
  //   }

  //   console.log('DOWNLOADS SYNCED SUCCESSFUL');
  // }


  //  await scheduler()



}


await main();

