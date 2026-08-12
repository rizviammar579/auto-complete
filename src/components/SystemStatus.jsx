import { CloudCog } from 'lucide-react'
import React from 'react'
import { timeAgo } from '../../backend/utils/timeAgo'

const SystemStatus = ({dashboardData}) => {
 
    const systemStatus = dashboardData?.systemStatus

  return (
    <div className='font-inter p-5 border border-gray-300 border-[2px] rounded-2xl bg-white'>
      <h1 className='text-[25px] font-semibold mb-4'>System Status</h1>

      <ul className='flex flex-col gap-3 justify-center'>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../googledrive.png" alt="" className='w-[23px] h-[23px]' />
                <div>Google Drive</div>
            </div>
            <div className={`text-[14px] font-bold ${systemStatus.googleDriveConnected?'text-green-500':'text-red-500'}`}>{systemStatus.googleDriveConnected?'Connected':'Disconnected'}</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../googleclassroom.png" alt="" className='w-[24px] h-[24px]' />
                <div>Google Classroom</div>
            </div>
           <div className={`text-[14px] font-bold ${systemStatus.googleClassroomConnected?'text-green-500':'text-red-500'}`}>{systemStatus.googleClassroomConnected?'Connected':'Disconnected'}</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../mongodb.png" alt="" className='w-[24px] h-[24px]' />
                <div>MongoDB</div>
            </div>
            <div className={`text-[14px] font-bold ${systemStatus.mongoDBConnected?'text-green-500':'text-red-500'}`}>{systemStatus.mongoDBConnected?'Connected':'Disconnected'}</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <img src="../../geminiai.png" alt="" className='w-[24px] h-[24px]' />
                <div>Gemini AI</div>
            </div>
            <div className={`text-[14px] font-bold ${systemStatus.aiAvailable?'text-green-500':'text-red-500'}`}>{systemStatus.aiAvailable?'Available':'Unavailable'}</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-2 items-center'>
             <img src="../../automation.png" alt="" className='w-[24px] h-[24px]' />
                <div>Automation</div>
            </div>
            <div className='text-[14px] font-bold text-green-500'>{systemStatus.automationRunning?'Running...':'Awaiting Next Sync'}</div>
        </li>
        <li className='flex justify-between'>
            <div className='flex gap-2 items-center'>
             <img src="../../sync.png" alt="" className='w-[24px] h-[24px]' />
                <div>Last Sync</div>
            </div>
            <div className='text-green-500 text-[14px] font-bold'>{systemStatus.lastSync === null ? '': timeAgo(systemStatus.lastSync)}</div>
        </li>
        
      </ul>
    </div>
  )
}

export default SystemStatus
