import React, { useState } from "react";
import { details } from "./data";

function ProfileCards() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openPopup = (movie) => {
    setSelectedMovie(movie);
  };

  const closePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="px-10 py-6 mb-20 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        <h2 className="mb-8 text-4xl font-medium">Your Movie Bookings</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {details.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 p-6 rounded-md shadow-md bg-white/30"
            >
              <h4 className="text-2xl font-medium">
                {" "}
                <i class="ri-film-line mr-4 text-primary"></i> {item.title}
              </h4>
              <p>{item.description}</p>
              <p className="text-sm font-light">
                <i class="ri-time-line mr-1 text-primary"></i> {item.runtime}
              </p>
              <div className="mt-2 border-t border-gray-300"></div>
              <button onClick={() => openPopup(item)} className="py-2 transition duration-500 rounded-md cursor-pointer bg-gray-200/50 hover:text-frost hover:bg-primary">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-3xl font-semibold text-center">
              {selectedMovie.title}
            </h3>
            <p className="mb-3 text-lg">
              <strong>Description :</strong> {selectedMovie.description}
            </p>
            <p className="mb-3 text-lg">
              <strong>Genre :</strong> {selectedMovie.genre}
            </p>
            <p className="mb-3 text-lg">
              <strong>Runtime :</strong> {selectedMovie.runtime}
            </p>
            <p className="mb-3 text-lg">
              <strong>Ticket Number :</strong> G3, G4, G5, G6
            </p>
            <p className="mb-4 text-lg">
              <strong>Screen Number :</strong> Screen 2
            </p>
            <button
              className="px-4 py-2 mt-2 text-white transition duration-300 rounded-md cursor-pointer bg-primary hover:bg-secondary"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCards;
