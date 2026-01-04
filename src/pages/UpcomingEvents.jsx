import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegCalendarCheck } from "react-icons/fa";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_BASE;

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

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">
          Upcoming Events
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-5 bg-white rounded-xl shadow animate-pulse h-40"
            />
          ))}
        </div>
      </section>
    );
  }

  /* ---------- Empty ---------- */
  if (!events || events.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10 text-center">
        <FaRegCalendarCheck className="mx-auto text-4xl text-green-600 mb-3" />
        <h3 className="text-2xl font-semibold text-green-700 mb-2">
          Upcoming Events
        </h3>
        <p className="text-gray-600">
          No upcoming events at the moment. Check back soon!
        </p>
      </section>
    );
  }

  /* ---------- UI ---------- */
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h3 className="text-2xl font-semibold text-green-700 mb-6">
        Upcoming Events
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {events.map((e) => (
          <article
            key={e._id}
            className="
              group bg-white rounded-xl p-5
              border border-gray-100
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-green-50
            "
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {e.title}
            </h4>

            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {e.description}
            </p>

            <div className="space-y-1 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                {new Date(e.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                {e.location}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
