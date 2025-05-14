import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../App";
import { Link } from "react-router-dom";
import AOS from "aos";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [visibleServices, setVisibleServices] = useState(6); // Track number of visible services

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services");
      }
    };

    fetchServices();
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Services Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, visibleServices).map((service) => (
          <Link
            to={`/services/${service._id}`}
            key={service._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl group"
            data-aos="fade-up">
            {service.imageUrl && (
              <img
                src={
                  service.imageUrl.startsWith("http")
                    ? service.imageUrl
                    : `${backendurl}${service.imageUrl}`
                }
                alt={service.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="group-hover:text-blue-600 transition-colors duration-300">
                →
              </p>
            </div>
          </Link>
        ))}

        {/* "No Services Found" */}
        {services.length === 0 && (
          <p className="text-center w-full col-span-full">No services found.</p>
        )}
      </div>

      {/* Load More Button */}
      {visibleServices >= 3 && visibleServices < services.length && (
        <div className="mt-6 text-center">
          <Link
            to="/services"
            className="px-6 py-2 text-xl border border-blue-600 text-white font-semibold hover:text-blue-600 hover:bg-transparent transition bg-blue-600">
            View All Services
          </Link>
        </div>
      )}
    </>
  );
};

export default ServiceList;
