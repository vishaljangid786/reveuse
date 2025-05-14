import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { features } from "../assets/assets";

const FeaturesSlider = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        navigation
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 }, // mobile
          640: { slidesPerView: 1 }, // small screens
          768: { slidesPerView: 2 }, // tablets
          1024: { slidesPerView: 3 }, // desktops
          1280: { slidesPerView: 4 }, // large screens
        }}
        className="group">
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:scale-105 transition-transform duration-500 bg-white shadow-lg group-hover:shadow-2xl">
              <img
                src={feature.image}
                alt={feature.title}
                className="h-40 w-full object-cover rounded-lg mb-3 sm:h-48 md:h-52 lg:h-56"
              />
              <h3 className="font-semibold text-base sm:text-lg md:text-xl">
                {feature.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturesSlider;
