import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MovieCarousel() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events/get");
      setMovies(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies");
      setIsLoading(false);
    }
  };

  return (
    <div className="px-10 mb-20 md:px-28">
      {/* Heading text for the section */}
      <motion.div 
        className="flex items-center justify-between mb-10 max-md:text-center max-md:justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-5xl font-medium md:text-6xl font-quantico text-primary">
            MOVIES
          </h3>
          <p className="text-xl font-medium md:text-2xl">
            Be sure not to miss these Movies today.
          </p>
        </div>

        <button
          onClick={() => navigate("/movie")}
          className="px-8 py-3 text-2xl font-semibold transition-all duration-500 cursor-pointer rounded-xl bg-gradient-3 hover:scale-105 text-frost max-lg:hidden"
        >
          Now showing
        </button>
      </motion.div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <p className="text-2xl text-gray-600">No movies available at the moment</p>
          <p className="mt-2 text-gray-500">Please check back later for new releases</p>
        </div>
      ) : (
        /* Movie Grid */
        <div className="flex flex-col items-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {movies.map((movie) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5 }}
              onClick={() => navigate("/ticket")}
              key={movie.id}
              className="relative overflow-hidden group transition-all duration-700 border-[5px] border-transparent rounded-md hover:border-primary"
            >
              <div className="overflow-hidden">
                <img
                  src={movie.show_image_url}
                  alt={movie.show_name}
                  loading="lazy"
                  className="object-cover w-full h-[28rem] transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x600?text=No+Image";
                  }}
                />
              </div>

              <div className="absolute bottom-0 left-0 flex flex-col w-full gap-1 p-5">
                <h3 className="text-2xl font-semibold text-frost">
                  {movie.show_name}
                </h3>
                <p className="text-sm mb-1.5 text-frost">
                  {movie.language} / {movie.duration} Mins
                </p>
                <button
                  onClick={() => navigate("/ticket")}
                  className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                >
                  Get Ticket
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieCarousel;
