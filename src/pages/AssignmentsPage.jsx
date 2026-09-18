import React from 'react'
import AssignmentsSection from '../components/AssignmentsSection'
import Sidebar from '../components/Sidebar'
import DisplaySection from '../components/DisplaySection'

const AssignmentsPage = () => {
  return (
    <div className="bg-black h-[100vh] p-3 flex overflow-hidden">
      <Sidebar />
      <DisplaySection component={<AssignmentsSection />} />
    </div>
  )
}

export default AssignmentsPage

