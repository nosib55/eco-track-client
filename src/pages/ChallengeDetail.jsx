import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ChallengeDetail() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_BASE;

  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const location = useLocation();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  /* ---------- Fetch ---------- */
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/challenges/${id}`);
        if (!res.ok) throw new Error("Challenge not found");
        const data = await res.json();
        if (mounted) setChallenge(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, [API, id]);

  /* ---------- Join ---------- */
  const handleJoin = async () => {
    if (!user?.email) {
      toast.info("Please login to join.");
      return navigate("/login", { state: { from: location } });
    }

    if (challenge.joined) return;

    setJoining(true);
    const previous = challenge.participants ?? 0;

    setChallenge((c) => ({ ...c, participants: previous + 1 }));

    try {
      const res = await fetch(
        `${API}/api/challenges/join/${challenge._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": user.email,
          },
        }
      );

      if (!res.ok) throw new Error("Join failed");

      setChallenge((c) => ({ ...c, joined: true }));
      toast.success("Challenge joined!");
    } catch {
      setChallenge((c) => ({ ...c, participants: previous }));
      toast.error("Failed to join challenge");
    } finally {
      setJoining(false);
    }
  };

  /* ---------- States ---------- */
  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const start = challenge.startDate
    ? new Date(challenge.startDate).toLocaleDateString()
    : "N/A";
  const end = challenge.endDate
    ? new Date(challenge.endDate).toLocaleDateString()
    : "N/A";

  /* ---------- UI ---------- */
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT: Content */}
        <div className="md:col-span-2 space-y-6">

          {/* Image */}
          <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={challenge.imageUrl || "/placeholder.jpg"}
              alt={challenge.title}
              className="w-full h-72 object-cover"
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            />
          </div>

          {/* Overview */}
          <div>
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
              {challenge.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {challenge.category || "General"}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {challenge.description}
            </p>
          </div>

          {/* Key Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <Info label="Duration" value={`${challenge.duration} days`} />
              <Info label="Participants" value={challenge.participants ?? 0} />
              <Info label="Start Date" value={start} />
              <Info label="End Date" value={end} />
              <Info label="Impact" value={challenge.impactMetric || "N/A"} />
              <Info label="Created By" value={challenge.createdBy || "Admin"} />
            </div>
          </div>
        </div>

        {/* RIGHT: Sticky Action Panel */}
        <aside className="md:sticky md:top-28 h-fit bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Join this challenge and track your progress directly from your
            dashboard.
          </p>

          <button
            onClick={handleJoin}
            disabled={joining || challenge.joined}
            className="btn btn-success w-full text-white disabled:opacity-60"
          >
            {challenge.joined
              ? "Already Joined"
              : joining
              ? "Joining..."
              : "Join Challenge"}
          </button>

          <Link to="/challenges" className="btn btn-outline w-full">
            Back to Challenges
          </Link>
        </aside>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-gray-600 dark:text-gray-400">{value}</p>
    </div>
  );
}
