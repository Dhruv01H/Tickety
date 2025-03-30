import React, { useEffect } from "react";
import { CastAndStory, MovieSwiper } from "../../components/component_index"
import Overview from "./Overview";
import { assets } from "../../assets/assets";

function Charlie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="w-full h-[55vh] flex flex-col items-center justify-center text-white p-6 md:p-12 mb-2"
        style={{ backgroundImage: `url(${assets.charlieBanner})` }}
      >
        <h1 className="text-4xl font-semibold sm:text-6xl">Charlie Chaplin</h1>
        <p className="sm:text-2xl opacity-60">Documentry</p>
      </div>
      <div className="mb-20 border-t-[14px] border-black border-dashed" />

      <Overview />
      <CastAndStory />
      <MovieSwiper />
    </>
  );
}

export default Charlie;
