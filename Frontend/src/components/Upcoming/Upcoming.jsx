import React from "react";
import { details } from "./data";
import { useNavigate } from "react-router-dom";

function Upcoming() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
          Set the date for <br className="hidden max-sm:block" /> upcoming
          movies
        </h2>
        <p className="text-xl max-sm:hidden">
          Book tickets in advance for upcoming movies
        </p>
        <div className="w-[80%] mt-2 border-b border-gray-300"></div>
      </div>

      <div className="px-4 mt-20 mb-24 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        <div className="flex flex-col gap-6 mx-auto space-y-20 max-w-7xl">
          {details.map((detail) => (
            <div key={detail.id} className="relative flex flex-col items-center justify-around rounded-lg max-xl:pb-8 xl:flex-row group bg-gray-800/85">
              <div className="relative w-3/5 md:w-2/5 md:max-w-2xs">
                <img src={detail.image} alt={detail.title} className="object-cover w-full h-full opacity-0"/>
                <img src={detail.image} alt={detail.title} className="absolute object-cover w-full h-full transition duration-700 rounded-md shadow-2xl -top-15 xl:-top-12 group-hover:scale-105"/>
              </div>
              
              <div className="text-center">
                <h3 className="mb-4 text-xl font-semibold text-frost md:text-4xl relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-6px] after:w-0 after:h-[3px] after:bg-frost after:transition-all after:duration-500 after:opacity-0 group-hover:after:w-[40%] group-hover:after:opacity-100 after:translate-x-[-50%]">{detail.title}</h3>
                <p className="max-w-2xl mb-10 text-gray-400">{detail.description}</p>
                <button onClick={() => navigate("/charlie")} className="px-4 py-2 font-medium transition duration-500 rounded-md cursor-pointer bg-frost group-hover:bg-primary group-hover:text-frost hover:shadow-md shadow-primary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Upcoming;
