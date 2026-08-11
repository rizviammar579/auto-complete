import { CheckCircle2 } from 'lucide-react'
import React from 'react'


const NoAssignments = () => {
  return (
    <div className='w-[500px] py-20 relative top-0 right-[100%] text-xl text-gray-500 flex justify-center items-center gap-2'>
      <CheckCircle2/>
      You're all caught up! 
    </div>
  )
}

export default NoAssignments
