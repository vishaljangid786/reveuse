import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { images } from "../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleArrowClick = (direction) => {
    setCurrentIndex((prev) => (prev + direction + images.length) % images.length);
  };

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="w-full mx-auto mb-8">
      <div className="relative overflow-hidden shadow-2xl h-[500px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        {/* Slide Container with animation */}
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-full h-full relative">
              <motion.img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
                loading="lazy"
                variants={slideVariants}
                initial="initial"
                animate="center"
                exit="exit"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white flex items-end">
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{img.title}</h2>
                  <p className="text-sm sm:text-base md:text-lg mt-2">{img.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Arrows */}
        <button
          onClick={() => handleArrowClick(-1)}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full z-10 hover:bg-black/80 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleArrowClick(1)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full z-10 hover:bg-black/80 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-blue-500 w-5 scale-110" : "bg-gray-400 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
