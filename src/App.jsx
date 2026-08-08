import Sidebar from "./components/Sidebar.jsx"
import DisplaySection from "./components/DisplaySection.jsx"
import { Toaster } from "react-hot-toast";

function App() {

  return (

    <>
      <div className="bg-black h-[100vh] flex p-3 z-50 overflow-hidden">
        <Sidebar />
        <DisplaySection />
      </div>
      <Toaster position="top-right" />
    </>

  )
}

export default App
