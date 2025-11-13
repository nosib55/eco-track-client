// src/pages/MyActivities.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyActivities() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      // redirect to login if not logged in
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
            "x-user-email": user.email, // dev auth
          },
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || `Failed (${res.status})`);
        }
        const data = await res.json();
        if (mounted) setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("MyActivities fetch error:", err);
        toast.error("Could not load your activities.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMyActivities();
    return () => (mounted = false);
  }, [API, user, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!items || items.length === 0)
    return (
      <div className="max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-2xl font-semibold">No activities yet</h2>
        <p className="mt-2">Join a challenge to see it here.</p>
        <Link to="/challenges" className="btn btn-outline mt-4">Browse Challenges</Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">My Activities</h2>

      <div className="space-y-4">
        {items.map((uc) => (
          <div key={uc._id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
            <img
              src={(uc.challenge && (uc.challenge.imageUrl || uc.challenge.image)) || "/placeholder.jpg"}
              alt={uc.challenge?.title || "Challenge"}
              className="w-28 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <Link to={`/challenges/${uc.challenge?._id || uc.challenge?.id}`} className="font-semibold text-lg hover:underline">
                {uc.challenge?.title || uc.challenge?.name || "Untitled Challenge"}
              </Link>
              <div className="text-sm text-gray-600">Status: {uc.status} • Progress: {uc.progress}%</div>
              <div className="text-xs text-gray-500 mt-1">Joined at: {new Date(uc.joinDate).toLocaleString()}</div>
            </div>

            <div className="flex flex-col gap-2">
              <Link to={`/my-activities/${uc._id}`} className="btn btn-sm btn-outline">View</Link>
              <button
                className="btn btn-sm btn-ghost text-red-600"
                onClick={async () => {
                  // optional: leave challenge flow
                  if (!confirm("Leave this challenge?")) return;
                  try {
                    const res = await fetch(`${API}/api/user-challenges/${uc._id}`, {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json", "x-user-email": user.email },
                    });
                    if (!res.ok) throw new Error("Failed to leave");
                    toast.success("Left challenge");
                    setItems((prev) => prev.filter((p) => p._id !== uc._id));
                  } catch (err) {
                    console.error(err);
                    toast.error("Could not leave challenge");
                  }
                }}
              >
                Leave
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
