import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="min-h-[calc(100vh-160px)] bg-gray-50 dark:bg-gray-900 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 md:p-12 space-y-10">
        
        {/* Header */}
        <header className="space-y-3 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400">
            About EcoTrack
          </h1>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <strong>EcoTrack</strong> is a community-driven platform for
            eco-conscious people who want to live more sustainably.
            Join challenges, share knowledge, and track real environmental
            impact—together.
          </p>
        </header>

        {/* Mission */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400">
            🌱 Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            EcoTrack focuses on turning small, everyday actions into meaningful
            change. By tracking progress and connecting people, sustainability
            becomes measurable, motivating, and achievable.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400">
            💡 What You Can Do
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Join eco-friendly challenges and track progress.</li>
            <li>Share and discover sustainability tips.</li>
            <li>Explore local green events and initiatives.</li>
            <li>Measure personal environmental impact.</li>
          </ul>
        </div>

        {/* Community */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400">
            🤝 Community Impact
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Individual actions matter—but collective action creates real change.
            EcoTrack brings together people who care, making sustainability a
            shared journey rather than a solo effort.
          </p>
        </div>

        {/* Visual */}
        <div className="flex justify-center">
          <img
            src="/do-what.svg"
            alt="Eco-friendly community working together"
            className="rounded-xl shadow-md w-full max-w-lg bg-white dark:bg-gray-700 p-4"
          />
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            to="/register"
            className="inline-flex items-center justify-center
                       bg-green-600 hover:bg-green-700
                       text-white font-medium
                       px-8 py-3 rounded-lg
                       transition focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Join the EcoTrack Community
          </Link>
        </div>

        {/* Footer note */}
        <footer className="pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 EcoTrack — Together for a sustainable tomorrow 🌍
        </footer>
      </div>
    </section>
  );
}
