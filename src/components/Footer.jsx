import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram,  } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-6 border-t">
      <div className="max-w-7xl mx-auto px-4">

        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <img src="/eco-nav.gif" alt="EcoTrack logo" className="h-16 mx-auto md:mx-0" />
            <p className="text-sm text-gray-500">
              Tracking sustainability, one challenge at a time.
            </p>
          </div>

          
          <div className="flex gap-6 text-sm">
            <Link className="hover:text-green-700 transition" to="/about">About</Link>
            <Link className="hover:text-green-700 transition" to="/contact">Contact</Link>
            <Link className="hover:text-green-700 transition" to="/">Home</Link>
          </div>
        </div>

        
        <hr className="my-4 border-gray-300" />

        
        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-4">

          
          <div className="flex gap-4 text-xl">
            <a className="hover:text-blue-700 transition" href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a className="hover:text-pink-700 transition" href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            
          </div>

          <p className="text-gray-500 text-center">
            © 2025 <span className="text-green-700 font-semibold">EcoTrack</span> — All rights reserved.
          </p>

          <p className="text-xs text-gray-400 text-center">
            Accessible • Privacy-friendly • Open for everyone 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
