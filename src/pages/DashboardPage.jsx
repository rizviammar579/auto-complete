import React from 'react'
import Sidebar from '../components/Sidebar'
import DisplaySection from '../components/DisplaySection'
import DashboardSection from '../components/DashboardSection'


const DashboardPage = () => {
return (
    <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
      <Sidebar />
      <DisplaySection component={<DashboardSection/>} />
    </div>
  )
}

export default DashboardPage
