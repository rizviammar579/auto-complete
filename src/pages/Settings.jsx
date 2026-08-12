import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import GoogleAccountSection from '../components/GoogleAccountSection'
import Integrations from '../components/Integrations'
import Scheduler from '../components/Scheduler'
import AIConfiguration from '../components/AIConfiguration'
import { Loader } from '../components/Loader'

const Settings = () => {

  const [settingsData, setSettingsData] = useState(null)

  async function fetchSettingsData() {

    const response = await axios.get(
      "http://localhost:3000/settings/"
    );


    setSettingsData(response.data);

    console.log(response.data)

  }

  useEffect(() => {

    fetchSettingsData();

  }, []);



  if (!settingsData) {
    return <Loader />
  }


  return (
    <div className='font-inter p-5 h-[90vh]'>
      <div className='text-[28px] font-bold'>Settings</div>
      <div className='text-[15px] font-semibold text-gray-500 mb-8'>Manage your personal productivity stack</div>

      <div className='flex flex-col gap-7'>
        <div className='flex gap-10'>
          <GoogleAccountSection data={settingsData}/>
          <Integrations data={settingsData}/>
        </div>
        <div className='flex gap-10'>
          <Scheduler data={settingsData} fetchSettingsData={fetchSettingsData}/>
          <AIConfiguration data={settingsData}/>
        </div>
      </div>

    </div>
  )
}

export default Settings
