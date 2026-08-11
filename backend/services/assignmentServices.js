import { aggregateQuery } from '../utils/aggregateQuery.js'
import { assignmentProcessing } from '../../models/assignmentProcessingSchema.js'

export async function fetchAssignmentData(req, res) {

  try {

    const { filter } = req.query

    const query = {
        all : {},
        submitted : {submissionStatus : true},
        unsubmitted : {submissionStatus : false},
        pending : {aiStatus : 'PENDING'},
        generated : {aiStatus : 'GENERATED'},
        manual_review: {aiStatus : 'MANUAL REVIEW REQUIRED'},
    }
    

    const assignments = await aggregateQuery(query[filter]) 

    const data = { assignments }

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