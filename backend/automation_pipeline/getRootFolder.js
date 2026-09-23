import { drive } from "../services/google/googleService.js";

export default async function getRootFolder() {

    const response = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and name='Assignment Automation' and trashed=false",
        fields: "files(id,name)"
    });

    if (response.data.files.length > 0) {
        return response.data.files[0].id;
    }

    const folder = await drive.files.create({
        requestBody: {
            name: "Assignment Automation",
            mimeType: "application/vnd.google-apps.folder"
        },
        fields: "id"
    });

    return folder.data.id;
}