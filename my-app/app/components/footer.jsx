// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2 text-blue-300">Safar</h2>
            <p className="text-blue-200">
              Your reliable partner for all your travel and car booking needs.
              Explore with ease and convenience.
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:underline text-blue-200 hover:text-blue-100"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline text-blue-200 hover:text-blue-100"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline text-blue-200 hover:text-blue-100"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline text-blue-200 hover:text-blue-100"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">
              Contact Us
            </h3>
            <p className="text-blue-200">1234 Travel Lane</p>
            <p className="text-blue-200">City, State, 12345</p>
            <p className="text-blue-200">Email: contact@safar.com</p>
            <p className="text-blue-200">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-4 text-center">
          <p className="text-blue-200 text-sm">
            © 2024 Safar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
