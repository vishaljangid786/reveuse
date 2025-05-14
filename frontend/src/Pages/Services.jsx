import React, { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Heading from "../components/Heading";
import axios from "axios";
import AOS from "aos";
import { backendurl } from "../App";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Seo
        title="Services – Reveuse Solutions | Custom Web & App Development"
        description="Check out our professional services including web development, mobile apps, cloud solutions, and digital consulting."
        keywords="web development, IT services, cloud consulting, app development, digital solutions"
        url="https://www.thereveuse.com/services"
        image="https://www.thereveuse.com/assets/services.jpg"
      />
      <div data-aos="zoom-in">
        <Heading text1={"All"} text2={"Services"} />
      </div>
      <div className="mb-6 flex justify-end">
              <input
                type="text"
                placeholder="Search services..."
                data-aos="fade-left"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
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
                ))
              ) : (
                <p className="text-center w-full col-span-full">No services found.</p>
              )}
            </div>
    </div>
  );
};

export default Services;
