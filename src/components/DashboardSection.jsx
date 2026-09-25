import React, { useState, useEffect } from 'react'
import DashboardMainSection from '../components/DashboardMainSection'
import DashboardSideSection from '../components/DashboardSideSection'
import axios from 'axios'
import { Loader } from '../components/Loader'

const DashboardSection = () => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  const [dashboardData, setDashboardData] = useState(null)

  async function fetchDashboardData() {

      const response = await axios.get(
        `${BACKEND_URL}`
      );


      setDashboardData(response.data);

    }

  useEffect(() => {

    fetchDashboardData();

  }, []);

  if (!dashboardData) {
    return <Loader />
  }

  return (

    <div className=''>
      <div className='flex h-[90vh]'>
        <div className='w-fit hx:w-[75%] gx:w-[70%] h-[89vh]'>
          <DashboardMainSection dashboardData={dashboardData} fetchDashboardData={fetchDashboardData} />
        </div>
        <div className='w-[500px] gx:w-[30%] h-[89vh] hx:flex hx:flex-col hidden'>
          <DashboardSideSection dashboardData={dashboardData} />
        </div>
        
      </div>
    </div>
  )
}

export default DashboardSection
