import React from 'react'

const AssignmentCard = () => {
  return (
    <div className='flex flex-col gap-4 font-inter border-[2px] border-gray-300 rounded-2xl min-w-[300px] bg-white p-3'>
      <p className='bg-gray-100 border border-gray-700 text-gray-700 w-fit rounded-xl px-3 text-[14px]'>DBMS Lab</p>
      <p className='text-[18px] font-semibold'>Assignment-3 Load Balancer</p>
      <div className='flex justify-between'>
        <p className='text-[14px] font-semibold'>Due Oct 24, 11:59</p>
        <p className='text-[12px] font-semibold text-amber-600'>4 hrs 30 mins left</p>
      </div>

      <div className=' flex gap-5'>
        <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer'>Review Solution</button>
        <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer'>Copy Drive Link</button>
      </div>
     
    </div>
  )
}

export default AssignmentCard
