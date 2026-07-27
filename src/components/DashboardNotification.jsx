import React from 'react'

const DashboardNotification = () => {
  return (
    <div className='font-inter p-5 border border-gray-300 border-[2px] rounded-2xl bg-white'>
      <h1 className='text-[25px] font-semibold mb-4'>Notifications</h1>

      <ul className='flex flex-col gap-2 justify-center'>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../notification.png" alt="" className='w-[20px] h-[20px]' />
                <div>{`Solution Ready (DBMS Lab)`}</div>
            </div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../warning-red.png" alt="" className='w-[20px] h-[20px]' />
                <div>{`AI Quota Exceeded (DSA)`}</div>
            </div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../warning-yellow.png" alt="" className='w-[20px] h-[20px]' />
                <div>Drive Uplaod Failed</div>
            </div>
        </li>

        <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer w-fit mt-5'>{`View all Notifications ->`}</button>
       
        
      </ul>
    </div>
  )
}

export default DashboardNotification
