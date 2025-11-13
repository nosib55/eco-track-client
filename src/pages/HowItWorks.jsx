// src/pages/Home/HowItWorks.jsx
import React from "react";

export default function HowItWorks() {
  return (
    <section className="bg-white py-10 text-center">
      <h2 className="text-2xl font-bold mb-6">How It Works</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        <div className="max-w-xs p-4 bg-green-50 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">1. Join a Challenge</h3>
          <p>Pick a sustainability challenge that fits your lifestyle.</p>
        </div>
        <div className="max-w-xs p-4 bg-green-50 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">2. Track Progress</h3>
          <p>Monitor your daily or weekly progress and impact metrics.</p>
        </div>
        <div className="max-w-xs p-4 bg-green-50 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">3. Share Tips</h3>
          <p>Share your eco-friendly habits to inspire others!</p>
        </div>
      </div>
    </section>
  );
}
