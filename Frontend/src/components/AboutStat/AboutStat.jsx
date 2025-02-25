import React from "react";
import { assets } from "../../assets/assets";

function AboutStat() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-6 mb-40 lg:px-32 lg:flex-row">
      <div className="relative w-full max-w-[600px] h-auto rounded-md overflow-hidden">
        <img src={assets.about} alt="About Us" className="w-full h-auto" />
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="mb-8 text-5xl font-medium md:text-6xl font-quantico">
          Providing the Best Services
        </h2>
        <p className="mb-8 text-lg md:text-xl">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod
          tempor incididunt labore dolore magna aliquaenim ad minim. Sed risus
          commodo ornare felis non, eleifend molestie metus pharetra eleifend.
        </p>

        <div className="flex items-center gap-5 mb-8">
          <i className="text-6xl md:text-7xl text-primary ri-service-line"></i>
          <div>
            <h4 className="text-3xl font-medium md:text-4xl">
              Years of operation
            </h4>
            <p className="text-base md:text-lg">
              We're here for you from start to finish.
            </p>
          </div>
        </div>

        <button className="px-10 py-4 text-lg font-medium transition-all duration-500 rounded-md cursor-pointer bg-dark text-frost hover:bg-primary">Discover More</button>
      </div>
    </div>
  );
}

export default AboutStat;
