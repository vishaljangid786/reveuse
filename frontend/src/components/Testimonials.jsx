
import { motion } from "framer-motion";
import { img1 } from "../assets/assets"; // Update with the correct image path

const Testimonial = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-50 max-w-4xl mx-auto my-12 p-8 rounded-xl shadow-md border-t-4 border-indigo-500">
      {/* Image section */}
      <div className="flex justify-center mb-6">
        <img
          src={img1} // Update path to your image
          alt="Frankie B."
          className="w-52 h-52 object-cover rounded-full border-2 border-gray-200 hover:border-indigo-500 transition duration-300 ease-in-out"
        />
      </div>

      {/* Testimonial Content */}
      <div className="text-center">
        <div className="text-5xl text-gray-300 mb-4">“</div>
        <p className="text-lg text-gray-600 font-semibold italic leading-relaxed mb-6">
          I can't express how grateful I am to The Reveuse for their exceptional
          service in the merchant cash advance sector. Their expertise and
          dedication ensured that my business was always prioritized, making
          everything so effortless.
        </p>
        <p className="text-md text-gray-800 font-medium">— Frankie B.</p>
      </div>
    </motion.div>
  );
};

export default Testimonial;
