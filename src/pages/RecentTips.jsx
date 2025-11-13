// src/components/home/RecentTips.jsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function RecentTips({ limit = 5 }) {
  const API = import.meta.env.VITE_API_BASE ;
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchTips = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${API}/api/tips?limit=${limit}`;
        const res = await fetch(url);
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(txt || `Server error ${res.status}`);
        }
        const json = await res.json();
        // server returns { items: [...] } per server implementation
        const items = Array.isArray(json) ? json : json?.items || [];
        if (mounted) setTips(items);
      } catch (err) {
        console.error("[RecentTips] fetch error:", err);
        if (mounted) setError("Failed to load tips.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTips();
    return () => (mounted = false);
  }, [API, limit]);

  const handleUpvote = async (tipId, idx) => {
    // optimistic update
    const prev = [...tips];
    prev[idx] = { ...prev[idx], upvotes: (prev[idx].upvotes || 0) + 1 };
    setTips(prev);

    try {
      const res = await fetch(`${API}/api/tips/${encodeURIComponent(tipId)}/upvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      toast.success("Upvoted ✅");
    } catch (err) {
      console.error("Upvote error:", err);
      // rollback
      setTips((t) => t.map((tt, i) => (i === idx ? { ...tt, upvotes: Math.max((tt.upvotes || 1) - 1, 0) } : tt)));
      toast.error("Could not upvote. Try again.");
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Recent Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
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
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Recent Tips</h3>
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (!tips || tips.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Recent Tips</h3>
        <p className="text-gray-600">No tips yet — be the first to share a tip!</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-green-700">Recent Tips</h3>
        <Link to="/tips" className="text-sm text-gray-600 hover:underline">See all tips</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tips.map((t, idx) => (
          <article key={t._id || t.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">{t.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  by <span className="font-medium text-gray-700">{t.authorName || t.author || "Community"}</span>
                  <span className="text-gray-400"> • </span>
                  <span className="text-xs">{new Date(t.createdAt).toLocaleDateString()}</span>
                </p>
              </div>

              <div className="text-right">
                <button
                  onClick={() => handleUpvote(t._id || t.id, idx)}
                  className="btn btn-ghost btn-sm"
                  aria-label="Upvote tip"
                >
                  👍 <span className="ml-2">{t.upvotes ?? 0}</span>
                </button>
              </div>
            </div>

            <p className="text-gray-700 mt-3 line-clamp-3">{t.content || ""}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
