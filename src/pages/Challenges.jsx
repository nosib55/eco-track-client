// src/pages/Challenges.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Challenges() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 9; // Number of challenges per page

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API}/api/challenges?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to load challenges");

        const data = await res.json();

        setChallenges(data.items || []);
        setPages(data.pages || 1);
      } catch (err) {
        console.error("Challenges fetch error:", err);
        setError("Failed to load challenges.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [API, page]);

  /* --------------------------
        LOADING STATE
  --------------------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Challenges</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="bg-white p-4 shadow rounded-lg animate-pulse">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* --------------------------
        ERROR STATE
  --------------------------- */
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  /* --------------------------
        EMPTY STATE
  --------------------------- */
  if (challenges.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl">No challenges available.</h2>
      </div>
    );
  }

  /* --------------------------
        MAIN UI RENDER
  --------------------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Challenges</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <article key={c._id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100">
              <img
                src={c.imageUrl || c.image || "/placeholder.jpg"}
                alt={c.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{c.title}</h3>

              <p className="text-gray-600 text-sm mt-1">{c.category || "General"}</p>

              <p className="text-gray-500 text-xs mt-2">
                Duration: {c.duration} days • Participants: {c.participants ?? 0}
              </p>

              <Link
                to={`/challenges/${c._id}`}
                className="btn btn-success btn-sm mt-4 text-white w-full"
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-outline btn-sm"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {page} of {pages}
        </span>

        <button
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
          className="btn btn-outline btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
