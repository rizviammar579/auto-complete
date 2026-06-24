import mongoose from 'mongoose';
import fs from 'fs'
import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { Course } from '../models/courseSchema.js';
import { Assignment } from '../models/assignmentSchema.js'




// The scope for reading Classroom courses,courseworks.
const SCOPES = [  'https://www.googleapis.com/auth/classroom.courses.readonly',
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


//    const a= await classroom.courses.courseWork.list({
//   courseId: "866884207853"
// });

const b= await classroom.courses.courseWork.list({
  courseId: "824684325960"
});

// console.log(a.data.courseWork);
console.log(b.data.courseWork);


  // await listCourses(classroom)

  // const courses = await Course.find()
  

  // for (const course of courses) {

  //   if(course.courseId !== "824684325960"){
      
  //     try{
  //       await listCoursework(classroom,course.courseId,course.courseName)
  //     }catch(err){
  //       console.log(err,course.courseName);

  //     }

  //   }
    
  // }
    
 

  
  // await listCoursework(classroom)

  

  // if (!fs.existsSync("./downloads")) {
  //   fs.mkdirSync("./downloads")
  // }

  // await downloadFile(drive)

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



async function listCoursework(classroom,courseId,courseName) {

  const result = await classroom.courses.courseWork.list({
    courseId: courseId
  });

  const assignments = result.data.courseWork

  if (!assignments || assignments.length === 0) {
    console.log('No assignments found.',courseName);
    return;
  }


  for (const assignment of assignments) {


    const array = (assignment.materials || []).map(material => {



      if (material.driveFile) {
        return {
          type: "driveFile",
          title: material.driveFile.driveFile.title || "",
          url: material.driveFile.driveFile.alternateLink || "",
          fileId: material.driveFile.driveFile.id || "",
          localPath: "",
          fileName: "",
          downloadedAt: null,
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

    }).filter(Boolean)




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

        materials: array,

      },
      { upsert: true }
    );
  }

}


async function downloadFile(drive) {


  // extract file metadata

  const metadata = await drive.files.get({
    fileId: "1aSx1D3tPRWhU2PKlA8mdtWjb2-zaI5_X",
    fields: "name,mimeType",
  });

  const fileName = metadata.data.name
  const mimeType = metadata.data.mimeType
  let file
  let destination

  if (mimeType.startsWith('application/vnd.google-apps.')) {


    file = await drive.files.export({
      fileId: "1aSx1D3tPRWhU2PKlA8mdtWjb2-zaI5_X",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
      {
        responseType: "stream"
      }
    );


    destination = fs.createWriteStream(`./downloads/${fileName}.docx`)


  }

  else {

    file = await drive.files.get({
      fileId: "1aSx1D3tPRWhU2PKlA8mdtWjb2-zaI5_X",
      alt: "media"
    },
      {
        responseType: "stream"
      }
    );


    destination = fs.createWriteStream(`./downloads/${fileName}`)


  }

  file.data.pipe(destination)

  await new Promise((resolve, reject) => {
    destination.on("finish", resolve);
    destination.on("error", reject);
  });




}


await main();

