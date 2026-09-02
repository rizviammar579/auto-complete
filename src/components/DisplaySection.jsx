import React from 'react'
import Navbar from './Navbar.jsx'


const DisplaySection = ({component}) => {
  return (
    <div className='bg-gray-100 w-full rounded-xl h-[97vh]'>

      <Navbar />
      {component}

    </div>
  )
}

export default DisplaySection
