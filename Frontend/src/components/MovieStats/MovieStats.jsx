import React from 'react'
import movies from './data'

function MovieStats() {

  return (
    <div className="flex flex-col w-full lg:flex-row">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={`relative w-full lg:w-1/3 min-lg:mx-0.5 min-lg:my-1 h-68 md:h-80 bg-cover bg-center flex items-center justify-center text-white text-center px-4 overflow-hidden`}
          style={{ backgroundImage: movie.image }}
        >
          <div className="absolute inset-0 transition-opacity bg-black/50 md:hover:opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black via-transparent to-transparent md:h-20"></div>
          <div className="absolute top-0 left-0 w-full h-16 max-lg:hidden md:h-20" style={{ backgroundImage: "url('./texture.png')", backgroundSize: "cover", mixBlendMode: "lighten" }}></div>
          <div className="relative flex flex-col items-center">
            <div className="p-7 text-primary  text-5xl bg-white rounded-[50%]"><i className={`${movie.icon}`}></i></div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">{movie.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieStats