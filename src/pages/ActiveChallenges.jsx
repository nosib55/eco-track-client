import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ActiveChallenges({ limit = 6 }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_BASE ;

  useEffect(() => {
    let mounted = true;

    const normalizeToArray = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.items)) return data.items;
      if (Array.isArray(data.data)) return data.data;

      if (data.items && Array.isArray(data.items.items)) return data.items.items;

      if (data._id || data.title) return [data];
      return [];
    };

    const isOngoing = (c) => {
      try {
        const now = new Date();
        const s = c.startDate ? new Date(c.startDate) : null;
        const e = c.endDate ? new Date(c.endDate) : null;
        if (s && e) return s <= now && now <= e;
        return false;
      } catch (err) {
        return false;
      }
    };

    const fetchActive = async () => {
      setLoading(true);
      setError("");
      console.log("[ActiveChallenges] API base:", API);

      try {
        const url1 = `${API}/api/challenges?status=ongoing&limit=${limit}`;
        console.log("[ActiveChallenges] Trying server-side ongoing URL:", url1);
        const res1 = await fetch(url1);
        console.log("[ActiveChallenges] server resp status:", res1.status);
        if (res1.ok) {
          const data1 = await res1.json().catch(() => null);
          console.log("[ActiveChallenges] server response shape:", data1);
          const arr1 = normalizeToArray(data1);
          if (arr1.length > 0) {
            if (mounted) setChallenges(arr1.slice(0, limit));
            setLoading(false);
            return;
          } else {
            console.log("[ActiveChallenges] server returned OK but no items for status=ongoing, will fallback");
          }
        } else {
          console.warn("[ActiveChallenges] server returned non-OK for status=ongoing:", res1.status);
        }
      } catch (err) {
        console.error("[ActiveChallenges] error fetching status=ongoing:", err);
      }

      try {
        const url2 = `${API}/api/challenges?limit=100`;
        console.log("[ActiveChallenges] Fallback URL:", url2);
        const res2 = await fetch(url2);
        console.log("[ActiveChallenges] fallback resp status:", res2.status);
        if (!res2.ok) throw new Error(`fallback fetch failed ${res2.status}`);
        const data2 = await res2.json();
        console.log("[ActiveChallenges] fallback response shape:", data2);

        const arr2 = normalizeToArray(data2);
        if (!arr2 || arr2.length === 0) {
          throw new Error("no challenges returned by fallback");
        }

        const ongoing = arr2.filter(isOngoing);
        console.log(`[ActiveChallenges] found ${ongoing.length} ongoing (client-filtered)`);
        if (mounted) setChallenges(ongoing.slice(0, limit));
      } catch (err) {
        console.error("[ActiveChallenges] fallback error:", err);
        if (mounted) setError("Failed to load active challenges.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchActive();
    return () => (mounted = false);
  }, [API, limit]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Active Challenges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow animate-pulse">
              <div className="h-40 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Active Challenges</h3>
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Active Challenges</h3>
        <p className="text-gray-600">No active challenges at the moment. Check back later.</p>
        <div className="mt-4">
          <Link to="/challenges" className="btn btn-outline btn-success">Browse all challenges</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-green-700">Active Challenges</h3>
        <Link to="/challenges" className="text-sm text-gray-600 hover:underline">View all challenges</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <article key={c._id || c.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <div className="h-44 md:h-52 bg-gray-100 overflow-hidden">
              <img
                src={c.imageUrl || c.image || "/placeholder.jpg"}
                alt={c.title}
                className="w-full h-full object-contain"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
              />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h4 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{c.title}</h4>
              <p className="text-sm text-gray-500 mb-2">{c.category || "General"}</p>

              <div className="text-sm text-gray-600 mb-3 flex gap-3 flex-wrap">
                <span className="px-2 py-1 bg-green-50 rounded text-xs">Duration: {c.duration ?? "N/A"} days</span>
                <span className="px-2 py-1 bg-green-50 rounded text-xs">Participants: {c.participants ?? 0}</span>
              </div>

              <div className="mt-auto flex items-center">
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
