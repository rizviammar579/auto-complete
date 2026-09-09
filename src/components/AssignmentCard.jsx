import React from 'react'
import { useState, useRef } from 'react'
import { formatDueDateTime } from '../../backend/utils/formatDueDateTime.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { RefreshCw } from 'lucide-react'

const AssignmentCard = ({ assignment, fetchDashboardData }) => {

  const status = {
    'GENERATED': { bg: 'bg-green-500', text: 'text-green-500', message: 'Solution Generated' },
    'PENDING': { bg: 'bg-orange-400', text: 'text-orange-400', message: 'Solution Pending' },
    'MANUAL REVIEW REQUIRED': { bg: 'bg-blue-500', text: 'text-blue-500', message: 'Manual Review Required' }
  }

  const handleCopy = async (link) => {
    await navigator.clipboard.writeText(link);
    toast.success("Copied to Clipboard")
  }

  const handleTurnIn = async (id) => {
    try {

      await axios.patch("http://localhost:3000/", {
        assignmentId: id
      }, {
        withCredentials: true
      });

      fetchDashboardData();

      toast.success("Assignment marked as turned in");


    } catch (error) {
      toast.error("Failed to turn in assignment");
    }
  };


  const [regeneratingId, setRegeneratingId] = useState(assignment.aiStatus === 'REGENERATING' ? assignment.assignmentId : null)

  async function regenerateSolution(assignment) {

    try {

      setRegeneratingId(assignment.assignmentId)

      const response = await axios.post(
        "http://localhost:3000/regenerate-solution",
        { Assignment: assignment }, {
        withCredentials: true
      }
      );

      if (response.data.success) toast.success(response.data.message)
      else toast.error(response.data.message)

      fetchDashboardData()


    } catch (err) {
      console.log(err)
      toast.error('Solution Regeneration Failed')
    } finally {
      setRegeneratingId(null)
    }

  }



  return (
    <div className='flex flex-col gap-6 font-inter border-[2px] border-gray-300 rounded-2xl min-w-[300px] bg-white p-4 z-0 max-w-[450px]'>

      <p className='bg-gray-100 border border-gray-300 text-gray-700 w-fit rounded-xl px-3 text-[14px] p-0.5'>{assignment.course.courseName}</p>

      <p className='text-[20px] font-semibold'>{assignment.assignment.title}</p>

      <div className='flex justify-between'>

        <p className='text-[14px] font-semibold text-gray-600'>{formatDueDateTime(assignment.dueDate, assignment.dueTime)}</p>

        <div className='flex gap-1 items-center'>
          <div className={`w-3 h-3 ${regeneratingId ? `bg-purple-500` : `${status[assignment.aiStatus].bg}`} rounded-full`}></div>
          <p className={`text-[13px] ${regeneratingId ? `text-purple-500` : `${status[assignment.aiStatus].text}`} font-semibold`}>
            {regeneratingId ? `Solution Regenerating` : `${status[assignment.aiStatus].message}`}
          </p>
        </div>

      </div>

      <div className='h-[1px] bg-gray-200'></div>

      <div className=' flex gap-5'>



        <a href={assignment.driveFileLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-gray-950 text-white text-[14px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-2 items-center justify-center w-full ${assignment.driveFileLink === ''
            ? "pointer-events-none"
            : "cursor-pointer"}`}>
          <img src="../../view.png" alt="" className='w-[20px] h-[20px]' /> Review Solution
        </a>

        <button disabled={regeneratingId ? true : false} className={`${regeneratingId ? 'pointer-events-none' : 'cursor-pointer'} bg-gray-950 text-white text-[14px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full`} onClick={() => {
          regenerateSolution(assignment);
        }}>

          {regeneratingId == assignment.assignmentId ? '' : <RefreshCw size={18} />}
          {regeneratingId == assignment.assignmentId ? 'Regenerating...' : 'Regenerate Solution'}</button>


      </div>

      <div className=' flex gap-3'>

        <a href={assignment.assignment.alternateLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full flex-col border border-gray-400 ${assignment.assignment.alternateLink === ''
            ? "pointer-events-none"
            : "cursor-pointer"}`}>
          <img src="../../googleclassroom.png" alt="" className='w-[24px] h-[24px]' /> Open Classroom
        </a>

        <button className='bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full flex-col border border-gray-400' onClick={() => {
          assignment.driveFileLink === '' ? toast.error("Nothing to copy") : handleCopy(assignment.driveFileLink)
        }}>
          <img src="../../googledrive.png" alt="" className='w-[24px] h-[24px]' />Copy Drive Link
        </button>

        <button className='bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full flex-col border border-gray-400' onClick={() => { handleTurnIn(assignment.assignmentId) }}>
          <img src="../../turnedin.png" alt="" className='w-[24px] h-[24px]' /> Mark as Turned In
        </button>



      </div>

    </div>
  )
}

export default AssignmentCard
