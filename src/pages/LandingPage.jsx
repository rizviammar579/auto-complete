import React from 'react'
import { useRef, useEffect } from 'react';
import demoVideo from '../assets/demo.mp4'


const LandingPage = () => {

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className='p-16 bg-gray-950 font-inter'>

      <div className='flex bg-gray-50 rounded-xl h-[82.5vh]'>

        <div className=' w-[45vw] bg-gray-200 rounded-l-xl flex flex-col items-center justify-center'>

          <div className='flex'>
            <img src="../geminiai.png" alt="" className='w-[50px] absolute left-30 bottom-24' />
            <img src="../mongodb.png" alt="" className='w-[50px] absolute left-1/3 bottom-22' />
            <img src="../googledrive.png" alt="" className='w-[50px] absolute left-1/5 bottom-35' />
            <img src="../express-js.png" alt="" className='w-[50px] absolute left-1/6 top-36' />
            <img src="../javascript.png" alt="" className='w-[50px] absolute left-30 top-20' />
            <img src="../node-js.png" alt="" className='w-[50px] absolute left-2/7 top-20' />
            <img src="../react.png" alt="" className='w-[50px] absolute left-5/12 top-30' />
            <img src="../googleclassroom.png" alt="" className='w-[50px] absolute left-3/7 bottom-35' />
          </div>

          <div className='w-[80%] relative bottom-'>

            <video
              ref={videoRef}
              src={demoVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-xl border border-gray-200 shadow-sm"
            />

          </div>

        </div>

        <div className='w-[50vw] flex flex-col items-center gap-30'>

          <div className=''>
            <div className='p-5 font-extrabold text-2xl flex justify-between w-[45vw]'>
              <span>Auto-Complete</span>
              <span>
                <a href="https://github.com/rizviammar579/auto-complete" target="_blank" rel="noopener noreferrer">
                  <img src="../github.png" alt="" className='w-[32px]' />
                </a>
              </span>
            </div>

            <div className='h-[1px] bg-gray-500 w-[45vw]'></div>
          </div>



          <div className='flex justify-center items-center w-[45vw] gap-5'>
            <div className='flex flex-col gap-3'>
              <div className='font-bold text-3xl items-center justify-center w-[20vw]'>Built for my lazy self.</div>
              <div className='text-gray-600 font-light'>Automatically collect assignments from Google Classroom, generate AI-powered solution drafts, and keep everything organized — so I don't have to worry about assignments anymore.</div>
            </div>
            <div>
              <img src="../landing page.png" alt="" className='w-[600px] rounded-2xl' />
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <button className='flex gap-3 justify-center items-center cursor-pointer border border-gray-400 p-3 rounded-xl hover:bg-white '>
              <img src="../google.png" alt="" className='w-[40px]' /> Sign in with Google</button>
            <p className='font-light text-gray-500'>Get started with your Google account</p>
          </div>

        </div>


      </div>
    </div>
  )
}

export default LandingPage
