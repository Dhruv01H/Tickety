import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-6xl p-4 mx-auto">
        <div className="justify-between sm:flex">
          <div className="max-sm:mb-4">
            <h1 className="text-3xl font-bold">Charlie Chaplin</h1>
            <p className="text-gray-500">Documentary / 180 Mins</p>
          </div>
          <button className="px-6 py-2 text-lg text-white transition duration-300 rounded-md bg-primary hover:bg-secondary">
            Get Ticket
          </button>
        </div>

        <div className="gap-6 mt-4 md:grid md:grid-cols-10">
          {/* Movie Poster */}
          <div className="md:col-span-3">
            <img
              src={assets.charlie}
              alt="Movie Poster"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Trailer Section */}
          <div
            style={{ backgroundImage: `url(${assets.charlieBanner})` }}
            className="relative col-span-7 overflow-hidden bg-no-repeat bg-cover rounded-lg"
          >
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
              <button className="p-4 transition duration-700 rounded-full cursor-pointer bg-primary hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 4l14 8-14 8V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="grid pl-2 mt-6 gap-y-4 md:grid-cols-2">
          <p>
            <span className="font-bold">Director:</span> Christine Eve
          </p>
          <p>
            <span className="font-bold">Writer:</span> Aleesha Rose
          </p>
          <p>
            <span className="font-bold">Rating:</span> PG-13
          </p>
          <p>
            <span className="font-bold">Premiere:</span> 12, March 2023
          </p>
          <p>
            <span className="font-bold">Time:</span> 180 Mins
          </p>
        </div>

        <div className="mt-6 mb-10 border-t border-gray-300"></div>
      </div>
    </>
  );
}

export default Overview;
