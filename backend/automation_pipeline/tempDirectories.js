import os from "os";
import fs from "fs";
import path from "path";

const tempDir = path.join(os.tmpdir(), "auto-complete");

const downloadsDir = path.join(tempDir, "downloads");
const solutionsDir = path.join(tempDir, "solutions");


async function makeTempDirectories() {

    fs.mkdirSync(downloadsDir, { recursive: true });
    fs.mkdirSync(solutionsDir, { recursive: true });

}

async function cleanupAssignmentDirectories(assignmentId) {

    const downloadAssignmentDir = path.join(
        downloadsDir,
        `assignment_${assignmentId}`
    );

    const solutionAssignmentDir = path.join(
        solutionsDir,
        `assignment_${assignmentId}`
    );

    await fs.promises.rm(downloadAssignmentDir, {
        recursive: true,
        force: true
    });

    await fs.promises.rm(solutionAssignmentDir, {
        recursive: true,
        force: true
    });

}

export { makeTempDirectories, cleanupAssignmentDirectories, downloadsDir, solutionsDir }

