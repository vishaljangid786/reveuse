import React from "react";
import { Link } from "react-router-dom"; // Importing Link for routing

const HomeContact = () => {
  return (
    <div className="bg-gray-100 sm:rounded-t-[50px] rounded-t-[20px] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading with animation */}
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Got Questions? We're Here to Help!
        </h2>

        {/* Description text */}
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Whether you need assistance or just want to learn more, we’re happy to
          help. Reach out, and we'll guide you every step of the way.
        </p>

        {/* Contact Button */}
        <Link
          to="/contact" // Link to the contact page
          className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-xl rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:opacity-80">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default HomeContact;
