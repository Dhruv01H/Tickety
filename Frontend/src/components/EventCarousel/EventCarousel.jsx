import React from "react";
import data from "./data";

function EventCarousel() {
  return (
    <div className="px-10 mb-20 md:px-28">
      {/* Heading text for the setion */}
      <div className="flex flex-col items-center justify-between mb-10 lg:flex-row max-lg:text-center max-lg:justify-center">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-medium md:text-2xl">Checkout Events</p>
          <h3 className="text-5xl font-medium max-lg:mb-3 md:text-6xl font-quantico text-primary">
            Top Upcoming Events
          </h3>
        </div>
        <p className="font-medium md:text-xl">
          Witness amazing and exclusive events like never before.{" "}
          <br className="max-lg:hidden" /> Get your tickets now and be part of
          the experience.
        </p>
      </div>

      {/* Dynamic Carousel for events available now */}
      <div className="flex flex-col items-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((event) => (
          <div className="relative overflow-hidden">
          <div className="overflow-hidden rounded-md w-72">
            <img src={event.image} alt={event.name} className="object-cover w-full h-[28rem]"/>
          </div>
          <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5">
            <h3 className="text-2xl font-semibold text-frost">{event.name}</h3>
            <p className="text-sm mb-1.5 text-frost">{event.eventType} / {event.eventDate}</p>
            <button className="text-frost px-3 py-1.5 border border-frost rounded-md cursor-pointer">Get Ticket</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default EventCarousel;
