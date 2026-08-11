import React from 'react'
import { CalendarDays } from 'lucide-react'
import { formatDueDateTime } from '../../backend/utils/formatDueDateTime'

const SelectedAssignmentLayout = ({ assignment }) => {

    const status = {
        'GENERATED': { bg: 'bg-purple-100', text: 'text-purple-500', border: 'border-purple-300' },
        'PENDING': { bg: 'bg-orange-100', text: 'text-orange-400', border: 'border-orange-300' },
        'MANUAL REVIEW REQUIRED': { bg: 'bg-blue-100', text: 'text-blue-500', border: 'border-blue-300' }
    }

    return (
        <div className='bg-white w-[350px] h-full mt-2 rounded-xl p-5 w-[350px]'>

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
                                rel="noopener noreferrer" href={assignment.assignment.alternateLink} className='text-blue-500 font-bold text-[12px]'>
                                Open Classroom
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className='h-[1px] bg-gray-300 my-5'></div>


            <div className='flex gap-1 items-center text-[14px]'>

                <div><img src="../../public/geminiai.png" alt="" className='w-[20px] h-[20px]' /></div>
                <div className='font font-semibold'>AI Status</div>
                <div className={`px-2 rounded-sm text-[13px] font-semibold ml-5 border ${status[assignment.aiStatus].border} ${status[assignment.aiStatus].bg} ${status[assignment.aiStatus].text}`}>{assignment.aiStatus}</div>

            </div>

            <div className='h-[0.5px] bg-gray-300 my-5'></div>

            <div className='flex  items-center'>
                <div className='font font-semibold'>Submission Status</div>
                <div className={`px-2 rounded-sm text-[13px] font-semibold ml-5 border bg-amber-100 text-yellow-500 border-yellow-400`}>{assignment.submissionStatus ? 'SUBMITTED' : 'NOT SUBMITTED'}</div>

            </div>

            <div className='h-[1px] bg-gray-300 my-5'></div>

            <div className='flex flex-col gap-2.5  justify-start w-full'>

                <a href={assignment.assignment.materials[0]?.localPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='cursor-pointer rounded-sm p-1 border border-gray-500 text-gray-500 bg-gray-50'>Open Assignment</a>

                <a href={assignment.driveFileLink}
                    target="_blank"
                    rel="noopener noreferrer" className='cursor-pointer rounded-sm p-1 border border-blue-300 text-blue-500 bg-blue-100'>Review Solution</a>

                <button className='cursor-pointer text-start rounded-sm p-1 border border-purple-300 text-purple-500 bg-purple-100'>Regenerate Solution</button>

                <button className='cursor-pointer text-start rounded-sm p-1 border border-green-300 text-green-500 bg-green-100'>Mark as Turned In</button>

                <button className='cursor-pointer text-start rounded-sm p-1 border border-red-300 text-red-500 bg-red-100'>Delete Assignment</button>

            </div>

        </div>
    )
}

export default SelectedAssignmentLayout
