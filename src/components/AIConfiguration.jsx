import React from 'react'

const AIConfiguration = () => {
    return (
        <div className='font-inter border w-min-fit p-5 rounded-2xl flex flex-col gap-5 w-[30%]'>


            <h1 className='text-[20px] font-semibold'>AI Configuration</h1>

            <div className='flex flex-col gap-2'>

                <div className='flex gap-2 items-center'>
                    <img src="../../brain.png" alt="" className='w-[20px] h-[20px]' />
                    <h1 className='text-[16px]'>Model: Gemini-2.5-flash</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <img src="../../speedometer.png" alt="" className='w-[20px] h-[20px]' />
                    <h1 className='text-[16px]'>AI Quota: Available</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <img src="../../pdf.png" alt="" className='w-[20px] h-[20px]' />
                    <h1 className='text-[16px]'>File Upload: Available</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <img src="../../scan.png" alt="" className='w-[20px] h-[20px]' />
                    <h1 className='text-[16px]'>Text Extraction Fallback: Enabled</h1>
                </div>



            </div>

        </div>
    )
}

export default AIConfiguration
