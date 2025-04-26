import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

function AboutStat() {
  return (
    <>
      <section className="flex flex-col items-center gap-8 p-8 mx-auto md:flex-row max-w-7xl">
        {/* Left Side - Image and Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <img
            src={assets.aboutinfo}
            alt="Film Production"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Side - Content */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <motion.h4
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-2 font-semibold text-primary"
          >
            <span className="text-2xl">
              <i className="ri-movie-2-ai-line"></i>
            </span>{" "}
            Get To Know
          </motion.h4>

          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-2 text-3xl font-bold md:text-4xl"
          >
            Proving the Best Film Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-gray-600"
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod
            tempor incididunt labore dolore magna aliqua enim ad minim.
          </motion.p>

          {/* 6 Years of Innovation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-3 p-4 mt-4 bg-gray-100 rounded-lg"
          >
            <span className="text-6xl text-primary">
              <i className="ri-movie-2-ai-line"></i>
            </span>
            <div>
              <h5 className="text-lg font-bold">6 Years of Innovation</h5>
              <p className="text-sm text-gray-600">
                We're here for you from start to finish.
              </p>
            </div>
          </motion.div>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="px-6 py-3 mt-6 text-white transition duration-500 bg-black rounded-lg cursor-pointer hover:bg-primary"
          >
            Discover More
          </motion.button>
        </div>
      </section>
    </>
  );
}

export default AboutStat;
