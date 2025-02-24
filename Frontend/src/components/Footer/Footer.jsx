import React from 'react'
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="p-8 bg-black text-frost md:p-12">
    <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
      {/* Left Section */}
      <div>
        <h2 className="flex items-center text-4xl font-bold text-primary">
            Tickety
        </h2>
        <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quaerat fugit minima.</p>
        <button className="px-4 py-2 mt-4 rounded bg-primary text-frost">Get Your Ticket</button>
      </div>

      {/* Middle Section */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold text-primary">Navigation</h3>
          <ul className="flex flex-col mt-2 space-y-2">
          <Link to={"/movie"}><li>Movies</li></Link>
          <Link to={"/event"}><li>Events</li></Link>
          <Link to={"/about"}><li>About Us</li></Link>
          <Link to={"/contact"}><li>Contact Us</li></Link>
          <Link to={"/faq"}><li>FAQ's</li></Link>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary">Policies</h3>
          <ul className="flex flex-col mt-2 space-y-2">
          <Link to={"/privacy"}><li>Privacy Policy</li></Link>
          <Link to={"/booking"}><li>Booking Policies</li></Link>
          <Link to={"/cancel"}><li>Cancellation Policies</li></Link>
          <Link to={"/about"}><li>About Us</li></Link>
          <Link to={"/contact"}><li>Contact Us</li></Link>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <h3 className="text-xl font-bold text-primary">Newsletter</h3>
        <p className="mt-2">Subscribe to Tickety newsletter this very day.</p>
        <div className="flex items-center mt-4 overflow-hidden bg-white rounded ">
          <input type="email" placeholder="Email Address" className="w-full p-2 text-black outline-none" />
          <button className="p-3 cursor-pointer bg-primary text-frost">&#10148;</button>
        </div>
        <div className="flex items-center mt-2">
          <input type="checkbox" id="terms" className="mr-2 cursor-pointer accent-primary"/>
          <label htmlFor="terms" className="text-sm">I agree to all terms and policies of the company</label>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="flex flex-col items-center justify-between pt-4 mt-8 border-t border-gray-500 md:flex-row">
      <div className="space-x-4 text-sm">
        <p>Copyright under Tickety @ 2025</p>
      </div>
      <div className="flex mt-4 space-x-4 md:mt-0">
        <Link to={"https://www.google.com/"}><i className="p-3 text-lg bg-gray-700 rounded-full ri-global-line"></i></Link>
        <Link to={"https://www.instagram.com/"}><i className="p-3 text-lg bg-gray-700 rounded-full ri-instagram-line"></i></Link>
        <Link to={"https://www.facebook.com/"}><i className="p-3 text-lg bg-gray-700 rounded-full ri-facebook-circle-line"></i></Link>
        <Link to={"https://www.whatsapp.com/"}><i className="p-3 text-lg bg-gray-700 rounded-full ri-whatsapp-line"></i></Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer   