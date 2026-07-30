import React from 'react'
import { useState } from 'react'
import NotificationComponent from '../components/NotificationComponent.jsx'

const Notifications = () => {

  const [allRead, setallRead] = useState(false)
  const [filter, setfilter] = useState('all')


  const Notifications = [
    { id: 1, course: 'DBMS', assignment: 'Assignment-3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit numquam nulla. Maxime non magnam quia blanditiis explicabo nostrum dolorum?', message: 'solution is ready for review.' },
    { id: 2, course: 'DBMS', assignment: 'Assignment-3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit numquam nulla. Maxime non magnam quia blanditiis explicabo nostrum dolorum?', message: 'solution is ready for review.' },
    { id: 3, course: 'DBMS', assignment: 'Assignment-3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit numquam nulla. Maxime non magnam quia blanditiis explicabo nostrum dolorum?', message: 'solution is ready for review.' },
    { id: 4, course: 'DBMS', assignment: 'Assignment-3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit numquam nulla. Maxime non magnam quia blanditiis explicabo nostrum dolorum?', message: 'solution is ready for review.' },
    { id: 5, course: 'DBMS', assignment: 'Assignment-3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit numquam nulla. Maxime non magnam quia blanditiis explicabo nostrum dolorum?', message: 'solution is ready for review.' }
  ]


  return (
    <div className='p-5 w-full flex flex-col gap-6 font-inter'>

      <div className='flex justify-between items-center '>
        <h1 className='text-[28px] font-bold'>Notifications Centre</h1>
        <h2 className='text-[16px] font-semibold text-gray-500'>Updated 10 mins ago</h2>
      </div>

      <div className='flex justify-between items-center w-full'>

        <ul className='border border-gray-300 w-fit rounded-[8px] border-[2px]'>
          <button className={`text-[16px] font-semibold text-gray-950 w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter === 'all' ? 'bg-gray-300' : ''}`} onClick={() => { setfilter('all') }}>All</button>
          <button className={`text-[16px] font-semibold text-gray-950 w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter === 'unread' ? 'bg-gray-300' : ''}`} onClick={() => { setfilter('unread') }}>Unread</button>
          <button className={`text-[16px] font-semibold text-gray-950 w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter === 'assignments' ? 'bg-gray-300' : ''}`} onClick={() => { setfilter('assignments') }}>Assignments</button>
          <button className={`text-[16px] font-semibold text-gray-950 w-fit rounded-[8px] py-1 px-3 cursor-pointer ${filter === 'forms' ? 'bg-gray-300' : ''}`} onClick={() => { setfilter('forms') }}>Forms</button>
        </ul>

        <button className='text-[16px] font-semibold text-gray-950 border border-gray-300 w-fit rounded-[8px] border-[2px] py-1 px-3 cursor-pointer hover:bg-gray-300' onClick={() => setallRead(true)}>Mark all as read</button>

      </div>

      <div className='border-gray-300 w-fit w-full flex flex-col gap-5'>

        {Notifications.map((Notification) => {

          return <NotificationComponent key={Notification.id} Notification={Notification} allRead={allRead} setallRead={setallRead} />

        })}

      </div>


    </div>
  )
}

export default Notifications
