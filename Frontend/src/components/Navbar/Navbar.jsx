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
    {/* ========= Desktop Menu ============= */}
      <nav className="flex items-center justify-between px-10 py-4 space-y-3 bg-dark">
        <Link to={"/"}>
          <h1 className="text-5xl cursor-pointer font-courgette text-primary">
            Tickety
          </h1>
        </Link>

        <menu className="hidden gap-10 text-xl font-medium lg:flex text-frost">
          <Link
            to={"/"}
            className="transition-all duration-500 hover:scale-105 hover:text-primary"
          >
            <li>Home</li>
          </Link>

          <Link
            to={"/movie"}
            className="transition-all duration-500 hover:scale-105 hover:text-primary"
          >
            <li>Movies</li>
          </Link>

          <Link
            to={"/event"}
            className="transition-all duration-500 hover:scale-105 hover:text-primary"
          >
            <li>Events</li>
          </Link>

          <Link
            to={"/about"}
            className="transition-all duration-500 hover:scale-105 hover:text-primary"
          >
            <li>About Us</li>
          </Link>

          <Link
            to={"/contact"}
            className="transition-all duration-500 hover:scale-105 hover:text-primary"
          >
            <li>Contact Us</li>
          </Link>

          {!user ? (
            <Link
              to={"/signin"}
              className="transition-all duration-500 hover:scale-105 hover:text-primary"
            >
              <li>Join Now</li>
            </Link>
          ) : (
            <Link
              to={"/profile"}
              className="transition-all duration-500 hover:scale-110 hover:text-primary"
            >
              <i className="text-xl ri-user-3-fill"></i>
            </Link>
          )}
        </menu>

        {/* ========= Menu Togglers ============= */}
        
        <div className="lg:hidden">
          <i
            onClick={menuToggler}
            className={`text-3xl text-frost transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "rotate-180 text-primary" : "rotate-0"
            } ri-${isMenuOpen ? "close-line" : "menu-5-line"}`}
          ></i>
        </div>
      </nav>

      {/* ========= Mobile Menu ============= */}
      <menu
        className={`fixed top-22 left-0 z-10 flex flex-col px-10 py-4 text-2xl font-medium h-screen sm:w-[50%] md:w-[35%] gap-5 lg:hidden bg-dark text-frost transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to={"/"} className="transition-all duration-500 hover:scale-110 hover:text-primary">
          <li>Home</li>
        </Link>
        <Link to={"/about"} className="transition-all duration-500 hover:scale-110 hover:text-primary">
          <li>About Us</li>
        </Link>
        <Link to={"/contact"} className="transition-all duration-500 hover:scale-110 hover:text-primary">
          <li>Contact Us</li>
        </Link>
        <Link to={"/news"} className="transition-all duration-500 hover:scale-110 hover:text-primary">
          <li>News</li>
        </Link>
        <Link to={"/faq"} className="transition-all duration-500 hover:scale-110 hover:text-primary">
          <li>FAQ's</li>
        </Link>
      </menu>
    </>
  );
}

export default Navbar;
