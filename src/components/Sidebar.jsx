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
      name: "Dashboard",
      icon: Grid2X2,
      navlink: ""
    },
    {
      name: "Assignments",
      icon: BookOpen,
      navlink: "assignments"
    },
    {
      name: "History",
      icon: History,
      navlink: "history"
    },
    {
      name: "Notifications",
      icon: Bell,
      navlink: "notifications"
    },
    {
      name: "Settings",
      icon: Settings,
      navlink: "settings"
    },
  ];

  const [isCollapsed, setisCollapsed] = useState(false)


  return (
    <div className='bg-gray-950 w-fit p-3 h-full'>

      <div className='flex justify-end mb-15'>
        {isCollapsed ? <ChevronRight className="h-10 w-10 text-gray-200 hover:rounded-full hover:bg-gray-900 p-1 cursor-pointer" onClick={() => { setisCollapsed(!isCollapsed) }} /> : <ChevronLeft className="h-10 w-10 text-gray-200 hover:rounded-full hover:bg-gray-900 p-1 cursor-pointer" onClick={() => { setisCollapsed(!isCollapsed) }} />}
      </div>

      {sidebarItems.map((item) => {
        const Icon = item.icon;

        return (

          <NavLink to={`/${item.navlink}`}>

            {({ isActive }) => (
              <div key={item.name} className='flex gap-2.5 items-center mb-2.5 cursor-pointer hover:rounded-full hover:bg-gray-900 px-3 py-3 w-fit'>
                <Icon className={`h-6 w-6 ${isActive ? "text-blue-300" : "text-gray-300"} `} />
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
