import React from 'react'
import { timeAgo } from '../../backend/utils/timeAgo.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useAccessDenied } from '../context/AccessDeniedContext.jsx'

const NotificationComponent = ({ notification, fetchNotificationData }) => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { showAccessDenied } = useAccessDenied();

  const border = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500',
  }

  const notificationIcons = {
    success: "../../success.png",
    error: "../../error.png",
    warning: "../../warning.png",
    info: "../../info.png"
  };

  const markAsRead = async (id) => {

    try {

      await axios.patch(`${BACKEND_URL}/notifications/read/${id}`, {}, {
        withCredentials: true
      });

      fetchNotificationData();

    } catch (error) {
      if (error.response?.status === 403) {
        showAccessDenied();
      } else {
        toast.error("Failed to mark this notification as read");
      }
    }
  };

  const deleteOne = async (id) => {

    try {

      await axios.delete(`${BACKEND_URL}/notifications/delete/${id}`, {
        withCredentials: true
      });

      fetchNotificationData();

    } catch (error) {
      if (error.response?.status === 403) {
        showAccessDenied();
      } else {
        toast.error("Failed to delete this notification");
      }
    }
  };




  return (


    <div className={`group flex justify-between items-center p-3 border border-[1px] border-gray-300 rounded-[8px] hover:bg-gray-200 ${border[notification.type]} border-l-[5px]`} onClick={() => { markAsRead(notification._id) }}>

      <div className='flex bx:flex-row flex-col gap-10 bx:gap-2 bx:items-center py-1 w-[100%] justify-between'>

        <div className='flex gap-1.5 flex-col w-[100%] bx:w-fit'>
          <div className='flex gap-1.5 w-full items-center'>

            <img src={notificationIcons[notification.type]} alt="" className='w-[20px] h-[20px]' />
            <h1 className={`font-bold`}>{notification.title}</h1>

          </div>

          <p className='w-[90%] text-gray-700 relative left-6'>{notification.message}</p>


        </div>

        <div className='flex flex-row gap-1.5 hx:gap-3 items-center w-[100%] bx:w-[200px] ml-5 bx:ml-0 justify-start bx:justify-end'>
          <div className='w-fit'>{timeAgo(notification.createdAt)}</div>

          <div>
            <div className={`${notification.read ? 'hidden' : 'block'} relative top-1.5 w-3 h-3 bg-blue-500 text-blue-500 rounded-full`}></div>
            <div className={`w-3 h-3 bg-blue-500 text-blue-500 rounded-full opacity-0 `}></div>
          </div>

          <Trash2 className={`${window.innerWidth < 720 ? 'opacity-100' : 'opacity-100'} group-hover:opacity-100 transition-opacity duration-400 ml-2 hx:ml-5`} onClick={() => { deleteOne(notification._id) }} />

        </div>

      </div>




    </div>



  )
}

export default NotificationComponent
