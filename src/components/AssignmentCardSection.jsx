import React from 'react'
import AssignmentCard from './AssignmentCard.jsx'

const AssignmentCardSection = () => {
    return (
        <div className=''>

            <h1 className='font-inter text-[20px] font-semibold my-4 mt-8'>Today's Focus</h1>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5'>
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                
            </div>
        </div>
    )
}

export default AssignmentCardSection
