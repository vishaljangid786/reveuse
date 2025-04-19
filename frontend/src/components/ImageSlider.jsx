import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../assets/assets";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="w-full mx-auto mb-5">
      <div className="relative overflow-hidden shadow-2xl h-[500px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex].src}
            src={images[currentIndex].src}
            alt={images[currentIndex].title}
            className="w-full h-full object-cover absolute"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="absolute flex items-end bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
          <div className="max-w-full">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold w-full md:w-4/5 leading-tight">
              {images[currentIndex].title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg mt-2 md:mt-4 w-full md:w-3/5">
              {images[currentIndex].desc}
            </p>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              i === currentIndex
                ? "bg-blue-500 w-5 scale-110"
                : "bg-gray-400 w-2"
            }`}></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
