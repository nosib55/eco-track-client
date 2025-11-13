import { useEffect, useState } from "react";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_BASE ;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API}/api/events?upcoming=true&limit=4`);
        const data = await res.json();
        setEvents(data.items || []);
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">
          Upcoming Events
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-5 bg-white rounded-lg shadow animate-pulse h-40"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h3 className="text-2xl font-semibold text-green-700 mb-4">
        Upcoming Events
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {events.map((e) => (
          <div key={e._id} className="bg-white shadow rounded-lg p-5">
            <h4 className="text-lg font-semibold text-gray-800">
              {e.title}
            </h4>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {e.description}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              📅 {new Date(e.date).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-500">
              📍 {e.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
