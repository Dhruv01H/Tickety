import React from "react";
import { movies } from "./data";

function NowStreaming() {
  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3">
         {movies.map((movie) => (
            <div key={movie.id}>
                <div className="w-64">
                    <img src={movie.image} alt={movie.title} className="w-full"/>
                </div>
            </div>
         ))}
        </div>
      </div>
    </>
  );
}

export default NowStreaming;
