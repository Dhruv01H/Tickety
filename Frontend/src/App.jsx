import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/component_index.js"

function App() {

  return (
    <>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App