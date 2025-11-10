import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo + Text */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-green-700">EcoTrack</h2>
            <p className="text-sm text-gray-500">
              Tracking sustainability, one challenge at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <Link to="/about" className="hover:text-green-700 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-green-700 transition">
              Contact
            </Link>
            <Link to="/" className="hover:text-green-700 transition">
              Home
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          {/* Social icons */}
          <div className="flex gap-4 text-xl">
            <a href="#" className="text-blue-600 hover:text-blue-700" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-black hover:text-gray-700" aria-label="Twitter / X">
              <FaTwitter />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-center">
            © 2025 <span className="text-green-700 font-semibold">EcoTrack</span>.  
            All rights reserved.
          </p>

          {/* Accessibility & Privacy note */}
          <p className="text-xs text-gray-400 text-center md:text-right">
            Accessible • Privacy-friendly • Open for everyone 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
