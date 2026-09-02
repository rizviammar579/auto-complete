import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import path from 'node:path';
import process from 'node:process';
import { runtimeState } from '../../utils/runtimeState.js';
import open from 'open'


// The scope for reading Classroom courses,courseworks and driveFiles.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.coursework.me',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'];


// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// Authenticate with Google and get an authorized client.
const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
});

open('http://localhost:5173')


// Create a new Classroom API client.
const classroom = google.classroom({ version: 'v1', auth });
runtimeState.googleClassroomConnected = true;

// Create a new Drive API client (v3).
const drive = google.drive({ version: 'v3', auth });
runtimeState.googleDriveConnected = true;


export { auth, classroom, drive };