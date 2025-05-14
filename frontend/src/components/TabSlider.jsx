import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "./Heading";

const tabs = [
  {
    id: "Data Security",
    title: "Data Security",
    image: "/images/slide1.webp",
    description:
      "Ensuring the security and privacy of your data is our top priority. We implement robust security measures to protect your information.",
  },
  {
    id: "Tools & Technologies",
    title: "Tools & Technologies",
    image: "/images/slide1.webp",
    description: "Innovative tools and technologies for smart waste management.",
  },
  {
    id: "Expert Team",
    title: "Expert Team",
    image: "/images/slide1.webp",
    description:
      "Smart waste management systems for a cleaner environment. We provide innovative solutions to optimize waste collection and recycling.",
  },
  {
    id: "World-class Infrastructure",
    title: "World-class Infrastructure",
    image: "/images/slide1.webp",
    description:
      "Our team of experts is dedicated to providing top-notch solutions. We are here to help you every step of the way.",
  },
];

const TabSlider = () => {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Heading text1={"Smart"} text2={"Solutions"} />
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 w-fit mx-auto rounded-full shadow bg-slate-50 p-1 px-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative">
            <button
              onClick={() => setSelected(tab)}
              className={`px-4 py-2 font-medium rounded-full mulish z-10 relative ${
                selected.id === tab.id
                  ? "text-white"
                  : "text-gray-600 hover:text-black"
              }`}>
              {tab.title}
            </button>
            {/* Burst Background */}
            {selected.id === tab.id && (
              <motion.div
                layoutId="burst"
                className="absolute inset-0 bg-blue-500 rounded-full -z-0"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6 items-center bg-white border-b-3 border-blue-500 rounded-2xl p-6">
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-500 mb-2">{selected.title}</h2>
              <p className="text-gray-600 mulish">{selected.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabSlider;
