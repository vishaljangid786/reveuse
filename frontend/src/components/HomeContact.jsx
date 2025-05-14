import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import bgPattern from "../assets/img8.webp";

const HomeContact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_qlhmbct",
        "template_3izuove",
        form.current,
        "McAGVU7aUYBO2XdG9"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          setSubmitted(true);
          setLoading(false);
          setTimeout(() => setSubmitted(false), 5000);
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
        }
      );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-r from-indigo-100 via-blue-100 to-pink-100"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}>
      <div className="bg-white/60 mulish backdrop-blur-md shadow-2xl rounded-3xl max-w-5xl w-full p-8 md:p-14 flex flex-col md:flex-row gap-10 border border-gray-300">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800">Let's Talk!</h2>
          <p className="text-gray-600 text-lg">
            Have a project or just want to connect? Fill out the form and we’ll
            be in touch soon.
          </p>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>📞 +91-1234567890</li>
            <li>📧 hello@example.com</li>
            <li>🏢 New Delhi, India</li>
          </ul>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2">
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

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 hover:to-indigo-500 hover:from-pink-500"
              } text-white font-bold py-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden group flex items-center justify-center`}>
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                  Sending...
                </>
              ) : (
                <>
                  <span className="relative z-10">Send Message</span>
                  <span className="absolute inset-0 bg-white opacity-10 group-hover:animate-ping rounded-lg"></span>
                </>
              )}
            </button>

            {/* Success Message */}
            {submitted && (
              <p className="text-green-700 bg-green-100 border border-green-400 p-3 rounded-lg text-sm text-center mt-3">
                ✅ Message sent successfully! We’ll get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
