import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Navbar() {
  const { user, setUser } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
     {/* ========= Background Blur ============= */}
     <div className={`fixed inset-0 bg-black/50 transition-opacity duration-500 ${isMenuOpen ? 'visible opacity-100 blur-sm' : 'invisible opacity-0'}`} onClick={menuToggler}></div>
     
    {/* ========= Desktop Menu ============= */}
      <nav className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-10 py-5 space-y-2 bg-transparent border-b-[1px] border-frost lg:px-40 backdrop-blur-xs">
        <Link to={"/"}>
          <h1 className="text-5xl font-semibold cursor-pointer font-acme text-primary">
            Tickety
          </h1>
        </Link>

        <menu className="hidden gap-10 text-xl font-medium text-frost lg:flex">
          <Link
            to={"/"}
            className="font-semibold transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Home</li>
          </Link>

          <Link
            to={"/movie"}
            className="font-semibold transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Movies</li>
          </Link>

          <Link
            to={"/event"}
            className="font-semibold transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Events</li>
          </Link>

          <Link
            to={"/about"}
            className="font-semibold transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>About Us</li>
          </Link>

          <Link
            to={"/contact"}
            className="font-semibold transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Contact Us</li>
          </Link>

          {!user ? (
            <Link
              to={"/signin"}
              className="font-semibold transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
            >
              <li>Join Now</li>
            </Link>
          ) : (
            <Link
              to={"/profile"}
              className="font-semibold transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
            >
              <i className="text-xl rounded-[25%] border p-2.5 ri-user-3-fill"></i>
            </Link>
          )}
        </menu>

        {/* ========= Menu Togglers ============= */}
        
        <div className="lg:hidden">
          <i
            onClick={menuToggler}
            className={`text-4xl text-frost font-medium transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "rotate-180 text-primary" : "rotate-0"
            } ri-${isMenuOpen ? "close-line" : "menu-5-line"}`}
          ></i>
        </div>
      </nav>

      {/* ========= Mobile Menu ============= */}
      <menu
        className={`fixed top-0 left-0 z-20 flex flex-col px-10 py-16 space-y-2 text-2xl h-screen max-sm:w-[75%] md:w-[40%] gap-5 lg:hidden bg-dark text-frost transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to={"/"} className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4">
          <li>Home</li>
        </Link>
        <Link to={"/movie"} className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4">
          <li>Movies</li>
        </Link>
        <Link to={"/event"} className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4">
          <li>Events</li>
        </Link>
        <Link to={"/contact"} className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4">
          <li>Contact Us</li>
        </Link>
        <Link to={"/about"} className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4">
          <li>About Us</li>
        </Link>
        {!user ? (
            <Link
              to={"/signin"}
              className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
            >
              <li>Join Now</li>
            </Link>
          ) : (
            <Link
              to={"/profile"}
              className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
            >
              <li>Profile</li>
            </Link>
          )}
      </menu>
    </>
  );
}

export default Navbar;
