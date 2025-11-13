// src/components/home/ActiveChallenges.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * ActiveChallenges
 * - shows ongoing challenges only
 * - default limit = 4 (assignment requirement)
 * - tries server-side filter first (status=ongoing), otherwise fallback to client-side filter
 */
export default function ActiveChallenges({ limit = 4 }) {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const isOngoing = (c) => {
      try {
        const now = new Date();
        const s = c.startDate ? new Date(c.startDate) : null;
        const e = c.endDate ? new Date(c.endDate) : null;
        if (s && e) return s <= now && now <= e;
        return false;
      } catch {
        return false;
      }
    };

    const normalizeItems = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      if (data.items && Array.isArray(data.items)) return data.items;
      if (data.items && Array.isArray(data.items.items)) return data.items.items;
      return [];
    };

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // 1) try server-side ongoing filter
        const tryUrl = `${API}/api/challenges?status=ongoing&limit=${limit}`;
        const res = await fetch(tryUrl);

        if (res.ok) {
          const json = await res.json();
          const arr = normalizeItems(json);
          // if server returned useful data, use it
          if (arr.length > 0) {
            if (mounted) setChallenges(arr.slice(0, limit));
            return;
          }
        }

        // 2) fallback: fetch many and filter client-side
        const fallbackUrl = `${API}/api/challenges?limit=100`;
        const res2 = await fetch(fallbackUrl);
        if (!res2.ok) {
          throw new Error(`Failed to fetch challenges (status ${res2.status})`);
        }
        const json2 = await res2.json();
        const all = normalizeItems(json2);
        const ongoing = all.filter(isOngoing);
        // sort by soonest endDate (optional)
        ongoing.sort((a, b) => {
          const ea = a.endDate ? new Date(a.endDate).getTime() : Infinity;
          const eb = b.endDate ? new Date(b.endDate).getTime() : Infinity;
          return ea - eb;
        });
        if (mounted) setChallenges(ongoing.slice(0, limit));
      } catch (err) {
        console.error("ActiveChallenges fetch error:", err);
        if (mounted) setError("Failed to load active challenges.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, [API, limit]);

  const handleImgError = (e) => {
    e.currentTarget.src = "/placeholder.jpg";
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Active Challenges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow animate-pulse h-56" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Active Challenges</h3>
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Active Challenges</h3>
        <p className="text-gray-600">No active challenges right now.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-green-700">Active Challenges</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {challenges.map((c) => (
          <article key={c._id || c.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-56">
            <div className="h-36 bg-gray-100 overflow-hidden">
              <img
                src={c.imageUrl || c.image || "/placeholder.jpg"}
                alt={c.title}
                className="w-full h-full object-cover"
                onError={handleImgError}
              />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h4 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{c.title}</h4>
              <p className="text-sm text-gray-500 mb-2">{c.category || "General"}</p>

              <div className="text-sm text-gray-600 mb-3 flex gap-3 flex-wrap">
                <span className="px-2 py-1 bg-green-50 rounded text-xs">Duration: {c.duration ?? "N/A"} days</span>
                <span className="px-2 py-1 bg-green-50 rounded text-xs">Participants: {c.participants ?? 0}</span>
              </div>

              <div className="mt-auto">
                <Link to={`/challenges/${c._id || c.id}`} className="btn btn-sm btn-success text-white">
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
