import React from "react";
import { assets } from "../../assets/assets";

function MovieCarousel() {
  return (
    <div className="px-10 mb-20 md:px-28">
      {/* Heading text for the setion */}
      <div className="flex items-center justify-between mb-10 max-md:text-center max-md:justify-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-5xl font-medium md:text-6xl font-quantico text-primary">MOVIES</h3>
          <p className="text-xl font-medium md:text-2xl">
            Be sure not to miss these Movies today.
          </p>
        </div>
        <button className="px-8 py-3 text-2xl font-semibold transition-all duration-500 cursor-pointer rounded-xl bg-gradient-3 hover:scale-105 text-frost max-lg:hidden">
          Now showing
        </button>
      </div>

      {/* Static Carousel for movies available now */}
      <div className="flex flex-col items-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <div className="relative overflow-hidden">
          <div className="overflow-hidden rounded-md w-72">
            <img src={assets.poster1} alt="Poster1" className="object-cover w-full h-[28rem]"/>
          </div>

          <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5">
            <p className="text-sm text-frost">Suspense / 180 Mins</p>
            <h3 className="text-2xl mb-1.5 text-frost">Shutter Island</h3>
            <button className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer">Get Ticket</button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="overflow-hidden rounded-md w-72">
            <img src={assets.poster2} alt="Poster2" className="object-cover w-full h-[28rem]"/>
          </div>

          <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5">
            <p className="text-sm text-frost">Action / 190 Mins</p>
            <h3 className="text-2xl mb-1.5 text-frost">Jhonny Cage</h3>
            <button className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer">Get Ticket</button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="overflow-hidden rounded-md w-72">
            <img src={assets.poster3} alt="Poster3" className="object-cover w-full h-[28rem]"/>
          </div>

          <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5">
            <p className="text-sm text-frost">Drama / 150 Mins</p>
            <h3 className="text-2xl mb-1.5 text-frost">Festival</h3>
            <button className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer">Get Ticket</button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="overflow-hidden rounded-md w-72">
            <img src={assets.poster4} alt="Poster4" className="object-cover w-full h-[28rem]"/>
          </div>

          <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5">
            <p className="text-sm text-frost">Comedy / 180 Mins</p>
            <h3 className="text-2xl mb-1.5 text-frost">Tureman Show</h3>
            <button className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer">Get Ticket</button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="overflow-hidden rounded-md w-72">
            <img src={assets.poster5} alt="Poster5" className="object-cover w-full h-[28rem]"/>
          </div>

          <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5">
            <p className="text-sm text-frost">Sci-Fi / 200 Mins</p>
            <h3 className="text-2xl mb-1.5 text-frost">The Matrix</h3>
            <button className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer">Get Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCarousel;
