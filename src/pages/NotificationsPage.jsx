import React from 'react'
import Sidebar from '../components/Sidebar'
import DisplaySection from '../components/DisplaySection'
import NotificationsSection from '../components/NotificationsSection'


const NotificationsPage = () => {

return (
    <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
      <Sidebar />
      <DisplaySection component={<NotificationsSection/>} />
    </div>
  )

}


export default NotificationsPage
