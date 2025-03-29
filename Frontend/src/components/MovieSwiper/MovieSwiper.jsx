import React from "react";
import { movies } from "./data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MovieSwiper() {
  return (
    <>
      <div className="w-full max-w-6xl px-4 py-8 mx-auto mb-20">
        <Swiper
          modules={[ Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10 custom-swiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative overflow-hidden rounded-lg shadow-lg group">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="object-cover w-full transition-transform duration-500 h-96 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-500 opacity-0 bg-black/60 group-hover:opacity-100">
                  <h3 className="text-lg font-bold text-white">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-300">{movie.description}</p>
                  <div className="mt-2">
                    <button className="px-4 py-2 text-sm text-white transition duration-300 rounded-lg bg-primary hover:bg-secondary">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </>
  );
}

export default MovieSwiper;
