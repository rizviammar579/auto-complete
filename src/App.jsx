import Sidebar from "./components/Sidebar.jsx"
import DisplaySection from "./components/DisplaySection.jsx"

function App() {

  return (
    <div className="bg-black h-[100vh] flex p-3 z-50">
      <Sidebar/>
      <DisplaySection/>
    </div>
  )
}

export default App
