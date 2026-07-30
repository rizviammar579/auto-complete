import React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

const NotificationComponent = ({ Notification, allRead, setallRead }) => {

  const [show, setshow] = useState(false)

  return (
    <div className={`flex justify-between items-center p-3 border border-[1px] border-gray-300 rounded-[8px] hover:bg-gray-200 ${show ? 'bg-gray-200' : ''}`} onClick={() => { setshow(!show) }}>

      <div className='flex gap-2 items-center py-1 w-[90%]'>

        <div className='flex gap-1.5 flex-col'>
          <div className='flex gap-1.5 w-fit'>
            <button>{show ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronRight className="w-6 h-6 text-gray-500" />}</button>
            <h1 className='font-semibold'>{Notification.course} {Notification.assignment}</h1>
            <p>{Notification.message}</p>
          </div>
          <div className={`${show ? '' : 'hidden'}`}>
            <p className='w-[90%]'>{Notification.content}</p>
          </div>

        </div>
      </div>
      <div className='flex gap-5 items-center w-[10%]'>
        <div className='w-fit'>5 mins ago</div>
        <div>
          <div className={`relative top-1.5 w-3 h-3 bg-blue-500 text-blue-500 rounded-full ${allRead ? 'hidden' : ''}`}></div>
          <div className={`w-3 h-3 bg-blue-500 text-blue-500 rounded-full opacity-0 `}></div>
        </div>
      </div>

    </div>
  )
}

export default NotificationComponent
