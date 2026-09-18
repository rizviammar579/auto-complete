import React from 'react'
import LandingPageComponent from '../components/LandingPageComponent'


const LandingPage = () => {

  return (

    <div className='bg-gray-950 font-inter min-h-[100vh] ax:h-[100vh] flex justify-center items-center p-3 dx:py-10 dx:px-20 ax:px-0 ax:py-0'>

      <div className='flex ax:flex-row flex-col bg-gray-50 rounded-xl h-fit ax:h-[82.5vh]'>

        <div className='w-[80%] bx:w-[60%] ax:w-[45vw] bg-gray-200 rounded-l-xl flex flex-col items-center justify-center ax:flex hidden'>

          {window.innerWidth > 1300 ? <LandingPageComponent /> : ''}

        </div>

        <div className='w-[90vw] ax:w-[50vw] flex flex-col items-center gap-16 ex:gap-24 ax:gap-30'>

          <div className='w-[100%] ax:w-[45vw]'>
            <div className='p-3 cx:p-5 font-extrabold text-xl dx:text-2xl flex justify-between'>
              <span>Auto-Complete</span>
              <span>
                <a href="https://github.com/rizviammar579/auto-complete" target="_blank" rel="noopener noreferrer">
                  <img src="../github.png" alt="" className='w-[25px] dx:w-[32px]' />
                </a>
              </span>
            </div>

            <div className='h-[1px] bg-gray-500'></div>
          </div>



          <div className='w-[90%] ex:w-[80%] dx:w-[70%] cx:w-[60%] bg-gray-200 rounded-l-xl flex flex-col items-center justify-center ax:hidden '>

            {window.innerWidth < 1300 ? <LandingPageComponent /> : ''}

          </div>

          <div className='flex justify-center items-center w-[90%] cx:w-[80%] ax:w-[45vw] gap-5'>
            <div className='flex flex-col gap-3'>
              <div className='text-center dx:text-start font-bold text-xl dx:text-2xl cx:text-3xl items-center justify-center '>Built for my lazy self.</div>
              <div className='text-center dx:text-start text-gray-600 font-light text-[12px] dx:text-[13px] fx:text-[16px] '>Automatically collect assignments from Google Classroom, generate AI-powered solution drafts, and keep everything organized — so I don't have to worry about assignments anymore.</div>
            </div>
            <div className='dx:block hidden'>
              <img src="../landing page.png" alt="" className='w-[400px] ax:w-[600px] rounded-2xl' />
            </div>
          </div>




          <div className='flex flex-col gap-5 items-center justify-center'>
            <button className='text-[14px] ex:text-[16px] fx:text-[18px] bx:text-[18px] ax:text-[20px] flex gap-3 justify-center items-center cursor-pointer border border-gray-400 px-3 py-2 ex:px-4 ex:py-3 rounded-xl hover:rounded-full bg-white transition-all' onClick={() => { window.location.href = "http://localhost:3000/auth/google" }}>
              <img src="../google.png" alt="" className='w-[28px] ex:w-[40px]' /> Sign in with Google</button>
            <p className='font-light text-gray-500 mb-10 text-[12px] ex:text-[13px] fx:text-[14px]'>Get started with your Google account</p>
          </div>


        </div>


      </div>
    </div>
  )
}

export default LandingPage
