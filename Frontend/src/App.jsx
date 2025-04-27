import "./App.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Navbar, Footer, Sidebar, LoadingAnimation } from "./components/component_index.js";
import {
  Home,
  Profile,
  SignIn,
  SignUp,
  Contact,
  About,
  FAQ,
  BookTickets,
  Charlie,
  Movies,
  Scanner,
  Event,
  AdminHome,
  AddMovie,
  Showtime,
  ScreenManagement,
} from "./pages/page_index.js";
import AppContextProvider from "./context/AppContext.jsx";

function AppContent() {
  const { isAdmin } = useContext(AppContext);
  const location = useLocation();
  const footerRoutes = ["/ticket", "/signin", "/signup"];
  const navRoutes = ["/ticket", "/signin", "/signup"];

  // Redirect to admin dashboard if admin user is on non-admin routes
  if (isAdmin && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/home" replace />;
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {isAdmin ? (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 p-5">
            <Routes>
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/movie" element={<AddMovie />} />
              <Route path="/admin/showtime" element={<Showtime />} />
              <Route path="/admin/screens" element={<ScreenManagement />} />
              <Route path="/admin/scanner" element={<Scanner />} />
              <Route path="/admin" element={<AdminHome />} />
            </Routes>
          </div>
        </div>
      ) : (
        <AppContextProvider>
          {!navRoutes.includes(location.pathname) && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/movie" element={<Movies />} />
            <Route path="/event" element={<Event />} />
            <Route path="/ticket" element={<BookTickets />} />
            <Route path="/charlie" element={<Charlie />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
          {!footerRoutes.includes(location.pathname) && <Footer />}
        </AppContextProvider>
      )}
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for components
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContextProvider>
    {isLoading ? <LoadingAnimation /> : <AppContent />}
      {/* <AppContent /> */}
    </AppContextProvider>
  );
}

export default App;
