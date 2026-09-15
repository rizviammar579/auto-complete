import React from 'react'
import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { formatDueDateTime } from '../../backend/utils/formatDueDateTime'
import { Search, FileText, Check, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAccessDenied } from '../context/AccessDeniedContext'

const SelectedAssignmentLayout = ({ assignment, fetchAssignments, currentFilter, regeneratingId, setRegeneratingId }) => {

    const { showAccessDenied } = useAccessDenied();

    const status = {
        'GENERATED': { bg: 'bg-purple-100', text: 'text-purple-500', border: 'border-purple-300' },
        'PENDING': { bg: 'bg-orange-100', text: 'text-orange-400', border: 'border-orange-300' },
        'MANUAL REVIEW REQUIRED': { bg: 'bg-blue-100', text: 'text-blue-500', border: 'border-blue-300' },
        'REGENERATING': { bg: 'bg-purple-100', text: 'text-purple-500', border: 'border-purple-300' }
    }

    const handleCopy = async (link) => {
        await navigator.clipboard.writeText(link);
        toast.success("Copied to Clipboard")
    }

    const handleTurnIn = async (id) => {
        try {

            await axios.patch("http://localhost:3000/assignments", {
                assignmentId: id
            }, {
                withCredentials: true
            });

            fetchAssignments(currentFilter)

            toast.success("Assignment marked as turned in");


        } catch (error) {
            if (error.response?.status === 403) {
                showAccessDenied();
            } else {
                toast.error("Failed to turn in assignment");
            }

        }
    };





    async function regenerateSolution(assignment) {

        try {


            setRegeneratingId(assignment.assignmentId)

            const response = await axios.post(
                "http://localhost:3000/regenerate-solution",
                { Assignment: assignment }, {
                withCredentials: true
            }
            );


            fetchAssignments(currentFilter)

            if (response.data.success) toast.success('Solution Regenerated Successfully')
            else toast.error('Solution Regeneration Failed')


        } catch (error) {

            if (error.response?.status === 403) {
                showAccessDenied();
            } else {
                console.log(error)
                toast.error('Solution Regeneration Failed')
            }

        } finally {
            setRegeneratingId(null)
        }

    }



    return (
        <div className='bg-white w-[350px] h-full rounded-xl p-5 w-fit m-2 mt-6'>

            <div className='flex'>
                <div className='w-[80%] flex flex-col gap-3'>
                    <div className='text-xl font-semibold'>{assignment.course?.courseName}</div>
                    <div className='px-3 w-fit font-semibold border border-[#528eee] text-[#1d4990] bg-[#E8F1FF] rounded-sm'>{assignment.assignment.title}</div>
                </div>
                <div></div>
            </div>

            <div className='h-[1px] bg-gray-300 my-5'></div>


            <div className='flex gap-2'>
                <div className='flex flex-col gap-1 w-[45%]'>
                    <div className='font-semibold '>Due Date</div>
                    <div className='flex gap-1  text-[14px]'>
                        <CalendarDays size={18} />
                        <div className='max-w-[100px] text-gray-500'>
                            {formatDueDateTime(assignment.assignment.dueDate, assignment.assignment.dueTime)}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-1  w-[55%]'>
                    <div className='font-semibold '>Classroom</div>
                    <div className='flex gap-1 text-gray-500 text-[14px] items-center gap-2'>

                        <img src="../../googleclassroom.png" alt="" className='w-[30px] h-[30px]' />

                        <div className='max-w-[100px]'>
                            <a target="_blank"
                                onClick={(e) => e.stopPropagation()}
                                rel="noopener noreferrer" href={assignment.assignment.alternateLink} className='text-blue-500 font-semibold text-[12px]'>
                                Open Classroom
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className='h-[1px] bg-gray-300 my-5'></div>


            <div className='flex gap-1 items-center text-[14px]'>

                <div><img src="../../geminiai.png" alt="" className='w-[20px] h-[20px]' /></div>
                <div className='font font-semibold'>AI Status</div>
                <div className={`px-2 rounded-sm text-[13px] font-semibold ml-5 border ${regeneratingId === assignment.assignmentId ? 'border-purple-300 , bg-purple-100 text-purple-500' : `${status[assignment.aiStatus]?.border} , ${status[assignment.aiStatus]?.bg} , ${status[assignment.aiStatus]?.text}`} `}>{regeneratingId === assignment.assignmentId ? 'REGENERATING' : assignment.aiStatus}</div>

            </div>

            <div className='h-[0.5px] bg-gray-300 my-5'></div>

            <div className='flex  items-center'>
                <div className='font font-semibold'>Submission Status</div>
                <div className={`px-2 rounded-sm text-[13px] font-semibold ml-5 border bg-amber-100 text-yellow-500 border-yellow-400`}>{assignment.submissionStatus ? 'SUBMITTED' : 'NOT SUBMITTED'}</div>

            </div>

            <div className='h-[1px] bg-gray-300 my-5'></div>

            <div className='flex flex-col gap-2.5  justify-start w-full'>



                <div className='flex flex-col gap-2.5  justify-start w-full'>

                    <div className='mb-2 font-semibold'>
                        Actions
                    </div>

                    <a href={assignment.driveFileLink}
                        target="_blank"
                        rel="noopener noreferrer" className={`bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full  border border-gray-400 ${assignment.driveFileLink === ''
                            ? "pointer-events-none"
                            : "cursor-pointer"}`}>

                        <Search size={18} />
                        Review Solution</a>



                    {assignment.submissionStatus ? '' :

                        <button disabled={regeneratingId ? true : false} className={`${regeneratingId ? 'pointer-events-none' : 'cursor-pointer'} bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full  border border-gray-400`} onClick={() => { regenerateSolution(assignment) }}>

                            {regeneratingId == assignment.assignmentId ? '' : <RefreshCw size={18} />}
                            {regeneratingId == assignment.assignmentId ? 'Regenerating...' : 'Regenerate Solution'}

                        </button>

                    }

                    <button className='bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full  border border-gray-400' onClick={() => {
                        assignment.driveFileLink === '' ? toast.error("Nothing to copy") : handleCopy(assignment.driveFileLink)
                    }}>
                        <img src="../../googledrive.png" alt="" className='w-[24px] h-[24px]' />Copy Drive Link
                    </button>

                    {assignment.submissionStatus ? '' : <button className='bg-white text-black text-[13px] px-3 py-1.5 rounded-lg cursor-pointer flex gap-1 items-center justify-center w-full flex border border-gray-400' onClick={() => { handleTurnIn(assignment.assignmentId) }}>
                        <img src="../../turnedin.png" alt="" className='w-[24px] h-[24px]' /> Mark as Turned In
                    </button>}

                </div>

            </div>

        </div>
    )
}

export default SelectedAssignmentLayout
