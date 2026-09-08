import React from 'react'
import { useNavigate } from 'react-router-dom'

const Custom404 = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center items-center w-[100vw] h-[100vh] font-inter gap-5'>

            <div className='font-bold text-9xl'>404</div>
            <div className='font-light text-4xl'>Page Not Found</div>
            <p>We couldn't find the page you were looking for. It may have been moved, renamed or doesn't exist.</p>
            <button className='bg-blue-500 text-white cursor-pointer rounded-4xl p-5 mt-7' onClick={() => { navigate('/dashboard') }}>Return to Dashboard</button>

        </div>
    )
}

export default Custom404
