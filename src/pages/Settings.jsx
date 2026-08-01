import React from 'react'
import GoogleAccountSection from '../components/GoogleAccountSection'
import Integrations from '../components/Integrations'
import Scheduler from '../components/Scheduler'
import AIConfiguration from '../components/AIConfiguration'

const Settings = () => {
  return (
    <div className='font-inter p-5'>
      <div className='text-[28px] font-bold'>Settings</div>
      <div className='text-[15px] font-semibold text-gray-500 mb-8'>Manage your personal productivity stack</div>

      <div className='flex flex-col gap-7'>
        <div className='flex gap-10'>
          <GoogleAccountSection />
          <Integrations />
        </div>
        <div className='flex gap-10'>
          <Scheduler />
          <AIConfiguration />
        </div>
      </div>

    </div>
  )
}

export default Settings
