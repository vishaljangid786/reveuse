import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { services } from "../assets/assets";
import { div } from "framer-motion/client";
import Heading from "./Heading";


const HomeServices = () => {
  return (
    <div>
      <Heading text1="Our" text2="Services" toggle="true" />
      <div className="py-16 bg-gray-50">
        <div className="flex flex-wrap gap-6 max-w-7xl mx-auto px-4 justify-center">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="group block w-[400px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {service.title}
                </h3>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-blue-600 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeServices;
