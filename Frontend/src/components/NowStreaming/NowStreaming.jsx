import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NowStreaming() {
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
    <>
      <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="text-3xl font-medium md:text-4xl lg:text-5xl"
        >
          Grab a chance to witness <br className="hidden max-sm:block" />{" "}
          ongoing movies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="text-xl max-sm:hidden"
        >
          Book tickets for the ongoing movies
        </motion.p>
        <div className="w-full mt-2 border-b border-gray-200"></div>
      </div>

      <div className="px-4 py-6 mb-20 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
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
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
            {movies.map((movie) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                key={movie.id}
                className="relative overflow-hidden rounded-lg group"
              >
                <img
                  src={movie.show_image_url}
                  alt={movie.show_name}
                  className="object-cover w-full transition duration-500 transform h-96 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x600?text=No+Image";
                  }}
                />
                <div className="absolute bottom-0 left-0 flex justify-center w-3/5 p-3 space-x-2 transition duration-500 transform translate-y-full bg-frost group-hover:-translate-y-16">
                  <p className="text-2xl font-medium transition duration-300 hover:text-secondary">
                    {movie.show_name}
                  </p>
                  <div className="absolute bottom-0 right-0 flex justify-end transition duration-300 transform translate-y-full group-hover:-translate-y-14">
                    <button
                      onClick={() => navigate("/charlie")}
                      className="px-5 py-2.5 bg-black text-frost hover:bg-primary transition duration-500 cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default NowStreaming;
