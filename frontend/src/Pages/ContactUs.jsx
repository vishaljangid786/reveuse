import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Contact from "../assets/aeb332098d3a352c570beecb08b08d3f.webp"; // Adjust the path as necessary
import Seo from "../components/Seo";

const ContactUs = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_nvkapih",
        "template_j3t3y7c",
        form.current,
        "4K4NskaqVN57E6QZc"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset(); // <-- Clear form
          setSubmitted(true);
          setLoading(false);
          setTimeout(() => setSubmitted(false), 5000); // Optional: Hide after 5s
        },
        (error) => {
          console.log(error.text);
        }
      );
  };


  return (
    <div
      className="min-h-screen bg-cover   bg-no-repeat bg-center flex items-center justify-center px-6 py-12"
      style={{
        backgroundImage: `url(https://www.shutterstock.com/image-photo/contact-us-concept-hand-show-600nw-2503143861.jpg)`,
      }}>
      <Seo
        title="Contact Reveuse Solutions | Let's Build Something Great"
        description="Get in touch with the Reveuse Solutions team for custom digital solutions tailored to your business."
        keywords="contact Reveuse, IT support, business solutions, tech consultation"
        url="https://www.thereveuse.com/contact"
        image="https://www.thereveuse.com/assets/contact.jpg"
      />

      <div className="bg-white/30 rounded-3xl shadow-lg p-6 md:p-10 max-w-4xl w-full flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={Contact}
            alt="Contact"
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Send us a message and we'll get back to
            you shortly.
          </p>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center`}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                </span>
              ) : (
                "Send Message"
              )}
            </button>


            {submitted && (
              <div className="text-green-700 bg-green-100 border border-green-400 p-3 rounded-lg text-sm text-center mt-3">
                ✅ Message sent successfully! We’ll get back to you shortly.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
