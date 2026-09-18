import { CheckCircle2 } from 'lucide-react'
import React from 'react'


const NoAssignments = () => {
  return (
    <div className='w-[100%] h-[60vh] py-20 text-md fx:text-xl text-gray-500 flex justify-center items-center gap-2'>
      <CheckCircle2 />
      You're all caught up!
    </div>
  )
}

export default NoAssignments
