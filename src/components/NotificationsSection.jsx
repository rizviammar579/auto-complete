import React from 'react'
import { useState, useEffect } from 'react'
import NotificationComponent from '../components/NotificationComponent.jsx'
import { Loader } from '../components/Loader.jsx'
import axios from 'axios'
import { Bell } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAccessDenied } from '../context/AccessDeniedContext.jsx'

const NotificationsSection = () => {

  const { showAccessDenied } = useAccessDenied();

  const [notifications, setNotifications] = useState(null)
  const [currentFilter, setCurrentFilter] = useState('All')

  const filters = [
    { text: 'All' },
    { text: 'Unread' },
    { text: 'Success' },
    { text: 'Info' },
    { text: 'Warning' },
    { text: 'Error' },
  ]

  async function fetchNotificationData() {

    const response = await axios.get(
      "http://localhost:3000/notifications/"
    );


    setNotifications(response.data.notifications);

  }

  useEffect(() => {

    fetchNotificationData();


  }, []);


  const markAllAsRead = async () => {

    try {

      await axios.patch("http://localhost:3000/notifications/read-all", {}, {
        withCredentials: true
      });

      fetchNotificationData();
      toast.success("All notifications marked as read")

    } catch (error) {
      if (error.response?.status === 403) {
        showAccessDenied();
      } else {
        toast.error("Failed to mark all notifications as read");
      }
    }
  };

  const deleteAll = async () => {

    try {

      await axios.delete("http://localhost:3000/notifications/delete-all", {
        withCredentials: true
      });

      fetchNotificationData();
      toast.error("All notifications deleted")

    } catch (error) {
       if (error.response?.status === 403) {
        showAccessDenied();
      } else {
        toast.error("Failed to delete all notifications");
      }
    }
  };


  const filteredNotifications = notifications?.filter(notification => {
    if (currentFilter === 'All') return true;
    if (currentFilter === 'Unread') return !notification.read;
    return notification.type === currentFilter.toLowerCase()
  })


  if (!notifications) {
    return <Loader />
  }



  return (
    <div className='p-5 w-full flex flex-col gap-6 font-inter h-[90vh] overflow-auto '>

      <div className='flex gap-3 items-center '>
        <Bell size={30} />
        <h1 className='text-[28px] font-bold'>Notifications Centre</h1>

      </div>

      <div className='flex justify-between items-center w-full mb-10'>

        <div className='border border-gray-300 w-fit rounded-[8px] border-[2px]'>

          {filters.map(filter => {

            return <button key={filter.text} className={`text-[15px]  w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter.text === currentFilter ? 'bg-gray-950 text-gray-100 ' : 'text-gray-950 bg-gray-100 font-semibold'}`} onClick={() => setCurrentFilter(filter.text)}>{filter.text}</button>

          })}


        </div>

        <div className='flex gap-5'>
          <button className='text-[15px]  text-gray-100 bg-red-600 w-fit rounded-[8px] border-[2px] py-1.5 px-4 cursor-pointer' onClick={() => { deleteAll() }} >Delete All</button>

          <button className='text-[15px]  text-gray-100 bg-black w-fit rounded-[8px] border-[2px] py-1.5 px-4 cursor-pointer' onClick={() => { markAllAsRead() }} >Mark all as read</button>
        </div>

      </div>

      <div className='border-gray-300 w-fit w-full flex flex-col gap-5'>

        {filteredNotifications.map((filteredNotification) => {

          return <NotificationComponent key={filteredNotification._id} notification={filteredNotification} fetchNotificationData={fetchNotificationData} />

        })}

      </div>

      <p className='text-gray-500 w-full gap-2 items-center flex justify-center my-5'><Bell size={20} color='gray' /> You're all caught up!</p>


    </div>
  )

}

export default NotificationsSection
