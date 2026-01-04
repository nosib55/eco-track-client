import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div
      className="
        min-h-[calc(100vh-160px)]
        flex flex-col items-center justify-center text-center px-4
        bg-gradient-to-br from-green-50 to-white
        dark:from-gray-900 dark:to-gray-800
      "
    >
      {/* Icon */}
      <div className="mb-4 text-green-600 dark:text-green-400 text-5xl">
        <FaExclamationTriangle />
      </div>

      {/* Title */}
      <h1 className="text-6xl font-extrabold text-green-700 dark:text-green-400 mb-3">
        404
      </h1>

      {/* Message */}
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* CTA */}
      <Link
        to="/"
        className="
          inline-flex items-center gap-2
          px-6 py-3 rounded-full
          bg-green-600 text-white
          shadow-md transition-all duration-300
          hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5
        "
      >
        <FaHome />
        Go Home
      </Link>

      {/* Subtle hover accent */}
      <div className="mt-10 w-16 h-1 bg-green-600 rounded-full opacity-60" />
    </div>
  );
}
