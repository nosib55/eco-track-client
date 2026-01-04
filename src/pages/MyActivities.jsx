// src/pages/MyActivities.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaTrashAlt, FaExternalLinkAlt, FaLeaf } from "react-icons/fa";

export default function MyActivities() {
  const API = import.meta.env.VITE_API_BASE;
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      navigate("/login", { state: { from: "/my-activities" } });
      return;
    }

    let mounted = true;

    const fetchMyActivities = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/user-challenges/me`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-email": user.email,
          },
        });
        if (!res.ok) throw new Error("Failed to load activities");

        const data = await res.json();
        if (mounted) setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        toast.error("Could not load your activities.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMyActivities();
    return () => (mounted = false);
  }, [API, user, navigate]);

  /* ---------- States ---------- */

  if (loading) return <LoadingSpinner />;

  if (!items || items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-24 text-center px-4">
        <FaLeaf className="mx-auto text-4xl text-green-600 mb-3" />
        <h2 className="text-2xl font-semibold">No activities yet</h2>
        <p className="mt-2 text-gray-600">
          Join a challenge to start tracking your impact.
        </p>
        <Link to="/challenges" className="btn btn-outline mt-5">
          Browse Challenges
        </Link>
      </div>
    );
  }

  /* ---------- UI ---------- */

  return (
    <section className="max-w-6xl mx-auto mt-24 px-4 pb-12">
      <h2 className="text-3xl font-semibold text-green-700 dark:text-green-400 mb-8">
        My Activities
      </h2>

      <div className="space-y-4">
        {items.map((uc) => (
          <div
            key={uc._id}
            className="
              group bg-white dark:bg-gray-800
              border border-gray-100 dark:border-gray-700
              rounded-xl p-4
              flex flex-col sm:flex-row gap-4 items-start sm:items-center
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              hover:bg-green-50 dark:hover:bg-green-900/20
            "
          >
            {/* Image */}
            <img
              src={
                (uc.challenge &&
                  (uc.challenge.imageUrl || uc.challenge.image)) ||
                "/placeholder.jpg"
              }
              alt={uc.challenge?.title || "Challenge"}
              className="w-full sm:w-28 h-20 object-cover rounded-lg"
            />

            {/* Content */}
            <div className="flex-1">
              <Link
                to={`/challenges/${uc.challenge?._id || uc.challenge?.id}`}
                className="font-semibold text-lg text-gray-800 dark:text-gray-100
                           hover:underline inline-flex items-center gap-2"
              >
                {uc.challenge?.title ||
                  uc.challenge?.name ||
                  "Untitled Challenge"}
                <FaExternalLinkAlt className="text-xs opacity-60" />
              </Link>

              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Status: <span className="font-medium">{uc.status}</span> •
                Progress:{" "}
                <span className="font-medium">{uc.progress}%</span>
              </div>

              <div className="text-xs text-gray-500 mt-1">
                Joined at: {new Date(uc.joinDate).toLocaleString()}
              </div>
            </div>

            {/* Actions */}
            <button
              className="
                btn btn-sm btn-ghost text-red-600
                flex items-center gap-2
                opacity-80 group-hover:opacity-100
              "
              onClick={async () => {
                if (!confirm("Leave this challenge?")) return;

                try {
                  const res = await fetch(
                    `${API}/api/user-challenges/${uc._id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        "x-user-email": user.email,
                      },
                    }
                  );
                  if (!res.ok) throw new Error("Failed to leave");
                  toast.success("Left challenge");
                  setItems((prev) =>
                    prev.filter((p) => p._id !== uc._id)
                  );
                } catch (err) {
                  console.error(err);
                  toast.error("Could not leave challenge");
                }
              }}
            >
              <FaTrashAlt />
              Leave
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
