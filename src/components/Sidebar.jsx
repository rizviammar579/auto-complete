import React from 'react'
import {
  Grid,
  BookOpen,
  History,
  Bell,
  Settings,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

const Sidebar = () => {

const sidebarItems = [
  {
    name: "Dashboard",
    icon: Grid,
  },
  {
    name: "Assignments",
    icon: BookOpen,
  },
  {
    name: "History",
    icon: History,
  },
  {
    name: "Notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];


  return (
    <div className='bg-gray-950 w-fit p-3'>

    <div className='flex justify-end mb-24'>
       <ArrowLeft className="h-7 w-7 text-gray-400"/>
    </div>

   {sidebarItems.map((item) => {
  const Icon = item.icon;

  return (
    <div key={item.name} className='flex gap-3 items-center mb-8'>
      <Icon className="h-6 w-6 fill-gray-400" />
      <span className='text-gray-400 font-geist text-[16px] pr-10'>{item.name}</span>
    </div>
  );
})}


    </div>
  )
}

export default Sidebar
