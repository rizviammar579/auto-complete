import React from 'react'

const GoogleAccountSection = ({data}) => {
  return (
    <div className='font-inter border w-fit p-5 rounded-2xl flex flex-col gap-5'>

      <div className='flex gap-5 dx:gap-30 dx:flex-row flex-col'>
        <div className='flex gap-3 justify-start items-center'>
          {window.innerWidth<500? <div>
          <img src="../../google.png" alt="" className='w-[50px] h-[50px]' />
        </div>:""}
        <h1 className='text-[20px] font-semibold'>Google Account</h1>
        </div>
        {data.googleClassroomConnected ? <button className='mb-5 border border-[1px] border-green-950 px-3 w-fit rounded-full bg-green-300 text-green-950'>
          Connected
        </button> : ''}
      </div>

      <div className='flex gap-8 lx:flex-row flex-col'>

       {window.innerWidth>500? <div>
          <img src="../../google.png" alt="" className='w-[50px] h-[50px]' />
        </div> : ""}

        <div className='flex flex-col gap-2'>
          <h1 className='text-[13px] jx:text-[15px] text-gray-500'>Username</h1>
          <p className='text-[16px] jx:text-[18px] font-semibold'>{data.username}</p>
          <h1 className='text-[13px] jx:text-[15px] text-gray-500'>Email Connected</h1>
          <p className='text-[16px] jx:text-[18px] font-semibold'>{data.gmail}</p>

        </div>
      </div>

    </div>
  )
}

export default GoogleAccountSection
