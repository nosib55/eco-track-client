import { useEffect, useState } from "react";

export default function LiveStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_BASE ;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API}/api/stats`);
        if (!res.ok) throw new Error("Failed to load stats");

        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError("Unable to load community statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 py-10">{error}</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Live Community Statistics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="stat shadow rounded-lg bg-white p-5 text-center">
          <p className="text-3xl font-bold text-green-700">
            {stats.totalChallenges}
          </p>
          <p className="text-gray-600 text-sm">Challenges</p>
        </div>

        <div className="stat shadow rounded-lg bg-white p-5 text-center">
          <p className="text-3xl font-bold text-green-700">{stats.totalTips}</p>
          <p className="text-gray-600 text-sm">Tips</p>
        </div>

        <div className="stat shadow rounded-lg bg-white p-5 text-center">
          <p className="text-3xl font-bold text-green-700">
            {stats.totalEvents}
          </p>
          <p className="text-gray-600 text-sm">Upcoming Events</p>
        </div>

        <div className="stat shadow rounded-lg bg-white p-5 text-center">
          <p className="text-3xl font-bold text-green-700">
            {stats.totalUsers}
          </p>
          <p className="text-gray-600 text-sm">Participants</p>
        </div>
      </div>
    </section>
  );
}
