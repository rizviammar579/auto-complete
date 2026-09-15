import React from 'react'
import Sidebar from '../components/Sidebar'
import DisplaySection from '../components/DisplaySection'
import DashboardSection from '../components/DashboardSection'


const DashboardPage = () => {
return (
    <div className="bg-black h-[100vh] flex px-2 py-2 dx:p-3 z-50 overflow-hidden">
      <Sidebar />
      <DisplaySection component={<DashboardSection/>} />
    </div>
  )
}

export default DashboardPage
