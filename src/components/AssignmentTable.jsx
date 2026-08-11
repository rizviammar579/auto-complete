import React from 'react'
import { formatDueDateTime } from '../../backend/utils/formatDueDateTime'
import { CalendarDays } from 'lucide-react'

const AssignmentTable = ({ assignments, activeAssignment, setActiveAssignment }) => {



  return (
    <div className='overflow-x-auto max-h-[70vh] overflow-x-auto '>
      <table className='w-full border-collapse overflow-hidden rounded-xl'>
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Course</th>
            <th className="px-6 py-4 text-left font-semibold">Assignment</th>
            <th className="px-6 py-4 text-left font-semibold">Due Date</th>
            <th className="px-6 py-4 text-left font-semibold">Classroom</th>
          </tr>
        </thead>

        <tbody>


          {assignments.map((assignment) => (
            <tr key={assignment.assignmentId} className={` ${activeAssignment === assignment ? 'border-gray-200 rounded-full border-l-[#2563EB] bg-[#E8F1FF] border-l-[4px]' : 'border border-gray-200 hover:bg-gray-50 transition'}`} onClick={() => { setActiveAssignment(assignment) }}>
              <td className="px-6 py-4 font-semibold text-gray-800">{assignment.course.courseName}</td>
              <td className="px-6 py-4 font-semibold text-gray-800">{assignment.assignment.title}</td>
              <td className="px-6 py-4 font-semibold text-[#374151] text-gray-500 ">
               <div className='flex gap-1 justify-center items-center'>
                 <CalendarDays size={18}/>
                <div className='min-w-[150px]'>
                  {formatDueDateTime(assignment.assignment.dueDate, assignment.assignment.dueTime)}
                </div>
               </div>
               </td>
              <td className="px-6 py-4 font-semibold flex items-center justify-center">
                <a target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  rel="noopener noreferrer" href={assignment.assignment.alternateLink} className='border p-1.5 text-gray-300 rounded-xl'>
                  <img src="../../googleclassroom.png" alt="" className='w-[35px] h-[35px]' />
                </a>
              </td>


            </tr>
          ))}


        </tbody>
      </table>
    </div>
  )
}

export default AssignmentTable
