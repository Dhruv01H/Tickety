import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../../assets/assets";

function Home() {
  return (
    <>
      {/* ========= Home Page ============= 
      <div>
        <img
          src={assets.header1}
          alt=""
          className="absolute -z-10 top-0 w-full min-h-screen aspect-[4/3]"
        />
      </div> */}

      {/* Hero Section with auto carousal */}
      <div className="-z-10">
        <Swiper
          spaceBetween={5}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
        
        <SwiperSlide>
              <div className="">
                <img
                  src={assets.header1}
                  alt="Hero 1"
                  className="w-full h-full aspect-[9/16] sm:aspect-[9/10] md:aspect-[7/5] lg:aspect-[7/3] xl:aspect-[7/4]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="">
                <img
                  src={assets.header2}
                  alt="Hero 2"
                  className="w-full h-full aspect-[9/16] sm:aspect-[9/10] md:aspect-[7/5] lg:aspect-[7/3] xl:aspect-[7/4]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="">
                <img
                  src={assets.header3}
                  alt="Hero 3"
                  className="w-full h-full aspect-[9/16] sm:aspect-[9/10] md:aspect-[7/5] lg:aspect-[7/3] xl:aspect-[7/4]"
                />
              </div>
            </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default Home;
