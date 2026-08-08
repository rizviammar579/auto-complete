import React from 'react'
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

const GreetingSection = ({dashboardData}) => {

  const navigate = useNavigate();

  return (
    <div className='flex justify-between py-8'>
      <div className='flex flex-col gap-3 font-inter'>
        <h1 className='text-4xl font-semibold font-inter text-gray-950'>Welcome Back, Ammar.</h1>
        <p className='font-inter text-gray-700'>{`You have ${dashboardData.notSubmittedAssignments.length} unsubmitted assignments waiting for review.`}</p>
      </div>
      <div>
        <button className='text-white bg-gray-950 p-2 rounded-xl px-10 text-[18px] cursor-pointer flex gap-1.5 items-center' onClick={()=>{navigate('/assignments')}}>
          Review Assignments <ArrowRight className='h-5 w-5'/>
        </button>
      </div>
    </div>
  )
}

export default GreetingSection
