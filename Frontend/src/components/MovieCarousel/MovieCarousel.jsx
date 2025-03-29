import React from "react";
import movies from "./data";
import { useNavigate } from "react-router-dom";

function MovieCarousel() {

  const navigate = useNavigate()

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
        {movies.map((movie) => (
          <div onClick={() => navigate("/ticket")} key={movie.id} className="relative overflow-hidden group transition-all duration-700 border-[5px] border-transparent rounded-md hover:border-primary">
            <div className="overflow-hidden">
              <img
                src={movie.image}
                alt={movie.title}
                loading="lazy"
                className="object-cover w-full h-[28rem] transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-0 left-0 flex flex-col w-full gap-1 p-5 ">
              <h3 className="text-2xl font-semibold text-frost">{movie.title}</h3>
              <p className="text-sm mb-1.5 text-frost">
                {movie.movieType} / {movie.duration}
              </p>
              <button onClick={() => navigate("/ticket")} className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                Get Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieCarousel;
