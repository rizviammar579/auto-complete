import React from 'react'
import AssignmentTable from '../components/AssignmentTable'
import { useState, useEffect } from 'react'
import { Loader } from '../components/Loader'
import axios from 'axios'
import SelectedAssignmentLayout from '../components/SelectedAssignmentLayout'
import NoAssignments from '../components/NoAssignments'

const AssignmentsSection = () => {
  
  const [assignmentData, setAssignmentData] = useState(null)
  const [currentFilter, setCurrentFilter] = useState('unsubmitted')
  const [activeAssignment, setActiveAssignment] = useState()
  const [regeneratingId, setRegeneratingId] = useState(null)


  const filters = [
    { text: 'All' },
    { text: 'Submitted' },
    { text: 'Unsubmitted' },
    { text: 'Pending' },
    { text: 'Generated' },
    { text: 'Manual Review' },
  ]


  async function fetchAssignments(filter) {

    const response = await axios.get(
      `http://localhost:3000/assignments?filter=${filter}`
    );

    const assignments = response.data.assignments;

    const regeneratingAssignment = assignments.find(a => a.aiStatus === 'REGENERATING');
    if (regeneratingAssignment) setRegeneratingId(regeneratingAssignment.assignmentId);

    setAssignmentData(assignments);
    setActiveAssignment(regeneratingAssignment || assignments[0])

  }

  useEffect(() => {

    fetchAssignments(currentFilter);

  }, []);



  if (!assignmentData) {
    return <Loader />
  }



  return (
    <div className='font-inter flex'>


      <div className='w-fit flex flex-col gap-10 m-5 w-full'>

        <div className='border border-gray-300 w-fit rounded-[8px] border-[2px] mt-5'>

          {filters.map(filter => {

            return <button key={filter.text} className={`text-[14px]  w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter.text.toLowerCase() === currentFilter ? 'bg-gray-800 text-gray-100 ' : 'text-gray-800 bg-gray-100 font-semibold'}`} onClick={async () => {
              await fetchAssignments(filter.text.toLowerCase().replace(/\s+/g, "_"))
              setCurrentFilter(filter.text.toLowerCase())
            }}>{filter.text}</button>

          })}


        </div>

        <div className='w-full'>
          {assignmentData.length === 0 ? '' : <AssignmentTable assignments={assignmentData} activeAssignment={activeAssignment} setActiveAssignment={setActiveAssignment} />}
        </div>

      </div>



      <div className='w-[33vw] h-[87vh] flex justify-center items-center'>

        {assignmentData.length === 0 ? <NoAssignments/> :   <SelectedAssignmentLayout assignment={activeAssignment} fetchAssignments={fetchAssignments} currentFilter={currentFilter} regeneratingId={regeneratingId} setRegeneratingId={setRegeneratingId}/>}
        
      </div>



    </div>
  )
}

export default AssignmentsSection
