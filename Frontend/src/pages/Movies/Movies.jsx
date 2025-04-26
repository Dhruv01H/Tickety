import React from "react";
import { assets } from "../../assets/assets";
import { NowStreaming, Upcoming } from "../../components/component_index";
import { motion } from "framer-motion";

function Movies() {
  return (
    <>
      <div
        className="w-full h-[60vh] flex flex-col items-center justify-center bg-no-repeat bg-cover text-white p-6 md:p-12 mb-2"
        style={{ backgroundImage: `url(${assets.stripes})` }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="text-6xl font-semibold"
        >
          Movies
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="sm:text-2xl"
        >
          Get to know about the latest hits!
        </motion.p>
      </div>
      <div className="mb-20 border-t-[14px] border-black border-dashed" />

      <NowStreaming />
      <Upcoming />
    </>
  );
}

export default Movies;
