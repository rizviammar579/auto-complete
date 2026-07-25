import React from 'react'
import GreetingSection from './GreetingSection'
import AssignmentCardSection from './AssignmentCardSection'

const DashboardMainSection = () => {
  return (
    <div className='w-[70%] px-5 h-[83vh]'>
      <GreetingSection/>
      <div className='h-[1px] bg-gray-300'></div>
      <AssignmentCardSection/>
    </div>
  )
}

export default DashboardMainSection
