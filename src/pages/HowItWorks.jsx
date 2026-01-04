// src/pages/Home/HowItWorks.jsx
import React from "react";

export default function HowItWorks() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Start your sustainability journey in three simple and effective steps.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div
            className="
              p-6 rounded-2xl border border-green-100 dark:border-green-900/40
              bg-gradient-to-br from-green-50 to-white
              dark:from-green-900/20 dark:to-gray-800
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-gradient-to-br hover:from-green-100 hover:to-green-50
              dark:hover:from-green-800/30 dark:hover:to-gray-700
            "
          >
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
              1. Join a Challenge
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Pick a sustainability challenge that matches your lifestyle and goals.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="
              p-6 rounded-2xl border border-green-100 dark:border-green-900/40
              bg-gradient-to-br from-green-50 to-white
              dark:from-green-900/20 dark:to-gray-800
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-gradient-to-br hover:from-green-100 hover:to-green-50
              dark:hover:from-green-800/30 dark:hover:to-gray-700
            "
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
              2. Track Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Monitor your daily or weekly progress and see measurable impact.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="
              p-6 rounded-2xl border border-green-100 dark:border-green-900/40
              bg-gradient-to-br from-green-50 to-white
              dark:from-green-900/20 dark:to-gray-800
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-gradient-to-br hover:from-green-100 hover:to-green-50
              dark:hover:from-green-800/30 dark:hover:to-gray-700
            "
          >
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
              3. Share & Inspire
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Share eco-friendly habits and inspire others to join the movement.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
