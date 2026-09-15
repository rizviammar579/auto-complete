import React from 'react'
import SystemStatus from './SystemStatus'
import DashboardNotification from './DashboardNotification'


const DashboardSideSection = ({dashboardData}) => {
  return (
    <div className='bg-gray-100 p-5 flex flex-col gap-5'>
      <SystemStatus dashboardData={dashboardData}/>
      <DashboardNotification dashboardData={dashboardData}/>
    </div>
  )
}

export default DashboardSideSection
