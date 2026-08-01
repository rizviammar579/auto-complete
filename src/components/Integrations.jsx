import React from 'react'

const Integrations = () => {
  return (
    <div className='font-inter border w-fit p-5 rounded-2xl flex flex-col gap-5'>

      <div className='text-[20px] font-semibold'>Integrations</div>

      <div className='flex gap-5'>

        <div className='font-inter border w-full p-5 rounded-2xl flex flex-col gap-5 min-w-[220px]'>
          <div className='flex justify-between items-center'>
            <img src="../../googleclassroom.png" alt="" className='w-[40px] h-[40px]' />
            <div className='w-3 h-3 bg-green-500 text-green-500 rounded-full'></div>
          </div>
          <h1 className='text-[18px]'>Google Classroom</h1>
        </div>


        <div className='font-inter border w-full p-5 rounded-2xl flex flex-col gap-5 min-w-[220px]'>
          <div className='flex justify-between items-center'>
            <img src="../../googledrive.png" alt="" className='w-[40px] h-[40px]' />
            <div className='w-3 h-3 bg-green-500 text-green-500 rounded-full'></div>
          </div>
          <h1 className='text-[18px]'>Google Drive</h1>
        </div>


        <div className='font-inter border w-full p-5 rounded-2xl flex flex-col gap-5 min-w-[220px]'>
          <div className='flex justify-between items-center'>
            <img src="../../geminiai.png" alt="" className='w-[40px] h-[40px]' />
            <div className='w-3 h-3 bg-green-500 text-green-500 rounded-full'></div>
          </div>
          <h1 className='text-[18px]'>Gemini AI</h1>
        </div>



      </div>

    </div>
  )
}

export default Integrations
