import React, { useState, useEffect } from 'react'
import DashboardMainSection from '../components/DashboardMainSection'
import DashboardSideSection from '../components/DashboardSideSection'
import axios from 'axios'
import { Loader } from '../components/Loader'


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {

    async function fetchDashboardData() {

      const response = await axios.get(
        "http://localhost:3000/"
      );

      setDashboardData(response.data);

    }

    fetchDashboardData();


  }, []);

  if (!dashboardData) {
    return <Loader />
  }

  return (

    <div className=''>
      <div className='flex h-[90vh]'>
        <DashboardMainSection dashboardData={dashboardData} />
        <DashboardSideSection dashboardData={dashboardData} />
      </div>
    </div>
  )
}

export default Dashboard
