import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqs } from "../assets/assets";
import Heading from "./Heading";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Heading text1="Frequently Asked" text2="Questions"/>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 `}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium focus:outline-none">
                <span
                  className={`${
                    isOpen ? "text-blue-600" : "text-gray-800"
                  } transition-colors mulish duration-300`}>
                  {faq.question}
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}>
                  <ChevronDown />
                </span>
              </button>
              <div
                className={`px-6 transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "max-h-60 opacity-100 py-4"
                    : "max-h-0 opacity-0 py-0"
                } overflow-hidden text-gray-600`}>
                <p className="transition-opacity mulish duration-300">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
