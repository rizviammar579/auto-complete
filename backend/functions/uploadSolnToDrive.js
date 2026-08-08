import fs from 'node:fs';
import { drive } from '../services/google/googleService.js';
import getRootFolder from './getRootFolder.js'
import getCourseFolder from './getCourseFolder.js'
import { assignmentProcessing } from '../../models/assignmentProcessingSchema.js';

export default async function uploadSolnToDrive(filePath, assignment, course) {


  const rootFolderId = await getRootFolder();

  const courseFolderId = await getCourseFolder(
    rootFolderId,
    course
  );


  const driveFileName = `2501030021-${assignment.title}-B1`
  // The request body for the file to be uploaded.
  const requestBody = {
    name: driveFileName,
    parents: [courseFolderId],
    fields: 'id,name',
  };

  // The media content to be uploaded.
  const media = {
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    body: fs.createReadStream(filePath),
  };

  // Upload the file.
  const file = await drive.files.create({
    requestBody,
    media,
  });

  const uploadDetails = file.data

  const fileId = uploadDetails.id

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "domain",
      domain: "mail.jiit.ac.in"
    }
  });

  const response = await drive.files.get({
    fileId,
    fields: "webViewLink"
  });

  const webViewLink = response.data.webViewLink;


  await assignmentProcessing.updateOne({ assignmentId: assignment.assignmentId },
    {
      $set: {
        driveFileLink: webViewLink,
        driveFileName: driveFileName,
        driveFileId: fileId
      }
    })



}




