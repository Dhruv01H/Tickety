import React, { useState, useEffect } from "react";
import { Hero, ActionCards, MovieCarousel, EventCarousel, Testimonial, MovieStats, PosterSection } from "../../components/component_index";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for components
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

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
