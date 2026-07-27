import React from 'react'
import AssignmentTable from '../components/AssignmentTable'

const AssignmentsPage = () => {
  return (
    <div className='font-inter p-5 flex flex-col gap-7 overflow-x-auto'>
    <h1 className='text-[28px] font-bold'>Assignment Overview</h1>
    <AssignmentTable/>
    </div>
  )
}

export default AssignmentsPage
