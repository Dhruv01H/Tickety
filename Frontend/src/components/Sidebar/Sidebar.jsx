import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const isDefaultPath = location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <>
      <div
        className={`h-screen bg-dark p-4 flex flex-col transition-all duration-300 w-64 border-r border-gray-800`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mt-6 mb-8">
          <div
            className={`flex items-center gap-3`}
          >
            <i className="text-2xl text-white ri-user-6-line"></i>
            <span className="text-xl font-semibold text-white">
              Hello Admin
            </span>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col mt-6 space-y-4">
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive || isDefaultPath
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <i className="text-xl ri-home-4-line"></i> Dashboard
          </NavLink>

          <NavLink
            to="/admin/movie"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <i className="text-xl ri-movie-2-line"></i> Add Movie
          </NavLink>
          
          <NavLink
            to="/admin/showtime"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <i className="text-xl ri-timer-line"></i> Add Showtime
          </NavLink>

          <div className="flex-grow"></div>

          <button className="flex items-center gap-3 p-3 mt-auto text-gray-300 transition-colors duration-200 rounded-lg cursor-pointer hover:bg-primary hover:text-white">
            <i className="text-xl ri-logout-box-r-line"></i> Logout
          </button>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;