import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import path from 'node:path';
import process from 'node:process';


// The scope for reading Classroom courses,courseworks and driveFiles.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.coursework.me',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive'];


// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// Authenticate with Google and get an authorized client.
const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
});


// Create a new Classroom API client.
const classroom = google.classroom({ version: 'v1', auth });


// Create a new Drive API client (v3).
const drive = google.drive({ version: 'v3', auth });


export { auth, classroom, drive };