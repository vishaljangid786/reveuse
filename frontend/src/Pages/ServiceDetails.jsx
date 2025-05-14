import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../App";
import Heading from "../components/Heading";
import Seo from "../components/Seo";
import TabSlider from "../components/TabSlider";

export const serviceImages = [
  "https://imgs.search.brave.com/nG1XXrjBGwj_rWKgiJkqEsDlf4PbjUpJ0kzu9eRx4Ag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvRnJl/ZVBob3Rvcy9GcmVl/LVBob3RvLTc0MHg0/OTItMTc0NDkxNTMz/My5qcGc",
  "https://imgs.search.brave.com/Y2rH-Z9a2_btluX3LhROUI7M7jGi_vhClrX3FnB4yVA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w",
];

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isImageOpen, setIsImageOpen] = useState(false);
  const assignedImage =
    serviceImages[parseInt(service?._id.slice(-2), 16) % serviceImages.length];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/services/${id}`);
        setService(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading service...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Seo
          title={`${service.title} – Service by Reveuse Solutions`}
          description={service.description.slice(0, 150)}
          keywords={`${service.name}, IT services, Reveuse`}
          url={`https://www.thereveuse.com/services/${service._id}`}
          image={service.image}
        />

        <Heading text1={"Service"} text2={"Details"} />

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline">
          ← Back
        </button>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
          {service.imageUrl && (
            <div className="relative group">
              <img
                src={
                  service.imageUrl.startsWith("http")
                    ? service.imageUrl
                    : `${backendurl}${service.imageUrl}`
                }
                alt={service.title}
                className="w-full h-64 object-cover rounded-md cursor-pointer"
                onClick={() => setIsImageOpen(true)}
              />
              <button
                onClick={() => setIsImageOpen(true)}
                className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition">
                <i className="fa-solid fa-expand"></i>
              </button>
            </div>
          )}
          {isImageOpen && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
              <div className="relative max-w-6xl w-full mx-4">
                <img
                  src={
                    service.imageUrl.startsWith("http")
                      ? service.imageUrl
                      : `${backendurl}${service.imageUrl}`
                  }
                  alt="Full screen"
                  className="w-full max-h-[90vh] object-contain rounded-lg"
                />
                <button
                  onClick={() => setIsImageOpen(false)}
                  className="absolute top-4 right-4 bg-white text-black px-2 py-1 rounded-full shadow-md hover:bg-red-600 hover:text-white transition">
                  ✕
                </button>
              </div>
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800">{service.title}</h1>
          <p className="text-gray-700 text-lg mulish whitespace-pre-line">
            {service.description}
          </p>
        </div>
      </div>
      {service.details && service.details.length > 0 && (
        <section
          className="relative py-14 px-4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${assignedImage}')`,
          }}>
          {/* Overlay to darken background */}
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          <div className="relative max-w-7xl mx-auto z-10">
            <Heading text1={"Service"} text2={"Details"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.details.map((detail, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                  <h3 className="text-lg font-semibold text-center text-blue-500">
                    {detail.head}
                  </h3>
                  <p className="text-white/90 text-sm text-center leading-relaxed">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <TabSlider />
    </>
  );
};

export default ServiceDetails;
