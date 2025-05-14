import React from "react";
import img1 from "../assets/homeabout.webp";
import Heading from "./Heading";
import { Link } from "react-router-dom";

const HomeAbout = () => {
  return (
    <div
      className="relative w-full min-h-[100vh] bg-cover bg-center bg-fixed flex items-center justify-center text-white px-4 py-10 md:py-20"
      style={{
        backgroundImage: `url(${img1})`,
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl text-center">
        <Heading text1="About" text2="Us" />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-2">
          Empowering Businesses: Our Journey
        </h1>

        <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed px-2">
          At The Reveuse Solution, we set the standard for excellence in
          business process outsourcing. With a global presence and a diverse
          team of experts, we craft customized solutions that propel businesses
          forward. Whether you're a startup or an established enterprise, we
          tailor our services to address your unique challenges and goals. Our
          approach combines innovative strategies for sustainable growth,
          operational excellence for enhanced efficiency, and a relentless drive
          for success. By partnering with us, you'll unlock your business's full
          potential and discover a transformative journey that fuels growth,
          boosts efficiency, and sets you apart from the competition.
        </p>

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
  );
};

export default HomeAbout;
