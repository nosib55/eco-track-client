import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ActiveChallenges({ limit = 6 }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_BASE;

  /* ---------------- Helpers ---------------- */

  const normalizeToArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.data)) return data.data;
    if (data.items && Array.isArray(data.items.items)) return data.items.items;
    if (data._id || data.title) return [data];
    return [];
  };

  const isOngoing = (challenge) => {
    try {
      const now = new Date();
      const start = challenge.startDate && new Date(challenge.startDate);
      const end = challenge.endDate && new Date(challenge.endDate);
      return start && end ? start <= now && now <= end : false;
    } catch {
      return false;
    }
  };

  /* ---------------- Fetch ---------------- */

  useEffect(() => {
    let mounted = true;

    const fetchActiveChallenges = async () => {
      setLoading(true);
      setError("");

      // 1️⃣ Primary API (preferred)
      try {
        const res = await fetch(
          `${API}/api/challenges?status=ongoing&limit=${limit}`
        );
        if (res.ok) {
          const data = await res.json();
          const normalized = normalizeToArray(data);
          if (normalized.length && mounted) {
            setChallenges(normalized.slice(0, limit));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Primary active challenge fetch failed", err);
      }

      // 2️⃣ Fallback API
      try {
        const res = await fetch(`${API}/api/challenges?limit=100`);
        if (!res.ok) throw new Error("Fallback fetch failed");
        const data = await res.json();
        const ongoing = normalizeToArray(data).filter(isOngoing);
        if (mounted) setChallenges(ongoing.slice(0, limit));
      } catch (err) {
        console.error("Fallback challenge fetch failed", err);
        if (mounted) setError("Failed to load active challenges.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchActiveChallenges();
    return () => (mounted = false);
  }, [API, limit]);

  /* ---------------- UI States ---------------- */

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <header className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400">
          Active Challenges
        </h3>
        <Link
          to="/challenges"
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          View all
        </Link>
      </header>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow animate-pulse"
            >
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
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
        <div className="text-center space-y-3">
          <p className="text-gray-600 dark:text-gray-400">
            No active challenges right now.
          </p>
          <Link to="/challenges" className="btn btn-outline btn-success">
            Browse all challenges
          </Link>
        </div>
      )}

      {/* Data */}
      {!loading && !error && challenges.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {challenges.map((c) => (
            <article
              key={c._id || c.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
            >
              <div className="h-44 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img
                  src={c.imageUrl || c.image || "/placeholder.jpg"}
                  alt={c.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                  {c.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {c.category || "General"}
                </p>

                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded">
                    Duration: {c.duration ?? "N/A"} days
                  </span>
                  <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded">
                    Participants: {c.participants ?? 0}
                  </span>
                </div>

                <Link
                  to={`/challenges/${c._id || c.id}`}
                  className="btn btn-sm btn-success mt-auto text-white"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
