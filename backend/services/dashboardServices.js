import { aiStatus } from "../../models/aiStatusSchema.js";
import { runtimeState } from "../utils/runtimeState.js";
import { aggregateQuery } from "../utils/aggregateQuery.js";
import { notifications } from "../../models/notificationSchema.js"


export async function fetchDashboardData(req, res) {

  try {

    const quota = await aiStatus.findOne();

    const assignments = await aggregateQuery({ submissionStatus: false })

    const Notifications = await notifications.find().sort({createdAt: -1}).limit(4)
      


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