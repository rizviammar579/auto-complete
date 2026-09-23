import { Assignment } from '../../models/assignmentSchema.js'
import { assignmentProcessing } from '../../models/assignmentProcessingSchema.js';

export async function upsertCoursework(assignments) {

  for (const assignment of assignments) {


    const array = await Promise.all((assignment.materials || []).map(async (material) => {


      if (material.driveFile) {

        let mat = material.driveFile.driveFile


        return {
          type: "driveFile",
          title: mat.title || "",
          url: mat.alternateLink || "",
          fileId: mat.id || "",
          localPath: "",
          fileName: "",
          downloadedAt: null,
        };
      }

      else if (material.form) {
        return {
          type: "form",
          title: material.form.title || "",
          url: material.form.formUrl || "",
          fileId: "",
          localPath: "",
          fileName: "",
          downloadedAt: null,

        };
      }
      else {
        return null
      }

    }))

    const filteredArray = array.filter(Boolean);




    await Assignment.updateOne(
      { assignmentId: assignment.id },

      {
        assignmentId: assignment.id,

        courseId: assignment.courseId,

        title: assignment.title,

        dueDate: assignment.dueDate,

        dueTime: assignment.dueTime,

        alternateLink: assignment.alternateLink,

        materials: filteredArray,

        description: assignment.description

      },
      { upsert: true }
    );

    await assignmentProcessing.updateOne(
      { assignmentId: assignment.id },

      {
        $setOnInsert: {
          assignmentId: assignment.id,
          courseId: assignment.courseId,
          dueDate: assignment.dueDate,
          dueTime: assignment.dueTime,
          aiStatus: 'PENDING'
        }

      },
      { upsert: true }
    );


  }


}


