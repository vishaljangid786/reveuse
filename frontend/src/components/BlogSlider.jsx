import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Navigation, Autoplay } from "swiper/modules";
import Testimonials from "../components/Testimonials.jsx";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Heading from "./Heading";

const slides = [
  {
    date: "26 December 2019",
    title: "Lorem Ipsum Dolor",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?",
    img: "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp",
  },
  {
    date: "27 December 2019",
    title: "Lorem Ipsum Dolor 2",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?",
    img: "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp",
  },
  {
    date: "28 December 2019",
    title: "Lorem Ipsum Dolor 3",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?",
    img: "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp",
  },
];

const BlogSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  useEffect(() => {
    setIsSwiperReady(true);
  }, []);

  return (
    <div className="overflow-hidden">
      <Heading text1="HOW TO START WITH " text2="THE REVEUSE SOLUTION" />
      <div className="relative max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isSwiperReady && (
          <Swiper
            modules={[Pagination, EffectFade, Navigation, Autoplay]}
            effect="fade"
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".blog-slider__pagination",
            }}>
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden w-full">
                  <div className="w-full md:w-1/2 h-64 md:h-[450px]">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-center text-center md:text-left">
                    <span className="text-gray-500 text-sm mb-2">
                      {slide.date}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{slide.text}</p>
                    <Link to="/about" className="inline-block">
                      <button className="group relative overflow-hidden bg-blue-500 text-white px-6 py-2 rounded hover:bg-transparent border-2 border-blue-500 hover:text-blue-500 transition duration-300 transform hover:scale-105">
                        <span className="inline-block transition-all duration-300 group-hover:pr-6">
                          Learn More
                        </span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300">
                          →
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="blog-slider__pagination mt-6 text-center" />
          </Swiper>
        )}

        {/* Navigation Arrows */}
        <button
          ref={prevRef}
          className="hidden sm:flex items-center justify-center hover:bg-transparent hover:text-blue-500 text-white absolute top-1/2 -translate-y-1/2 left-1 z-10 bg-blue-500 shadow p-2 rounded-full border-2 cursor-pointer border-blue-500 transition">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="hidden sm:flex items-center justify-center hover:bg-transparent hover:text-blue-500 text-white absolute top-1/2 -translate-y-1/2 right-1 z-10 bg-blue-500 shadow p-2 rounded-full border-2 cursor-pointer border-blue-500 transition">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <Testimonials />
    </div>
  );
};

export default BlogSlider;
