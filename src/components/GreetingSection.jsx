import React from 'react'
import Blackbtn from './Blackbtn.jsx'

const GreetingSection = () => {
    return (
        <div className='flex justify-between py-8'>
          <div className='flex flex-col gap-3 font-inter'>
            <h1 className='text-4xl font-semibold font-inter text-gray-950'>Welcome Back, Ammar.</h1>
            <p className='font-inter text-gray-700'>You have 3 assignments waiting for review.</p>
          </div>
          <div>
            <Blackbtn props={"Review Assignments"}/>
          </div>
        </div>
    )
}

export default GreetingSection
