import React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { timeAgo } from '../../backend/utils/timeAgo.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Trash2 } from 'lucide-react'

const NotificationComponent = ({ notification ,fetchNotificationData }) => {

  const border = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500',
  }

  const notificationIcons = {
    success: "../../public/success.png",
    error: "../../public/error.png",
    warning: "../../public/warning.png",
    info: "../../public/info.png"
  };

  const markAsRead = async(id)=>{

      try {
      
      await axios.patch(`http://localhost:3000/notifications/read/${id}`);

      fetchNotificationData();
      
    } catch (error) {

    }
  };

  const deleteOne = async(id)=>{

      try {

      await axios.delete(`http://localhost:3000/notifications/delete/${id}`);

      fetchNotificationData();
      
    } catch (error) {
    }
  };




  return (
    
  
     <div className={`group flex justify-between items-center p-3 border border-[1px] border-gray-300 rounded-[8px] hover:bg-gray-200 ${border[notification.type]} border-l-[5px]`} onClick={()=>{markAsRead(notification._id)}}>

      <div className='flex gap-2 items-center py-1 w-[90%]'>

        <div className='flex gap-1.5 flex-col w-full'>
          <div className='flex gap-1.5 w-full items-center'>

            <img src={notificationIcons[notification.type]} alt="" className='w-[20px] h-[20px]' />
            <h1 className={`font-bold`}>{notification.title}</h1>

          </div>
          <div>
            <p className='w-[90%] text-gray-700 relative left-6'>{notification.message}</p>
          </div>

        </div>
      </div>
      <div className='flex gap-3 items-center w-[15%]'>
        <div className='w-fit'>{timeAgo(notification.createdAt)}</div>
        <div>
          <div className={`${notification.read ? 'hidden' : 'block'} relative top-1.5 w-3 h-3 bg-blue-500 text-blue-500 rounded-full`}></div>
          <div className={`w-3 h-3 bg-blue-500 text-blue-500 rounded-full opacity-0 `}></div>
        </div>

      </div>

      <Trash2 className='opacity-0 group-hover:opacity-100 transition-opacity duration-400' onClick={()=>{deleteOne(notification._id)}}/>
    </div>
  

   
  )
}

export default NotificationComponent
