import React from 'react'
import demoVideo from '../assets/demo.mp4';
import { useRef, useEffect } from 'react';

const LandingPageComponent = () => {

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);


  return (
    <div>
      <div className='bg-gray-200 rounded-l-xl flex flex-col items-center justify-center'>


        {window.innerWidth > 1300 ? <div className='flex'>
          <img src="../geminiai.png" alt="" className='w-[50px] absolute left-30 bottom-24' />
          <img src="../mongodb.png" alt="" className='w-[50px] absolute left-1/3 bottom-22' />
          <img src="../googledrive.png" alt="" className='w-[50px] absolute left-1/5 bottom-35' />
          <img src="../express-js.png" alt="" className='w-[50px] absolute left-1/6 top-36' />
          <img src="../javascript.png" alt="" className='w-[50px] absolute left-30 top-20' />
          <img src="../node-js.png" alt="" className='w-[50px] absolute left-2/7 top-20' />
          <img src="../react.png" alt="" className='w-[50px] absolute left-5/12 top-30' />
          <img src="../googleclassroom.png" alt="" className='w-[50px] absolute left-3/7 bottom-35' />
        </div> : ''}
       


        <div className='w-[100%] ax:w-[80%] gx:w-[70%] relative bottom'>

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
    </div>
  )
}

export default LandingPageComponent
