import React from 'react'
import HistorySection from '../components/HistorySection'
import Sidebar from '../components/Sidebar'
import DisplaySection from '../components/DisplaySection'

const HistoryPage = () => {
  return (
    <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
      <Sidebar />
      <DisplaySection component={<HistorySection />} />
    </div>
  )
}

export default HistoryPage
