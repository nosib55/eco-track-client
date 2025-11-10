import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Contact() {
  // Handle fake submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !message) {
      toast.error("All fields are required!");
      return;
    }

    // Simulated success
    toast.success("✅ THANKS FOR MESSAGEING US !");
    e.target.reset();
  };

  return (
    <div className="min-h-[calc(100vh-160px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-5xl bg-white shadow-md rounded-2xl p-8 md:p-12 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">
          Contact EcoTrack
        </h1>

        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
          Have questions, feedback, or ideas? 🌿  
          We’d love to hear from you! Whether you’re joining a new challenge or just exploring eco-living,
          our team is here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message here..."
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-green-700">Get in Touch</h2>

            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-green-600" />
              <p>support@ecotrack.com</p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-green-600" />
              <p>+1 (555) 123-4567</p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-green-600" />
              <p>123 Green Street, Eco City, Earth</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-green-700 mb-2">Follow us</h3>
              <div className="flex gap-4 text-2xl">
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
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-sm text-gray-500">
          © 2025 EcoTrack — Together for a sustainable tomorrow 🌍
        </p>
      </div>
    </div>
  );
}
