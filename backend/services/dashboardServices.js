import { aiStatus } from "../../models/aiStatusSchema.js";
import { runtimeState } from "../utils/runtimeState.js";
import { aggregateQuery } from "../utils/aggregateQuery.js";
import { notifications } from "../../models/notificationSchema.js"
import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js"
import { cleanup } from "../functions/cleanup.js"
import { canUseFileUpload } from "../functions/canUseFileUpload.js";
import { processWithFileUpload } from "../functions/processWithFileUpload.js";
import { processWithTextExtraction } from "../functions/processWithTextExtraction.js";
import { createNotification } from "../utils/createNotification.js";
import { canUseAI } from "../functions/canUseAI.js";


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



    await cleanup(Assignment);


    const { assignment, course, ...pendingAssignment } = Assignment

    if (await canUseFileUpload()) {

      await processWithFileUpload(pendingAssignment, Assignment.assignment, Assignment.course)

    } else {

      await processWithTextExtraction(pendingAssignment, Assignment.assignment, Assignment.course);

    }

    const updatedAssignment = await assignmentProcessing.findOne({ assignmentId: Assignment.assignmentId })

    if (updatedAssignment.aiStatus === "GENERATED") {

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
            aiStatus: "PENDING"
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

    res.status(500).json({
      message: err.message
    });

  }

}




/*
 [
  {
    _id: ObjectId("..."),

    assignmentId: "A101",
    courseId: "CSE101",

    dueDate: {...},
    dueTime: {...},

    aiStatus: "completed",
    submissionStatus: false,

    solutionPath: "/abc.docx",

    solutionGeneratedAt: null,

    driveFileId: "",
    driveFileName: "",
    driveFileLink: "",

    assignment: {
      _id: ObjectId("..."),

      assignmentId: "A101",
      courseId: "CSE101",

      title: "Assignment 3",
      description: "Solve questions",

      state: "PUBLISHED",
      workType: "ASSIGNMENT",

      dueDate: {...},
      dueTime: {...},

      maxPoints: 100,

      alternateLink: "...",

      materials: [
        ...
      ]
    },

    course: {
      _id: ObjectId("..."),

      courseId: "CSE101",

      courseName: "DBMS",

      courseStatus: "ACTIVE"
    }
  }
]
*/

/*
"notifications": [
    {},
    {},
    {},
    {}
  ]
*/