import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

function PosterSection() {

  const navigate = useNavigate()

  return (
    <>
      <section className="bg-[url('./poster_banner.jpg')] min-h-[90vh] bg-no-repeat bg-cover my-20 px-5 md:px-10 lg:px-20 xl:px-36 2xl:px-56 flex items-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col mb-4">
            <i className="text-2xl ri-movie-2-ai-line text-primary"></i>
            <p className="text-frost">Documentary</p>
          </div>
          <div className="flex flex-col mb-8 text-frost">
            <h2 className="mb-2 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
              Charlie Chaplin
            </h2>
            <p className="max-w-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
              sapiente illum quas quam vitae nisi perspiciatis cum dolorum
              obcaecati!
            </p>
          </div>
          <div className="flex flex-wrap gap-5 mb-10">
            <img
              src={assets.award1}
              alt="Award 1"
              className="w-20 md:w-24 lg:w-28 xl:w-32"
            />
            <img
              src={assets.award2}
              alt="Award 2"
              className="w-20 md:w-24 lg:w-28 xl:w-32"
            />
          </div>
          <button onClick={() => navigate("/charlie")} className="px-5 cursor-pointer py-2.5 transition text-lg rounded-lg duration-500 bg-frost hover:bg-primary hover:text-frost hover:scale-105">
            More Info
          </button>
        </div>
      </section>
    </>
  );
}

export default PosterSection;
