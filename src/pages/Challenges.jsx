import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Challenges() {
  const API = import.meta.env.VITE_API_BASE;

  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("latest");

  const limit = 9;

  /* ---------------- Fetch ---------------- */
  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      setError("");

      let apiSort = "-createdAt";
      if (sort === "oldest") apiSort = "createdAt";
      if (sort === "a-z") apiSort = "title";
      if (sort === "z-a") apiSort = "-title";
      if (sort === "most-participants") apiSort = "-participants";

      try {
        const res = await fetch(
          `${API}/api/challenges?page=${page}&limit=${limit}&sort=${apiSort}`
        );
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setChallenges(data.items || []);
        setPages(data.pages || 1);
      } catch (err) {
        setError("Failed to load challenges.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [API, page, sort]);

  /* ---------------- UI ---------------- */

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
          Explore Challenges
        </h1>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Sort by
          </label>
          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">Title (A–Z)</option>
            <option value="z-a">Title (Z–A)</option>
            <option value="most-participants">Most Participants</option>
          </select>
        </div>
      </header>

      {/* Loading */}
      {loading && (
        <div className="py-16">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-center text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Empty */}
      {!loading && !error && challenges.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="text-gray-600 dark:text-gray-400">
            No challenges available right now.
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && challenges.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {challenges.map((c) => (
              <article
                key={c._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                <div className="h-52 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={c.imageUrl || c.image || "/placeholder.jpg"}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src = "/placeholder.jpg")
                    }
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                    {c.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {c.category || "General"}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Duration: {c.duration ?? "N/A"} days • Participants:{" "}
                    {c.participants ?? 0}
                  </p>

                  <Link
                    to={`/challenges/${c._id}`}
                    className="btn btn-success btn-sm mt-auto text-white w-full"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="btn btn-outline btn-sm"
            >
              Prev
            </button>

            <span className="text-sm font-medium">
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
        </>
      )}
    </section>
  );
}
