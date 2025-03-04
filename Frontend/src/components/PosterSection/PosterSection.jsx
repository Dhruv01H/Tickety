import React from "react";
import { assets } from "../../assets/assets";

function PosterSection() {
  return (
    <>
      <section className="bg-[url('./poster_banner.jpg')] min-h-[90vh] bg-no-repeat bg-cover my-20 lg:px-60 flex items-center justify-between">
        <div>
          <div className="flex flex-col mb-4">
            <i className="text-2xl ri-movie-2-ai-line text-primary"></i>
            <p className="text-frost">Documentary</p>
          </div>
          
          <div className="flex flex-col mb-8 text-frost">
            <h2 className="mb-2 font-medium text-7xl">Charlie Chaplin</h2>
            <p className="max-w-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam sapiente illum quas quam vitae nisi perspiciatis cum dolorum obcaecati!
            </p>
          </div>
          
          <div className="flex gap-5 mb-10">
            <img src={assets.award1} alt="" />
            <img src={assets.award2} alt="" />
          </div>

          <button className="px-5 py-2.5 transition text-lg rounded-lg duration-500 bg-frost hover:bg-primary hover:text-frost hover:scale-105">More Info</button>
        </div>
        <div>
            
        </div>
      </section>
    </>
  );
}

export default PosterSection;
