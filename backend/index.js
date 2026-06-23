import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { Course } from '../models/courseSchema.js';
import { Assignment } from '../models/assignmentSchema.js'
import mongoose from 'mongoose';



// The scope for reading Classroom courses,courseworks.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me.readonly'];



// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


mongoose.connect("mongodb://localhost:27017/assignment-automation-database")



// Lists the courses the user has access to.
async function main() {

  // Authenticate with Google and get an authorized client.
  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  // Create a new Classroom API client.
  const classroom = google.classroom({ version: 'v1', auth });


  await listCourses(classroom)
  await listCoursework(classroom)



}


async function listCourses(classroom) {

  // Get the list of courses.
  const result = await classroom.courses.list({
    pageSize: 100,
  });

  const courses = result.data.courses;
  if (!courses || courses.length === 0) {
    console.log('No courses found.');
    return;
  }

  // Print the name and ID of each course and upsert them to DB.
  for (const course of courses) {

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



async function listCoursework(classroom) {

  const result = await classroom.courses.courseWork.list({
    courseId: "866884207853"
  });

  const assignments = result.data.courseWork

  if (!assignments || assignments.length === 0) {
    console.log('No assignments found.');
    return;
  }

  for (const assignment of assignments) {

    await Assignment.updateOne(
      { assignmentId: assignment.id },
      {
        assignmentId: assignment.id,

        courseId: assignment.courseId,

        title: assignment.title,

        state: assignment.state,

        workType: assignment.workType,

        dueDate: assignment.dueDate,

        maxPoints: assignment.maxPoints,

        alternateLink: assignment.alternateLink

      },
      { upsert: true }
    );
  }


}

await main();