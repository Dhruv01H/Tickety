import React from "react";
import { motion } from "framer-motion";

function ActionCards() {
  return (
    <>
      <div className="flex flex-col items-center justify-around gap-5 mb-20 md:mb-40 md:px-28 lg:flex-row">
        {/** Card Container */}
        {[ 
          { text: "Get Tickets", heading: "Book movie tickets", icon: "ri-movie-2-line" },
          { text: "Join Now", heading: "Access exclusive events", icon: "ri-mic-line" },
          { text: "Watch Now", heading: "Enter sport matches", icon: "ri-tv-2-line" }
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}  // Cards start off-screen from the bottom
            whileInView={{ opacity: 1, y: 0 }}  // Ensures opacity and position animate when card enters viewport
            transition={{
              duration: 0.7,                 // Smooth duration
              delay: index * 0.2             // Staggered delay for each card
            }}
            viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the card is in the viewport
            className="flex items-center justify-between w-[90%] xl:w-1/3 h-auto xl:h-44 p-6 md:p-8 bg-[url('./filmstrip.jpg')] bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
          >
            <div className="text-left text-frost">
              <p className="font-semibold text-md">{card.text}</p>
              <h3 className="mt-2 text-3xl font-medium xl:text-4xl">{card.heading}</h3>
            </div>
            <div className="flex items-center justify-center shrink-0">
              <i className={`p-4 text-5xl xl:text-6xl ${card.icon} text-frost bg-primary rounded-full`}></i>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default ActionCards;
