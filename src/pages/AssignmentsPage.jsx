import React from 'react'
import AssignmentTable from '../components/AssignmentTable'
import { useState } from 'react'
import { Loader } from '../components/Loader'

const AssignmentsPage = () => {

   
  const [assignmentData, setAssignmentData] = useState([])
  const [currentFilter, setCurrentFilter] = useState('All')

  const filters = [
    { text: 'All' },
    { text: 'Submitted' },
    { text: 'Unsubmitted' },
    { text: 'Pending' },
    { text: 'Generated' },
    { text: 'Manual Review' },
  ]


  if (!assignmentData) {
        return <Loader />
      }

  return (
    <div className='font-inter flex gap-5 overflow-x-auto'>


      <div className='w-[60%] flex flex-col gap-10 m-5'>

        <div className='border border-gray-300 w-fit rounded-[8px] border-[2px] mt-5'>

          {filters.map(filter => {

            return <button key={filter.text} className={`text-[14px]  w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter.text === currentFilter ? 'bg-gray-800 text-gray-100 ' : 'text-gray-800 bg-gray-100 font-semibold'}`} onClick={() => setCurrentFilter(filter.text)}>{filter.text}</button>

          })}


        </div>

        <AssignmentTable />

      </div>



      <div className='border w-[40%] '>hi</div>



    </div>
  )
}

export default AssignmentsPage
