import React from 'react'

const SystemStatus = () => {
  return (
    <div className='font-inter p-5 border border-gray-300 border-[2px] rounded-2xl bg-white'>
      <h1 className='text-[25px] font-semibold mb-4'>System Status</h1>

      <ul className='flex flex-col gap-2 justify-center'>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../googledrive.png" alt="" className='w-[23px] h-[23px]' />
                <div>Google Drive</div>
            </div>
            <div className='text-green-500 text-[14px] font-bold'>Connected</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../googleclassroom.png" alt="" className='w-[24px] h-[24px]' />
                <div>Google Classroom</div>
            </div>
            <div className='text-green-500 text-[14px] font-bold'>Connected</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../geminiai.png" alt="" className='w-[24px] h-[24px]' />
                <div>Gemini AI</div>
            </div>
            <div className='text-green-500 text-[14px] font-bold'>Available</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-2 items-center'>
             <div className='w-3 h-3 bg-green-500 text-green-500 rounded-full'></div>
                <div>Scheduler</div>
            </div>
            <div className='text-green-500 text-[14px] font-bold'>Running</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-2 items-center'>
             <img src="../../sync.png" alt="" className='w-[24px] h-[24px]' />
                <div>Last Sync</div>
            </div>
            <div className='text-green-500 text-[14px] font-bold'>Running</div>
        </li>
        
      </ul>
    </div>
  )
}

export default SystemStatus
