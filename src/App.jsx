import { Routes, Route } from 'react-router-dom'

import Sidebar from "./components/Sidebar.jsx"
import DisplaySection from "./components/DisplaySection.jsx"
import Dashboard from './pages/Dashboard.jsx'
import History from './pages/History.jsx'
import Settings from './pages/Settings.jsx'
import Notifications from './pages/Notifications.jsx'
import AssignmentsPage from './pages/AssignmentsPage.jsx'
import { Toaster } from "react-hot-toast";

function App() {

  return (

    <>

      <Routes>
        <Route path="/" element={<>landing page</>}/>

        <Route path="/dashboard" element={<>
          <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
            <Sidebar />
            <DisplaySection component={<Dashboard/>}/>
          </div>
        </>} />

        <Route path="/assignments" element={<>
          <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
            <Sidebar />
            <DisplaySection component={<AssignmentsPage />}/>
          </div>
        </>} />
        
        <Route path="/settings" element={<>
          <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
            <Sidebar />
            <DisplaySection component={<Settings />}/>
          </div>
        </>} />

        <Route path="/history" element={<>
          <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
            <Sidebar />
            <DisplaySection component={<History />}/>
          </div>
        </>} />

        <Route path="/notifications" element={<>
          <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
            <Sidebar />
            <DisplaySection component={<Notifications />}/>
          </div>
        </>} />
     
      </Routes>


      <Toaster position="top-right" />
    </>

  )
}

export default App
