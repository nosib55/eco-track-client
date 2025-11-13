import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner"; 

export default function Challenges() {
  const API = import.meta.env.VITE_API_BASE ;

  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("latest"); // 🔥 new sort state

  const limit = 9;

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      setError("");

      // 🔥 convert sort option into API sort format
      let apiSort = "-createdAt"; // default latest

      if (sort === "oldest") apiSort = "createdAt";
      if (sort === "a-z") apiSort = "title";
      if (sort === "z-a") apiSort = "-title";
      if (sort === "most-participants") apiSort = "-participants";

      try {
        const res = await fetch(
          `${API}/api/challenges?page=${page}&limit=${limit}&sort=${apiSort}`
        );
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
  }, [API, page, sort]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Challenges</h2>
        <LoadingSpinner />
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  /* ------------------------
       NO DATA
  ------------------------- */
  if (challenges.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl">No challenges available.</h2>
      </div>
    );
  }

  /* ------------------------
       MAIN UI
  ------------------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">Challenges</h2>

        {/* 🔥 Sort Dropdown */}
        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1); // reset to first page
          }}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">Title: A → Z</option>
          <option value="z-a">Title: Z → A</option>
          <option value="most-participants">Most Participants</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <article key={c._id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-gray-100w-full h-56 overflow-hidden">
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
