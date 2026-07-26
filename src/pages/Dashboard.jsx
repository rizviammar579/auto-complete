import React from 'react'
import DashboardMainSection from '../components/DashboardMainSection'
import DashboardSideSection from '../components/DashboardSideSection'

const Dashboard = () => {
  return (

    <div className=''>
      <div className='flex overflow-y-scroll'>
      <DashboardMainSection/>
      <DashboardSideSection/>
    </div>
    </div>
  )
}

export default Dashboard
