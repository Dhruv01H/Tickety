import React from "react";
import { Hero, ActionCards, MovieCarousel, EventCarousel, Testimonial, MovieStats } from "../../components/component_index"

function Home() {
  return (
    <>
      <Hero />
      <ActionCards />
      <MovieCarousel />
      <EventCarousel />
      <Testimonial />
      <MovieStats />
    </>
  );
}

export default Home;
