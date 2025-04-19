import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 text-center sm:text-left py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center sm:justify-left  justify-center gap-3 mb-4">
            <img src={logo} alt="The Reveuse Logo" className="w-20" />
            <h2 className="text-xl font-bold leading-tight">
              The RÊVEUSE Solution
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            Empowering Your Digital Dreams
          </p>
        </div>

        {/* Address & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-400">
            Head Office
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Udaipur, Rajasthan, <br />
            INDIA
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-1 text-blue-400">
            Contact
          </h3>
          <p className="text-sm text-gray-300">info@thereveuse.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/services"
                className="hover:text-blue-300 transition duration-200">
                Services
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-300 transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-300 transition duration-200">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-400">
            Follow Us
          </h3>
          <div className="flex justify-center sm:justify-start space-x-5 text-2xl mt-3">
            <a href="#" aria-label="X" className="hover:text-blue-300">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-500">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-sm py-4 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} The RÊVEUSE. All rights reserved.
          </p>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
            <a href="/terms" className="hover:text-blue-300">
              Terms & Conditions
            </a>
            <a href="/privacy" className="hover:text-blue-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
