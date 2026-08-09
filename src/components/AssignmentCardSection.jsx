import React from 'react'
import AssignmentCard from './AssignmentCard.jsx'

const AssignmentCardSection = ({ dashboardData , fetchDashboardData }) => {

    const assignments = dashboardData?.notSubmittedAssignments
    console.log(assignments)

    return (
        <div className=''>

            <h1 className='font-inter text-[20px] font-semibold my-4 mt-8 mb-10'>Today's Focus</h1>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5 mb-20'>

                {assignments.map((assignment) => {
                    return <AssignmentCard assignment={assignment} key={assignment.assignmentId} fetchDashboardData={fetchDashboardData}/>
                })}


            </div>
        </div>
    )
}

export default AssignmentCardSection
