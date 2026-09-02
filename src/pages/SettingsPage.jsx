import React from 'react'
import Sidebar from '../components/Sidebar'
import DisplaySection from '../components/DisplaySection'
import SettingsSection from '../components/SettingsSection'

const SettingsPage = () => {
return (
    <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
      <Sidebar />
      <DisplaySection component={<SettingsSection />} />
    </div>
  )
}

export default SettingsPage
