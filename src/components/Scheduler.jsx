import React from 'react'

const Scheduler = () => {
    return (
        <div className='font-inter border w-min-fit p-5 rounded-2xl flex flex-col gap-5 w-[30%]'>

            <div className='flex justify-between'>
                <h1 className='text-[20px] font-semibold'>Scheduler</h1>
                <button className='border border-[1px] border-green-950 px-3 w-fit rounded-full bg-green-300 text-green-950 px-7'>
                    Active
                </button>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Last Sync:</h1>
                    <p className='text-[16px] text-gray-500'>2 minutes ago</p>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Next Sync:</h1>
                    <p className='text-[16px] text-gray-500'>28 minutes</p>
                </div>

            </div>

            <button className='p-2 border font-semibold rounded-xl cursor-pointer border border-gray-500'>Run Scheduler Now</button>

        </div>
    )
}

export default Scheduler
