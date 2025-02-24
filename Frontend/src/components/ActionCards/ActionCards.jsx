import React from "react";

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
          <div 
            key={index} 
            className="flex items-center justify-between w-[90%] xl:w-1/3 h-auto xl:h-44 p-6 md:p-8 bg-[url('./filmstrip.jpg')] bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
          >
            <div className="text-left text-frost">
              <p className="font-semibold text-md">{card.text}</p>
              <h3 className="mt-2 text-3xl font-medium xl:text-4xl">{card.heading}</h3>
            </div>
            <div className="flex items-center justify-center shrink-0">
              <i className={`p-4 text-5xl xl:text-6xl ${card.icon} text-frost bg-primary rounded-full`}></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ActionCards;
