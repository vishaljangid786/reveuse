import React from "react";

const Heading = ({ text1, text2,toggle }) => {
  return (
    <div className="text-center my-10 px-4">
      <h2 className="text-3xl cursor-pointer md:text-4xl lg:text-5xl font-extrabold relative inline-block group tracking-tight">
        <span className="text-blue-600">{text1}</span>{" "}
        <span className="text-gray-800">{text2}</span>
        <div className="h-1 w-0 bg-blue-500 mt-2 transition-all duration-500 group-hover:w-full mx-auto rounded-full"></div>
      </h2>

      {toggle == "true" && (
        <p className="text-gray-500 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
          Empowering{" "}
          <span className="text-blue-600 font-medium">innovation</span>,
          embracing{" "}
          <span className="text-blue-600 font-medium">technology</span>, and
          delivering{" "}
          <span className="text-blue-600 font-medium">transformational</span>{" "}
          results — we build the future,{" "}
          <span className="italic text-gray-700">together</span>.
        </p>
      )}
      {toggle === "company" && (
        <p className="max-w-5xl mx-auto mt-4 text-xl text-gray-600">
          At The Reveuse Solution, excellence is our guiding principle. As a
          global leader in business process outsourcing, we leverage our diverse
          expertise and innovative approach to deliver tailored solutions that
          drive business transformation. Whether you're a startup or an
          established enterprise, we adapt our services to address your unique
          challenges and aspirations. Our approach extends beyond traditional
          process management, focusing on empowering your business through.
        </p>
      )}
    </div>
  );
};

export default Heading;
