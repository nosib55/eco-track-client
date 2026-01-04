import { useEffect, useState } from "react";

export default function LiveStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API}/api/stats`);
        if (!res.ok) throw new Error("Failed to load stats");

        const data = await res.json();
        setStats(data);
      } catch {
        setError("Unable to load community statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API]);

  /* ---------- States ---------- */

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-14 text-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 dark:text-red-400 py-14">
        {error}
      </p>
    );
  }

  /* ---------- UI ---------- */

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center mb-10">
        Live Community Statistics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Card */}
        <StatBox value={stats.totalChallenges} label="Challenges" />
        <StatBox value={stats.totalTips} label="Tips" />
        <StatBox value={stats.totalEvents} label="Upcoming Events" />
        <StatBox value={stats.totalUsers} label="Participants" />

      </div>
    </section>
  );
}

/* ---------- Reusable Stat Box ---------- */

function StatBox({ value, label }) {
  return (
    <div
      className="
        group p-6 rounded-xl text-center
        bg-white dark:bg-gray-800
        border border-gray-100 dark:border-gray-700
        shadow-sm transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        hover:bg-green-50 dark:hover:bg-green-900/20
      "
    >
      <p className="text-3xl font-bold text-green-700 dark:text-green-400 transition-colors">
        {value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {label}
      </p>

      {/* subtle hover line */}
      <div className="mt-4 h-1 w-0 bg-green-600 mx-auto rounded-full transition-all duration-300 group-hover:w-10" />
    </div>
  );
}
