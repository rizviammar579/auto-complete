import React from 'react'
import GreetingSection from './GreetingSection'
import AssignmentCardSection from './AssignmentCardSection'

const DashboardMainSection = ({dashboardData, fetchDashboardData}) => {



  return (
    <div className='px-1.5 ix:px-3 dx:px-5 h-[89vh] overflow-y-auto no-scrollbar'>
      <GreetingSection dashboardData={dashboardData}/>
      <div className='h-[1px] bg-gray-300'></div>
      <AssignmentCardSection dashboardData={dashboardData} fetchDashboardData={fetchDashboardData}/>
    </div>
  )
}

export default DashboardMainSection
