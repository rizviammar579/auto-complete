import React from 'react'
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import {
  Grid2X2,
  BookOpen,
  History,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const Sidebar = () => {

  const sidebarItems = [
    { 
      id:1,
      name: "Dashboard",
      icon: Grid2X2,
      navlink: "dashboard"
    },
    { 
      id:2,
      name: "Assignments",
      icon: BookOpen,
      navlink: "assignments"
    },
    { 
      id:3,
      name: "History",
      icon: History,
      navlink: "history"
    },
    { 
      id:4,
      name: "Notifications",
      icon: Bell,
      navlink: "notifications"
    },
    { 
      id:5,
      name: "Settings",
      icon: Settings,
      navlink: "settings"
    },
  ];

  const [isCollapsed, setisCollapsed] = useState(window.innerWidth<720? true:false)


  return (
    <div className='bg-gray-950 w-fit pr-2 pl-1 ix:p-2 dx:p-3 h-full flex flex-col gap-3 justify-start fx:gap-2 justify-center'>

      <div className='flex justify-end mb-15 fx:flex hidden'>
        {isCollapsed ? <ChevronRight className="h-10 w-10 text-gray-200 hover:rounded-full hover:bg-gray-900 p-1 cursor-pointer" onClick={() => { setisCollapsed(!isCollapsed) }} /> : <ChevronLeft className="h-10 w-10 text-gray-200 hover:rounded-full hover:bg-gray-900 p-1 cursor-pointer" onClick={() => { setisCollapsed(!isCollapsed) }} />}
      </div>

      

      {sidebarItems.map((item) => {
        const Icon = item.icon;

        return (

          <NavLink to={`/${item.navlink}`} key={item.id} >

            {({ isActive }) => (
              <div className='flex gap-2.5 items-center mb-2.5 cursor-pointer hover:rounded-full hover:bg-gray-900 dx:px-3 py-3 dx:w-fit'>
                <Icon className={`h-5 w-5 dx:h-6 dx:w-6 ${isActive ? "text-blue-300" : "text-gray-300"} `} />
                <span className={`font-inter text-[15px] pr-10 font-semibold ${isCollapsed ? "hidden" : ""} ${isActive ? "text-blue-300" : "text-gray-300"}`}>{item.name}</span>
              </div>
            )

            }
          </NavLink>

        );
      })}


    </div>
  )
}

export default Sidebar
