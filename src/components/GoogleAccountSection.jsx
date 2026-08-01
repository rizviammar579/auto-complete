import React from 'react'

const GoogleAccountSection = () => {
  return (
    <div className='font-inter border w-fit p-5 rounded-2xl flex flex-col gap-5'>

      <div className='flex gap-30'>
        <h1 className='text-[20px] font-semibold'>Google Account</h1>
        <button className='border border-[1px] border-green-950 px-3 w-fit rounded-full bg-green-300 text-green-950'>
          Connected
        </button>
      </div>
      <div className='flex gap-8'>
        <div>
          <img src="../../google.png" alt="" className='w-[50px] h-[50px]' />
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-[15px] text-gray-500'>Username</h1>
          <p className='text-[18px] font-semibold'>Ammar Rizvi</p>
          <h1 className='text-[15px] text-gray-500'>Email Connected</h1>
          <p className='text-[18px] font-semibold'>2501030021@mail.jiit.ac.in</p>

        </div>
      </div>

    </div>
  )
}

export default GoogleAccountSection
