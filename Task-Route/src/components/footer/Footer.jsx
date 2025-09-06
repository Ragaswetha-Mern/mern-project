import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center">
        <img
          src="/images/logofooter.png"
          alt="Logo"
          className="h-10 w-10 mb-2"
        />
        <span className="text-2xl font-bold text-white-800 text-center">
          Swetha<span className="text-blue-600">Mart</span>
        </span>
        <p className="text-sm text-gray-400 text-center mt-2">
          Sydney Homebush, Australia
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500"
          >
            <i className="fab fa-facebook-f text-xl bg-white-500"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-700"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>
        <p className="text-sm text-gray-400 text-center mt-4">
          © 2025 SwethaMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
