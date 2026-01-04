import React from "react";
import {
  FaLeaf,
  FaHeartbeat,
  FaBolt,
  FaUsers,
} from "react-icons/fa";

export default function WhyGoGreen() {
  return (
    <section className="bg-green-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-8">
          Why Go Green?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div
            className="
              group bg-white rounded-xl p-6
              shadow-sm border border-green-100
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-green-100
            "
          >
            <FaLeaf className="text-4xl text-green-600 mb-3 mx-auto group-hover:scale-110 transition" />
            <p className="text-gray-700 font-medium">
              Reduce pollution and preserve natural resources.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
              group bg-white rounded-xl p-6
              shadow-sm border border-green-100
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-green-100
            "
          >
            <FaHeartbeat className="text-4xl text-green-600 mb-3 mx-auto group-hover:scale-110 transition" />
            <p className="text-gray-700 font-medium">
              Improve health by reducing waste and toxins.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="
              group bg-white rounded-xl p-6
              shadow-sm border border-green-100
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-green-100
            "
          >
            <FaBolt className="text-4xl text-green-600 mb-3 mx-auto group-hover:scale-110 transition" />
            <p className="text-gray-700 font-medium">
              Save energy and money through efficient living.
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="
              group bg-white rounded-xl p-6
              shadow-sm border border-green-100
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-green-100
            "
          >
            <FaUsers className="text-4xl text-green-600 mb-3 mx-auto group-hover:scale-110 transition" />
            <p className="text-gray-700 font-medium">
              Inspire others to build a sustainable community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
