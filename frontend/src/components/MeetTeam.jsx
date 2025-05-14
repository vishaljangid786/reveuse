import React, { useEffect } from 'react'

import img1 from "../assets/founder.webp";
import img2 from "/Dangi.jpeg";

import AOS from "aos";
import "aos/dist/aos.css";
import Heading from './Heading';

const MeetTeam = () => {


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="my-16" data-aos="fade-up">
      <Heading text1="Meet" text2="Our Team" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
        {/* Founder */}
        <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition">
          <img
            src={img1}
            alt="Kamlesh Dangi"
            className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="font-bold text-lg text-gray-800">Kamlesh Dangi</h3>
          <p className="text-blue-600 text-sm">Founder & CEO</p>
        </div>

        {/* Head of Ops */}
        <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition">
          <img
            src={img2}
            alt="R Dangi"
            className="w-48 h-48 rounded-full mx-auto mb-4 object-cover object-top"
          />
          <h3 className="font-bold text-lg text-gray-800">VS Sukhwal</h3>
          <p className="text-blue-600 text-sm">Head of Operations</p>
        </div>
      </div>
    </div>
  );
}

export default MeetTeam