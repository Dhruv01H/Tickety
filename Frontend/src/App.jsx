import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom"
import { Navbar, Footer } from "./components/component_index.js"
import { Home, Profile, SignIn, SignUp, Contact, About, FAQ, BookTickets } from "./pages/page_index.js"
import AppContextProvider from "./context/AppContext.jsx";

function App() {

  const location = useLocation()

  return (
    <AppContextProvider>
      <ToastContainer position='bottom-right'/>
      {location.pathname !== '/ticket' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ticket" element={<BookTickets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      {location.pathname !== '/ticket' && <Footer />}
      </AppContextProvider>
  )
}

export default App