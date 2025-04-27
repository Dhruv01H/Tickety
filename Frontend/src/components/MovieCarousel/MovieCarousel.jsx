import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MovieCarousel() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
    fetchAllShows();
    // Set up interval to refresh shows every minute
    const interval = setInterval(fetchAllShows, 60000);
    return () => clearInterval(interval);
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

  const fetchAllShows = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events/shows/all");
      // Filter out shows that have already started
      const currentTime = new Date();
      const validShows = response.data.filter(show => {
        const showTime = new Date(show.dateTime);
        return showTime > currentTime;
      });
      setAllShows(validShows);
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to fetch shows");
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBookTicket = (show) => {
    navigate('/ticket', { state: { show } });
  };

  const getShowsForMovie = (movieId) => {
    return allShows.filter(show => show.event?.id === movieId);
  };

  const isShowStartingSoon = (dateTime) => {
    const showTime = new Date(dateTime);
    const currentTime = new Date();
    const timeDiff = showTime - currentTime;
    // Show is starting in less than 30 minutes
    return timeDiff > 0 && timeDiff <= 30 * 60 * 1000;
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
                  onClick={() => setSelectedMovie(movie)}
                  className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                >
                  View Shows
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Shows Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMovie.show_image_url}
                  alt={selectedMovie.show_name}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100x100?text=No+Image";
                  }}
                />
                <div>
                  <h2 className="text-2xl font-semibold">{selectedMovie.show_name}</h2>
                  <p className="text-gray-600">{selectedMovie.language} / {selectedMovie.duration} Mins</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMovie(null)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <i className="text-2xl ri-close-line"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {getShowsForMovie(selectedMovie.id).length === 0 ? (
                <div className="col-span-2 p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-xl text-gray-600">No shows scheduled for this movie</p>
                </div>
              ) : (
                getShowsForMovie(selectedMovie.id).map((show) => (
                  <div
                    key={show.id}
                    className={`p-4 border rounded-lg ${
                      isShowStartingSoon(show.dateTime)
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600">Screen</p>
                        <p className="font-medium">Screen {show.screen?.screenNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="font-medium">₹{show.price || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Show Time</p>
                      <p className="font-medium">{show.dateTime ? formatDateTime(show.dateTime) : 'N/A'}</p>
                      {isShowStartingSoon(show.dateTime) && (
                        <p className="mt-1 text-sm text-yellow-600">
                          <i className="ri-time-line mr-1"></i>
                          Starting soon!
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleBookTicket(show)}
                      className={`w-full mt-4 px-4 py-2 text-white transition-colors duration-200 rounded-md ${
                        isShowStartingSoon(show.dateTime)
                          ? 'bg-yellow-500 hover:bg-yellow-600'
                          : 'bg-primary hover:bg-secondary'
                      }`}
                    >
                      Book Tickets
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCarousel;
