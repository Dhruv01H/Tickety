import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

function PosterSection() {
  const navigate = useNavigate();

  return (
    <>
      <motion.section
        className="bg-[url('./poster_banner.jpg')] min-h-[90vh] bg-no-repeat bg-cover my-20 px-5 md:px-10 lg:px-20 xl:px-36 2xl:px-56 flex items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-4xl">
          {/* Top small icon and text */}
          <motion.div
            className="flex flex-col mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <i className="text-2xl ri-movie-2-ai-line text-primary"></i>
            <p className="text-frost">Documentary</p>
          </motion.div>

          {/* Heading and Subtext */}
          <motion.div
            className="flex flex-col mb-8 text-frost"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="mb-2 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
              Charlie Chaplin
            </h2>
            <p className="max-w-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
              sapiente illum quas quam vitae nisi perspiciatis cum dolorum
              obcaecati!
            </p>
          </motion.div>

          {/* Award images */}
          <motion.div
            className="flex flex-wrap gap-5 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
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
          </motion.div>

          {/* Button */}
          <motion.button
            onClick={() => navigate("/charlie")}
            className="px-5 cursor-pointer py-2.5 transition text-lg rounded-lg duration-500 bg-frost hover:bg-primary hover:text-frost hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            More Info
          </motion.button>
        </div>
      </motion.section>
    </>
  );
}

export default PosterSection;
