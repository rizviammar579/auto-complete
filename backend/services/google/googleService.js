import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { runtimeState } from '../../utils/runtimeState.js';


// The scope for reading Classroom courses,courseworks and driveFiles.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.coursework.me',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'];


// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const TOKEN_PATH = path.join(process.cwd(), 'google-api-token.json');


async function loadSavedToken() {
    try {
        const token = await fs.readFile(TOKEN_PATH, 'utf8');
        return JSON.parse(token);
    } catch {
        return null;
    }
}


async function createOAuthClient() {

    const credentialsFile = await fs.readFile(CREDENTIALS_PATH, 'utf8');
    const credentials = JSON.parse(credentialsFile);

    const config = credentials.installed;

    const { client_id, client_secret, redirect_uris } = config;

    return new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

}

async function getAuthClient() {

    const savedToken = await loadSavedToken();

    if (savedToken) {
        const oauth2Client = await createOAuthClient();
        oauth2Client.setCredentials(savedToken);
        return oauth2Client;
    }

    const auth = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    await fs.mkdir(TOKEN_DIR, { recursive: true });

    await fs.writeFile(
        TOKEN_PATH,
        JSON.stringify(auth.credentials, null, 2)
    );

    return auth;

}

// Authenticate with Google and get an authorized client.
const auth = await getAuthClient()

// Create a new Classroom API client.
const classroom = google.classroom({ version: 'v1', auth });
runtimeState.googleClassroomConnected = true;

// Create a new Drive API client (v3).
const drive = google.drive({ version: 'v3', auth });
runtimeState.googleDriveConnected = true;


export { auth, classroom, drive };