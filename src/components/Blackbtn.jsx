import React from 'react'

const Blackbtn = ({props}) => {
  return (
    <div>
      <button className='text-white bg-gray-950 p-2 rounded-xl px-10 text-[18px] cursor-pointer'>
        {props}
      </button>
    </div>
  )
}

export default Blackbtn
