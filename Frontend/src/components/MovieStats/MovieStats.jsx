import React from 'react'
import movies from './data'
import { motion } from 'framer-motion'

function MovieStats() {

  return (
    <div className="flex flex-col w-full lg:flex-row">
      {movies.map((movie) => (
        <motion.div
          key={movie.id}
          className={`relative w-full lg:w-1/3 min-lg:mx-0.5 min-lg:my-1 h-68 md:h-80 bg-cover bg-center flex items-center justify-center group text-white text-center px-4 overflow-hidden`}
          style={{ backgroundImage: movie.image }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3 }}
        >
          <div className="absolute inset-0 transition-opacity duration-300 bg-black/50 group-hover:opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black via-transparent to-transparent md:h-20"></div>
          <div className="absolute top-0 left-0 w-full h-16 max-lg:hidden md:h-20" style={{ backgroundImage: "url('./texture.png')", backgroundSize: "cover", mixBlendMode: "lighten" }}></div>
          <div className="relative flex flex-col items-center">
            <div className="p-7 text-primary  text-5xl bg-frost rounded-[50%] group-hover:text-frost group-hover:bg-primary transition-all duration-500"><i className={`${movie.icon}`}></i></div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">{movie.title}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default MovieStats