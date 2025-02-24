import React from "react";
import { Hero, ActionCards, MovieCarousel, EventCarousel, Testimonial } from "../../components/component_index"

function Home() {
  return (
    <>
      <Hero />
      <ActionCards />
      <MovieCarousel />
      <EventCarousel />
      <Testimonial />
    </>
  );
}

export default Home;
