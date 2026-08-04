import React from 'react'
import Navbar from './Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard.jsx'
import History from '../pages/History.jsx'
import Settings from '../pages/Settings.jsx'
import Notifications from '../pages/Notifications.jsx'
import AssignmentsPage from '../pages/AssignmentsPage.jsx'


const DisplaySection = () => {
  return (
    <div className='bg-gray-100 w-full rounded-xl h-[97vh]'>

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<History />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>

    </div>
  )
}

export default DisplaySection
