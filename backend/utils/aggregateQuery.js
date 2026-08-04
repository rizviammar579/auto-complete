import { assignmentProcessing } from "../../models/assignmentProcessingSchema.js";

export async function aggregateQuery(match = {}) {

    return await assignmentProcessing.aggregate([

        {
            $match: match
        },

        {
            $lookup: {
                from: "assignments",
                localField: "assignmentId",
                foreignField: "assignmentId",
                as: "assignment"
            }
        },

        {
            $unwind: "$assignment"
        },

        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "courseId",
                as: "course"
            }
        },

        {
            $unwind: "$course"
        }

    ]);

}


