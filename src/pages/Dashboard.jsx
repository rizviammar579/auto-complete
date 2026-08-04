import React from 'react'
import DashboardMainSection from '../components/DashboardMainSection'
import DashboardSideSection from '../components/DashboardSideSection'

const Dashboard = () => {
  return (

    <div className=''>
      <div className='flex h-[90vh]'>
      <DashboardMainSection/>
      <DashboardSideSection/>
    </div>
    </div>
  )
}

export default Dashboard
