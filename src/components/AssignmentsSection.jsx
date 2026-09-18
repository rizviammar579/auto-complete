import React, { useState, useEffect } from 'react'
import AssignmentTable from '../components/AssignmentTable'
import { Loader } from '../components/Loader'
import axios from 'axios'
import SelectedAssignmentLayout from '../components/SelectedAssignmentLayout'
import NoAssignments from '../components/NoAssignments'

const AssignmentsSection = () => {
  
  const [assignmentData, setAssignmentData] = useState(null)
  const [currentFilter, setCurrentFilter] = useState('unsubmitted')
  const [activeAssignment, setActiveAssignment] = useState()
  const [regeneratingId, setRegeneratingId] = useState(null)
  const [show, setShow] = useState(window.innerWidth < 1400 ? false : true)

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
    )

    const assignments = response.data.assignments
    const regeneratingAssignment = assignments.find(
      (a) => a.aiStatus === 'REGENERATING'
    )
    if (regeneratingAssignment) setRegeneratingId(regeneratingAssignment.assignmentId)

    setAssignmentData(assignments)
    setActiveAssignment(regeneratingAssignment || assignments[0])
  }

  useEffect(() => {
    fetchAssignments(currentFilter)
  }, [])

  if (!assignmentData) {
    return <Loader />
  }

  return (
    <div className="font-inter flex flex-row w-full overflow-hidden">

      <div className="flex flex-col gap-10 min-w-0 m-5 w-full">

        <div className="flex flex-wrap cx:border cx:border-gray-300 w-fit rounded-[8px] cx:border-[2px] mt-5 cx:gap-0 gap-3">

          {filters.map((filter) => {
            return (
              <button
                key={filter.text}
                className={`border border-gray-300 cx:border-none text-[14px] w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter.text.toLowerCase() === currentFilter
                  ? 'bg-gray-800 text-gray-100'
                  : 'text-gray-800 bg-gray-100 font-semibold'
                  }`}
                onClick={async () => {
                  await fetchAssignments(filter.text.toLowerCase().replace(/\s+/g, '_'))
                  setCurrentFilter(filter.text.toLowerCase())
                }}
              >
                {filter.text}
              </button>
            )
          })}

        </div>

        <div className="w-full flex items-center min-w-0">

          {assignmentData.length === 0 ? <NoAssignments /> : <AssignmentTable
              assignments={assignmentData}
              activeAssignment={activeAssignment}
              setActiveAssignment={setActiveAssignment}
              show={show}
              setShow={setShow}
            />
          }
        </div>
      </div>

      <div className={`mx:w-[33vw] h-[87vh] flex justify-center items-center ${show ? '' : 'hidden'}`}
      >
        {assignmentData.length === 0 ? '':<SelectedAssignmentLayout
            assignment={activeAssignment}
            fetchAssignments={fetchAssignments}
            currentFilter={currentFilter}
            regeneratingId={regeneratingId}
            setRegeneratingId={setRegeneratingId}
            show={show}
            setShow={setShow}
          />
        }
      </div>
    </div>
  )
}

export default AssignmentsSection
