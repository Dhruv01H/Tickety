import React from "react";
import { Hero, ActionCards, MovieCarousel, EventCarousel, Testimonial, MovieStats, PosterSection } from "../../components/component_index"

function Home() {
  return (
    <>
      <Hero />
      <ActionCards />
      <MovieCarousel />
      <EventCarousel />
      <PosterSection />
      <Testimonial />
      <MovieStats />
    </>
  );
}

export default Home;
