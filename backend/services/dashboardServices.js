import { aiStatus } from "../../models/aiStatusSchema.js";
import { runtimeState } from "../utils/runtimeState.js";
import { aggregateQuery } from "../utils/aggregateQuery.js";
import { notifications } from "../../models/notificationSchema.js"
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js"
import { cleanupDriveFile } from "../automation_pipeline/cleanupDriveFile.js"
import { createNotification } from "../utils/createNotification.js";
import { canUseAI } from "../automation_pipeline/canUseAI.js";
import { downloadCoursework } from "../automation_pipeline/downloadCoursework.js";
import { generateSolution } from "../automation_pipeline/generateSolution.js";
import { cleanupAssignmentDirectories } from "../automation_pipeline/tempDirectories.js";


export async function fetchDashboardData(req, res) {

  try {

    const quota = await aiStatus.findOne();

    const assignments = await aggregateQuery({ submissionStatus: false })

    const Notifications = await notifications.find().sort({ createdAt: -1 }).limit(4)


    const data = {

      systemStatus: {

        googleDriveConnected: runtimeState.googleDriveConnected,
        googleClassroomConnected: runtimeState.googleClassroomConnected,
        mongoDBConnected: runtimeState.mongoDBConnected,
        automationRunning: runtimeState.automationRunning,
        lastSync: runtimeState.lastSync,
        aiAvailable: !quota.aiQuotaExceeded

      },

      notSubmittedAssignments: assignments,

      notifications: Notifications

    }

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

}

export async function markAsTurnedIn(req, res) {

  try {

    const { assignmentId } = req.body;

    const data = await assignmentProcessing.updateOne(
      { assignmentId: assignmentId },
      {
        $set: { submissionStatus: true }
      }
    );

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

}


export async function regenerateSolution(req, res) {

  try {

    const { Assignment } = req.body

    if (!await canUseAI()) {

      await createNotification(
        'Solution cannot be regenerated',
        `Solution cannot be regenerated for ${Assignment.course.courseName} - ${Assignment.assignment.title}. Gemini is not available. Try again tomorrow.`,
        'warning'
      )

      res.status(200).json({ success: false, message: 'Gemini Unavailable' });

      return

    }


    await assignmentProcessing.updateOne({ assignmentId: Assignment.assignmentId },
      {
        $set: {
          aiStatus: "REGENERATING"
        }
      }
    )


    const assignment = await downloadCoursework(Assignment.assignment)

    const result = await generateSolution(assignment, Assignment.course)

    await cleanupAssignmentDirectories(assignment.assignmentId)


    if (result) {

      await cleanupDriveFile(Assignment);

      await createNotification(
        'Solution Regenerated',
        `Solution regenerated successfully for ${Assignment.course.courseName} - ${Assignment.assignment.title}`,
        'info'
      )

      res.status(200).json({ success: true, message: 'Solution Regenerated Successfully' });

    } else {

      await assignmentProcessing.updateOne({ assignmentId: Assignment.assignmentId },
        {
          $set: {
            aiStatus: "GENERATED"
          }
        }
      )

      await createNotification(
        'Solution Regeneration Failed',
        `Solution regeneration failed for ${Assignment.course.courseName} - ${Assignment.assignment.title}`,
        'error'
      )

      res.status(200).json({ success: false, message: 'Solution Regeneration Failed' });

    }


  } catch (err) {

    await cleanupAssignmentDirectories(assignment.assignmentId)

    await assignmentProcessing.updateOne(
      { assignmentId: Assignment.assignmentId },
      {
        $set: {
          aiStatus: "GENERATED"
        }
      }
    )

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

}
