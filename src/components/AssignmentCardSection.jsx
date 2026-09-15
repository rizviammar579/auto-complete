import React from 'react'
import AssignmentCard from './AssignmentCard.jsx'

const AssignmentCardSection = ({ dashboardData , fetchDashboardData }) => {

    const assignments = dashboardData?.notSubmittedAssignments

    return (
        <div className=''>

            <h1 className='font-inter text-[20px] font-semibold my-4 mt-8 mb-6 dx:mb-10'>Today's Focus</h1>
            <div className='grid dx:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 mb-20'>

                {assignments.map((assignment) => {
                    return <AssignmentCard assignment={assignment} key={assignment.assignmentId} fetchDashboardData={fetchDashboardData}/>
                })}


            </div>
        </div>
    )
}

export default AssignmentCardSection
