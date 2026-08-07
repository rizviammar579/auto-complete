import React from 'react'
import GreetingSection from './GreetingSection'
import AssignmentCardSection from './AssignmentCardSection'

const DashboardMainSection = ({dashboardData}) => {



  return (
    <div className='w-[70%] px-5 h-[89vh] overflow-y-auto no-scrollbar'>
      <GreetingSection dashboardData={dashboardData}/>
      <div className='h-[1px] bg-gray-300'></div>
      <AssignmentCardSection dashboardData={dashboardData}/>
    </div>
  )
}

export default DashboardMainSection
