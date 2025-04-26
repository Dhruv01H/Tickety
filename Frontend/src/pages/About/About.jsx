import React from "react";
import { AboutStat, Testimonial } from "../../components/component_index";
import { motion } from "framer-motion";

function About() {
  return (
    <>
      <section className="relative flex items-center justify-center mb-2 h-[80vh] text-white bg-center bg-cover bg-[url('./aboutback.jpg')]">
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            className="text-4xl font-bold drop-shadow-2xl text-tertiary md:text-8xl"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6 }}
            className="px-3 text-sm text-center md:text-lg"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, modi molestias
            <br /> et sapiente praesentium quaerat?
          </motion.p>
        </div>
      </section>
      <div className="md:mb-40 mb-28 border-t-[14px] border-black border-dashed" />

      <AboutStat />
      <Testimonial />
    </>
  );
}

export default About;
