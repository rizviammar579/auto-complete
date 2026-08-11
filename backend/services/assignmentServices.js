import { aggregateQuery } from '../utils/aggregateQuery.js'

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
