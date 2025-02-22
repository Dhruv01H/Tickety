import React, { useState, useEffect } from "react";

function Hero() {
  const words = ["Movies", "Events", "Sports", "Affordable"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting && charIndex < words[wordIndex].length) {
          setText((prev) => prev + words[wordIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else if (isDeleting && charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else if (!isDeleting && charIndex === words[wordIndex].length) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <>
      <section
        className="relative flex mb-2 items-center justify-center h-screen text-white bg-center bg-cover bg-[url('./header12.jpg')]">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold md:text-8xl">
            Welcome to Tickety
          </h1>
          <h2 className="mt-4 text-2xl md:text-6xl">
            Book tickets for <span className="text-primary">{text}</span>
          </h2>
        </div>
      </section>
      <div className="mb-20 border-t-[14px] border-black border-dashed" />

    </>
  );
}

export default Hero;
