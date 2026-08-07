import React from 'react'
import { useNavigate } from "react-router-dom";

const DashboardNotification = ({ dashboardData }) => {

    const notifications = dashboardData?.notifications

    const notificationIcons = {
        success: "../../public/success.png",
        error: "../../public/error.png",
        warning: "../../public/warning.png",
        info: "../../public/info.png"
    };


    const navigate = useNavigate();

    return (
        <div className='font-inter p-5 border border-gray-300 border-[2px] rounded-2xl bg-white'>
            <h1 className='text-[25px] font-semibold mb-4'>Notifications</h1>

            <ul className='flex flex-col gap-3 justify-center'>

                {notifications.map(notification => {
                    return <>
                        <li className='flex justify-between'>
                            <div className='flex gap-1 items-center'>
                                <img src={notificationIcons[notification.type]} alt="" className='w-[20px] h-[20px]' />
                                <div >{notification.title}</div>
                            </div>
                        </li>
                    </>
                })}


                <button className='bg-gray-950 text-white text-[13px] px-3 py-1.5 rounded-xl cursor-pointer w-fit mt-5' onClick={() => { navigate('/notifications') }}>{`View all Notifications ->`}</button>


            </ul>
        </div>
    )
}

export default DashboardNotification
