import { drive } from "../services/google/googleService.js";

export default async function getCourseFolder(parentFolderId, course) {

    const folderName = `${course.courseName}`;

    const response = await drive.files.list({
        q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
        fields: "files(id,name)"
    });

    if (response.data.files.length > 0) {
        return response.data.files[0].id;
    }

    const folder = await drive.files.create({
        requestBody: {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [parentFolderId]
        },
        fields: "id"
    });

    return folder.data.id;
}