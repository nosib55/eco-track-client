import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-[calc(100vh-160px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-5xl bg-white shadow-md rounded-2xl p-8 md:p-12 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center">
          About EcoTrack
        </h1>

        <p className="text-gray-700 leading-relaxed text-center">
          <strong>EcoTrack</strong> is a community platform designed for
          eco-conscious individuals who want to live more sustainably.
          We make it easy to <span className="text-green-700 font-semibold">
          join challenges</span>, <span className="text-green-700 font-semibold">share tips</span>,
          and <span className="text-green-700 font-semibold">track your personal environmental impact</span>.
          Together, we’re building a greener future — one action at a time.
        </p>

        {/* Mission Section */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-700">
            🌱 Our Mission
          </h2>
          <p className="text-gray-700">
            Our goal is to inspire small, everyday changes that make a big
            difference. EcoTrack helps you measure your environmental impact,
            connect with like-minded people, and take part in challenges that
            protect our planet.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-700">
            💡 What You Can Do on EcoTrack
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Join sustainability challenges and track your progress.</li>
            <li>Discover eco-friendly tips shared by the community.</li>
            <li>Browse local green events and participate in initiatives.</li>
            <li>Monitor your environmental impact and personal achievements.</li>
          </ul>
        </div>

        {/* Community */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-700">
            🤝 Why Community Matters
          </h2>
          <p className="text-gray-700">
            Change is easier when we do it together. EcoTrack connects people
            who care about sustainability — so every small step adds up to a
            huge collective impact.
          </p>
        </div>

        {/* Optional image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80"
            alt="Eco community"
            className="rounded-xl shadow-md w-full max-w-lg"
          />
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/register"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Join the EcoTrack Community
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 pt-4">
          © 2025 EcoTrack — Together for a sustainable tomorrow 🌍
        </p>
      </div>
    </div>
  );
}
