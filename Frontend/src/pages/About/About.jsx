import React from "react";
import { AboutStat, Testimonial } from "../../components/component_index"

function About() {
  return (
    <>
      <section className="relative flex items-center justify-center mb-2 h-[50vh] text-white bg-center bg-cover bg-[url('./header5.jpg')]">
      <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold drop-shadow-2xl text-tertiary md:text-8xl">
            About Us
          </h1>
        </div>
      </section>
      <div className="md:mb-40 mb-28 border-t-[14px] border-black border-dashed" />

      <AboutStat />
      <Testimonial />
    </>
  );
}

export default About;
