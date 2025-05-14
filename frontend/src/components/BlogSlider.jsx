import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Heading from "./Heading";
const steps = [
  {
    icon: <i className="fas fa-globe text-blue-600 text-3xl"></i>,
    step: "01",
    title: "Make An Inquiry",
    desc: "Reach out to us with your project idea or requirements to get started.",
  },
  {
    icon: <i className="fas fa-comments text-blue-600 text-3xl"></i>,
    step: "02",
    title: "Discuss With The Manager",
    desc: "Talk with our expert manager to understand your goals and suggest tailored strategies.",
  },
  {
    icon: <i className="fas fa-users text-blue-600 text-3xl"></i>,
    step: "03",
    title: "Meet and Choose Your Team",
    desc: "Select your dedicated team from a pool of experienced professionals ready to collaborate.",
  },
  {
    icon: <i className="fas fa-file-signature text-blue-600 text-3xl"></i>,
    step: "04",
    title: "Sign the Contract",
    desc: "Finalize agreements and timelines by signing a transparent and flexible contract.",
  },
  {
    icon: <i className="fas fa-rocket text-blue-600 text-3xl"></i>,
    step: "05",
    title: "Work Together",
    desc: "Begin the journey as we work hand-in-hand to bring your vision to life efficiently.",
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
      <Heading text1="HOW TO START WITH" text2="THE REVEUSE SOLUTION" />
      <div className="relative max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isSwiperReady && (
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
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
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-100 p-8 rounded-xl text-center mulish hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
                  <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
                  <p className="text-gray-600 mb-6">{step.desc}</p>
                  <Link to="/about" className="text-blue-500 hover:underline">
                    Read More
                  </Link>
                </div>
              </SwiperSlide>
            ))}
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
    </div>
  );
};

export default BlogSlider;
