import React from 'react'
import { formatDueDateTime } from '../../backend/utils/formatDueDateTime.js'
import toast from 'react-hot-toast'
import axios from 'axios'

const AssignmentCard = ({ assignment , fetchDashboardData }) => {

  const handleCopy = async (link) => {
    await navigator.clipboard.writeText(link);
    toast.success("Copied to Clipboard")
  }

  const handleTurnIn = async (id) => {
    try {

      await axios.patch("http://localhost:3000/", {
        assignmentId: id
      });

      fetchDashboardData();

      toast.success("Assignment marked as turned in");
      
      
    } catch (error) {
      toast.error("Failed to turn in assignment");
    }
  };



  return (
    <div className='flex flex-col gap-6 font-inter border-[2px] border-gray-300 rounded-2xl min-w-[300px] bg-white p-4 z-0 max-w-[450px]'>

      <p className='bg-gray-100 border border-gray-300 text-gray-700 w-fit rounded-xl px-3 text-[14px] p-0.5'>{assignment.course.courseName}</p>

      <p className='text-[20px] font-semibold'>{assignment.assignment.title}</p>

      <div className='flex justify-between'>

        <p className='text-[14px] font-semibold text-gray-600'>{formatDueDateTime(assignment.dueDate, assignment.dueTime)}</p>

        {assignment.aiStatus === "GENERATED" ? <div className='flex gap-1 items-center'>
          <div className='w-3 h-3 bg-green-500 text-green-500 rounded-full'></div>
          <p className='text-[13px] text-green-500 font-semibold'>Solution Generated</p>
        </div> : <div className='flex gap-1 items-center'>
          <div className='w-3 h-3 bg-orange-400 text-orange-400 rounded-full'></div>
          <p className='text-[13px] text-orange-400 font-semibold'>Solution Pending</p>
        </div>}

      </div>

      <div className='h-[1px] bg-gray-200'></div>

      <div className=' flex gap-5'>

        <a href={assignment.assignment.materials[0]?.localPath}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-gray-950 text-white text-[14px] px-3 py-1.5 rounded-lg flex gap-2 items-center justify-center w-full ${assignment.assignment.materials[0]?.localPath === ''
            ? "pointer-events-none"
            : "cursor-pointer"}`}>
          <img src="../../public/open.png" alt="" className='w-[24px] h-[24px]' /> Open Assignment
        </a>

        <a href={assignment.driveFileLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-gray-950 text-white text-[14px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-2 items-center justify-center w-full ${assignment.driveFileLink === ''
            ? "pointer-events-none"
            : "cursor-pointer"}`}>
          <img src="../../public/view.png" alt="" className='w-[20px] h-[20px]' /> Review Solution
        </a>


      </div>

      <div className=' flex gap-3'>

        <a href={assignment.assignment.alternateLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full flex-col border border-gray-400 ${assignment.assignment.alternateLink === ''
            ? "pointer-events-none"
            : "cursor-pointer"}`}>
          <img src="../../public/googleclassroom.png" alt="" className='w-[24px] h-[24px]' /> Open Classroom
        </a>

        <button className='bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full flex-col border border-gray-400' onClick={()=>{
          assignment.driveFileLink === '' ? toast.error("Nothing to copy"): handleCopy(assignment.driveFileLink)
        }}>
          <img src="../../public/googledrive.png" alt="" className='w-[24px] h-[24px]' />Copy Drive Link
        </button>

        <button className='bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full flex-col border border-gray-400' onClick={() => { handleTurnIn(assignment.assignmentId) }}>
          <img src="../../public/turnedin.png" alt="" className='w-[24px] h-[24px]' /> Mark as Turned In
        </button>



      </div>

    </div>
  )
}

export default AssignmentCard
