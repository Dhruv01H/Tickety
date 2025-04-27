import React, { useState, useEffect } from "react";
import { Hero, ActionCards, MovieCarousel, EventCarousel, Testimonial, MovieStats, PosterSection } from "../../components/component_index";

function Home() {
  const [isLoading, setIsLoading] = useState(false); 

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
