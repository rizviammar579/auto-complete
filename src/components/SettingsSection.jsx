import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import GoogleAccountSection from '../components/GoogleAccountSection'
import Integrations from '../components/Integrations'
import Scheduler from '../components/Scheduler'
import AIConfiguration from '../components/AIConfiguration'
import { Loader } from '../components/Loader'

const SettingsSection = () => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
 
  const [settingsData, setSettingsData] = useState(null)

  async function fetchSettingsData() {

    const response = await axios.get(
      `${BACKEND_URL}/settings/`
    );


    setSettingsData(response.data);


  }

  useEffect(() => {

    fetchSettingsData();

  }, []);



  if (!settingsData) {
    return <Loader />
  }


  return (
    <div className='font-inter p-5 h-[90vh] overflow-auto'>
      <div className='text-[28px] font-bold'>Settings</div>
      <div className='text-[15px] font-semibold text-gray-500 mb-8'>Manage your personal productivity stack</div>

      <div className='flex flex-col gap-7'>
        <div className='flex gap-10 ax:flex-row flex-col'>
          <GoogleAccountSection data={settingsData}/>
          <Integrations data={settingsData}/>
        </div>
        <div className='flex gap-10 kx:flex-row flex-col mb-16 ax:mb-0'>
          <Scheduler data={settingsData} fetchSettingsData={fetchSettingsData}/>
          <AIConfiguration data={settingsData}/>
        </div>
      </div>

    </div>
  )
}

export default SettingsSection
