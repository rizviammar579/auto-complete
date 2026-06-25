import mongoose from 'mongoose';
import fs from 'fs'
import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { Course } from '../models/courseSchema.js';
import { Assignment } from '../models/assignmentSchema.js'




// The scope for reading Classroom courses,courseworks.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me',
  'https://www.googleapis.com/auth/drive.readonly'];



// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


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


  if (!fs.existsSync("./downloads")) {
    fs.mkdirSync("./downloads")
  }

  await listCourses(classroom, drive)


}


async function listCourses(classroom, drive) {

  // Get the list of courses.
  const result = await classroom.courses.list({
    pageSize: 100,
  });

  const courses = result.data.courses;
  if (!courses || courses.length === 0) {
    console.log('No courses found.');
    return;
  }

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


   if(course.courseState === "ACTIVE"){

   try {
      await listCoursework(classroom, drive, course.id, course.name)

    } catch {
      console.log('CANNOT FETCH ASSIGNMENTS FOR : ', course.name)

    }
    
  }

   }



}



async function listCoursework(classroom, drive, courseId, courseName) {


  const result = await classroom.courses.courseWork.list({
    courseId: courseId
  });

  const assignments = result.data.courseWork

  if (!assignments || assignments.length === 0) {
    console.log('No assignments found.', courseName);
    return;
  }


  for (const assignment of assignments) {


    const array = await Promise.all((assignment.materials || []).map(async (material) => {



      if (material.driveFile) {

        let mat = material.driveFile.driveFile
        let downloadDetails

        if (mat.id) {

          downloadDetails = await downloadFile(drive, mat.id)

        }

        return {
          type: "driveFile",
          title: mat.title || "",
          url: mat.alternateLink || "",
          fileId: mat.id || "",
          localPath: downloadDetails.localPath || "",
          fileName: downloadDetails.fileName || "",
          downloadedAt: downloadDetails.downloadedAt || null,
        };
      }

      else if (material.form) {
        return {
          type: "form",
          title: material.form.title || "",
          url: material.form.formUrl || "",
          fileId: "",
          localPath: "",
          fileName: "",
          downloadedAt: null,

        };
      }
      else {
        return null
      }

    }))

    const filteredArray = array.filter(Boolean);




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

        alternateLink: assignment.alternateLink,

        materials: filteredArray,

      },
      { upsert: true }
    );
  }



}


async function downloadFile(drive, fileId) {


  // extract file metadata

  const metadata = await drive.files.get({
    fileId: fileId,
    fields: "name,mimeType",
  });

  const fileName = metadata.data.name
  const mimeType = metadata.data.mimeType
  let file
  let destination
  let localPath = null

  if (mimeType.startsWith('application/vnd.google-apps.')) {


    file = await drive.files.export({
      fileId: fileId,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
      {
        responseType: "stream"
      }
    );

    localPath = `./downloads/${fileName}.docx`
    destination = fs.createWriteStream(localPath)


  }

  else {

    file = await drive.files.get({
      fileId: fileId,
      alt: "media"
    },
      {
        responseType: "stream"
      }
    );


    localPath = `./downloads/${fileName}`
    destination = fs.createWriteStream(localPath)


  }



  if (fs.existsSync(localPath)) {


    return {
      localPath,
      fileName,
      downloadedAt: null,
    }
  }
  else {
    file.data.pipe(destination)

    await new Promise((resolve, reject) => {
      destination.on("finish", resolve);
      destination.on("error", reject);
    });

    return {

      localPath: localPath,
      fileName: fileName,
      downloadedAt: new Date(),

    }
  }


}


await main();

