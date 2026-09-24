import React from 'react'
import { timeAgo } from '../../backend/utils/timeAgo.js'
import axios from 'axios'
import { useAccessDenied } from '../context/AccessDeniedContext.jsx'

const Scheduler = ({ data, fetchSettingsData }) => {

    const { showAccessDenied } = useAccessDenied();

    async function runAutomationManually() {

        try {

            const response = await axios.post(
                "https://auto-complete-ywqk.onrender.com/settings/run-automation", {}, {
                withCredentials: true
            }
            );

            fetchSettingsData()

        } catch (error) {
            if (error.response?.status === 403) {
                showAccessDenied();
            } else {
                console.log(error)
                toast.error('Failed to run automation')
            }
        }


    }

    return (
        <div className='font-inter border w-min-fit p-5 rounded-2xl flex flex-col gap-5 w-full lx:max-w-[400px]'>

            <div className='flex justify-between gap-3 lx:gap-10 lx:flex-row flex-col'>
                <h1 className='text-[20px] font-semibold'>Automation</h1>
                <button className='border border-[1px] border-green-950 px-3 w-fit rounded-full bg-green-300 text-green-950 px-7 mb-5'>
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

            <button disabled={data.automationRunning} className='p-2 border font-semibold rounded-xl cursor-pointer border border-gray-500  hover:bg-white transition-colors' onClick={() => {
                runAutomationManually()
                fetchSettingsData()
            }}>{data.automationRunning ? 'Automation Running...' : 'Run Automation Now'}</button>

        </div>
    )
}

export default Scheduler
