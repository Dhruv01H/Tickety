import React from "react";
import { assets } from "../../assets/assets";
import { NowStreaming, Upcoming } from "../../components/component_index";

function Movies() {
  return (
    <>
      <div
        className="w-full h-[60vh] flex flex-col items-center justify-center bg-no-repeat bg-cover text-white p-6 md:p-12 mb-2"
        style={{ backgroundImage: `url(${assets.stripes})` }}
      >
        <h1 className="text-6xl font-semibold">Movies</h1>
        <p className="sm:text-2xl">Get to know about the latest hits!</p>
      </div>
      <div className="mb-20 border-t-[14px] border-black border-dashed" />

      <NowStreaming />
      <Upcoming />
    </>
  );
}

export default Movies;
