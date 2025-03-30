import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom"
import { Navbar, Footer } from "./components/component_index.js"
import { Home, Profile, SignIn, SignUp, Contact, About, FAQ, BookTickets, Charlie, Movies } from "./pages/page_index.js"
import AppContextProvider from "./context/AppContext.jsx";

function App() {

  const location = useLocation()
  const footerRoutes = ["/ticket", "/signin", "/signup"]
  const navRoutes = ["/ticket", "/signin", "/signup"]

  return (
    <AppContextProvider>
      <ToastContainer position='bottom-right'/>
      {!navRoutes.includes(location.pathname) && <Navbar />}      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie" element={<Movies  />} />
        <Route path="/ticket" element={<BookTickets />} />
        <Route path="/charlie" element={<Charlie />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      {!footerRoutes.includes(location.pathname) && <Footer />}
      </AppContextProvider>
  )
}

export default App