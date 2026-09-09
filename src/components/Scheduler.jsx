import React from 'react'
import { timeAgo } from '../../backend/utils/timeAgo.js'
import axios from 'axios'

const Scheduler = ({data , fetchSettingsData}) => {

   async function runAutomationManually() {

    const response = await axios.post(
      "http://localhost:3000/settings/run-automation",{},{
        withCredentials: true
      }
    );

    fetchSettingsData()
 
   }

    return (
        <div className='font-inter border w-min-fit p-5 rounded-2xl flex flex-col gap-5 w-[33%]'>

            <div className='flex justify-between'>
                <h1 className='text-[20px] font-semibold'>Automation</h1>
                <button className='border border-[1px] border-green-950 px-3 w-fit rounded-full bg-green-300 text-green-950 px-7'>
                    {data.automationRunning ? 'Running' : 'Awaiting Next Sync'}
                </button>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Last Sync:</h1>
                    {data.lastSync === null ? '-' : <p className='text-[16px] text-gray-500'>{timeAgo(data.lastSync)}</p>}
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Interval</h1>
                    <p className='text-[16px] text-gray-500'>{data.interval} mins</p>
                </div>

            </div>

            <button disabled={data.automationRunning} className='p-2 border font-semibold rounded-xl cursor-pointer border border-gray-500  hover:bg-white transition-colors' onClick={()=>{
                runAutomationManually()
                fetchSettingsData()
                }}>{data.automationRunning ? 'Automation Running...' : 'Run Automation Now'}</button>

        </div>
    )
}

export default Scheduler
