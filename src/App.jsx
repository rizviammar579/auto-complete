import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import AssignmentsPage from './pages/AssignmentsPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Custom404 from './components/Custom404.jsx'
import { Toaster } from "react-hot-toast";

function App() {

  return (

    <>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/:slug" element={<Custom404 />} />


        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/assignments" element={<AssignmentsPage />} />

          <Route path="/settings" element={<SettingsPage />} />

          <Route path="/history" element={<HistoryPage />} />

          <Route path="/notifications" element={<NotificationsPage />} />

        </Route>


      </Routes>


      <Toaster position="top-right" />
    </>

  )
}

export default App
