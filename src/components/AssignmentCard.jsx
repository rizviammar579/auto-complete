import React from 'react'
import { formatDueDateTime } from '../../backend/utils/formatDueDateTime.js'

const AssignmentCard = ({ assignment }) => {
  return (
    <div className='flex flex-col gap-6 font-inter border-[2px] border-gray-300 rounded-2xl min-w-[300px] bg-white p-3 z-0'>
      <p className='bg-gray-100 border border-gray-700 text-gray-700 w-fit rounded-xl px-3 text-[14px]'>{assignment.course.courseName}</p>
      <p className='text-[18px] font-semibold'>{assignment.assignment.title}</p>
      <div className='flex justify-between'>
        <p className='text-[14px] font-semibold text-gray-600'>{formatDueDateTime(assignment.dueDate, assignment.dueTime)}</p>
        <div className='flex gap-1 items-center'>
          <div className='w-3 h-3 bg-green-500 text-green-500 rounded-full'></div>
          <p className='text-[13px] text-green-500 font-semibold'>Solution Ready</p>
        </div>
      </div>

      <div className=' flex gap-5'>
        <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer'><a href="">Open Assigment</a></button>
        <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer'>Copy Drive Link</button>
      </div>
      <div className=' flex gap-5'>
        <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer'>Review Solution</button>
        <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer'>Copy Drive Link</button>
      </div>

    </div>
  )
}

export default AssignmentCard
