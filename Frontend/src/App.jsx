import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom"
import { Navbar, Footer } from "./components/component_index.js"
import { Home, Profile, SignIn, SignUp, Contact } from "./pages/page_index.js"
import AppContextProvider  from "./context/AppContext"; 
function App() {

  return (
    <AppContextProvider>
           <ToastContainer position='bottom-right'/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      </AppContextProvider>
  )
}

export default App