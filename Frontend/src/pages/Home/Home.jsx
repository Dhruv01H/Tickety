import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../../assets/assets";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="relative w-full h-[80vh] overflow-hidden">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="absolute top-0 left-0 z-0 w-full h-[80vh] mySwiper"
        >
          <SwiperSlide>
            <img
              src={assets.header1}
              alt="Hero 1"
              className="object-cover w-full h-[80vh]"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={assets.header2}
              alt="Hero 2"
              className="object-cover w-full h-[80vh]"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={assets.header3}
              alt="Hero 3"
              className="object-cover w-full h-[80vh]"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={assets.header4}
              alt="Hero 4"
              className="object-cover w-full h-[80vh]"
            />
          </SwiperSlide>

          <SwiperSlide>
            <div className="">
              <img
                src={assets.header5}
                alt="Hero 5"
                className="object-cover w-full h-[80vh]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default Home;
