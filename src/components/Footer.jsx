import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="text-center md:text-left space-y-1">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start gap-2
                         text-xl font-bold tracking-wide
                         text-green-700 dark:text-green-400"
            >
              <span className="text-2xl">♻️</span>
              <span>EcoTrack</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tracking sustainability, one challenge at a time.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex gap-6 text-sm">
            <Link
              to="/"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 dark:border-gray-700" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          {/* Social */}
          <div className="flex gap-4 text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-500 hover:text-pink-600 transition"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 dark:text-gray-400 text-center">
            © 2025 <span className="font-semibold text-green-700 dark:text-green-400">
              EcoTrack
            </span>{" "}
            — All rights reserved.
          </p>

          {/* Note */}
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Accessible • Privacy-friendly • Open for everyone 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
