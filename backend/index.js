import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { Course } from '../models/courseSchema.js';
import mongoose from 'mongoose';

// The scope for reading Classroom courses.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly'];
// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


mongoose.connect("mongodb://localhost:27017/courses")



/**
 * Lists the first 10 courses the user has access to.
 */
async function listCourses() {
  // Authenticate with Google and get an authorized client.
  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  // Create a new Classroom API client.
  const classroom = google.classroom({ version: 'v1', auth });
  // Get the list of courses.
  const result = await classroom.courses.list({
    pageSize: 100,
  });

  const courses = result.data.courses;
  if (!courses || courses.length === 0) {
    console.log('No courses found.');
    return;
  }
  console.log('Courses:');
  // Print the name and ID of each course.
  for (const course of courses) {
    console.log(`${course.name} (${course.id}) (${course.courseState})`);


    await Course.updateOne(
      { courseId: course.id }, 
      {
        courseId: course.id,
        courseName: course.name,
        courseStatus: course.courseState
      },      
      { upsert: true }              
    );
  }
}

await listCourses();