import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ChallengeDetail() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_BASE ;

  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const location = useLocation();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchChallenge = async () => {
      if (!id) {
        setError("Invalid challenge id");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      const url = `${API}/api/challenges/${encodeURIComponent(id)}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          if (res.status === 404) throw new Error("Challenge not found.");
          throw new Error(`Server error (${res.status})`);
        }
        const data = await res.json();
        const doc =
          data && (data._id || data.title)
            ? data
            : Array.isArray(data.items)
            ? data.items[0]
            : data;
        if (!doc) throw new Error("Challenge data missing in response");
        if (mounted) setChallenge(doc);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load challenge");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchChallenge();
    return () => (mounted = false);
  }, [API, id]);

  const handleImageError = (e) => {
    e.currentTarget.src = "/placeholder.jpg";
  };

  const handleJoin = async () => {
    if (!user?.email) {
      toast.info("Please login to join this challenge.");
      return navigate("/login", { state: { from: location } });
    }
    if (!challenge) return;
    if (challenge.joined) {
      toast.info("You're already joined.");
      return;
    }
    setJoining(true);
    const prevParticipants = challenge.participants ?? 0;
    setChallenge((c) => ({
      ...c,
      participants: (c.participants ?? 0) + 1,
    }));
    try {
      const idStr = encodeURIComponent(String(challenge._id || challenge.id));
      const joinUrl = `${API}/api/challenges/join/${idStr}`;
      const res = await fetch(joinUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": user.email,
        },
        body: JSON.stringify({}),
      });
      let data = {};
      if (res.status !== 204) {
        data = await res.json().catch(() => ({}));
      }
      if (!res.ok) {
        setChallenge((c) => ({ ...c, participants: prevParticipants }));
        const msg = data?.message || `Failed to join (status ${res.status})`;
        toast.error(msg);
        setJoining(false);
        return;
      }
      setChallenge((c) => ({
        ...c,
        participants: c.participants ?? 0,
        joined: true,
      }));
      toast.success("Successfully joined! Added to My Activities.");
    } catch (err) {
      setChallenge((c) => ({ ...c, participants: prevParticipants }));
      toast.error("Join failed. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-700">{error}</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link to="/challenges" className="btn btn-outline">
              Back to Challenges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No challenge data available.</p>
      </div>
    );
  }

  const startDate = challenge.startDate ? new Date(challenge.startDate) : null;
  const endDate = challenge.endDate ? new Date(challenge.endDate) : null;

  return (
    <div className="max-w-4xl mx-auto mt-24 mb-12 px-4">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="md:flex md:gap-6">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src={challenge.imageUrl || challenge.image || "/placeholder.jpg"}
              alt={challenge.title || "Challenge"}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold text-green-700 mb-2">
              {challenge.title}
            </h1>

            <p className="text-sm text-gray-500 mb-3">
              {challenge.category || "General"}
            </p>

            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {challenge.description || "No description"}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
              <div>
                <div className="font-semibold">Duration</div>
                <div>{challenge.duration ?? "N/A"} days</div>
              </div>
              <div>
                <div className="font-semibold">Participants</div>
                <div>{challenge.participants ?? 0}</div>
              </div>
              <div>
                <div className="font-semibold">Impact Metric</div>
                <div>{challenge.impactMetric || "N/A"}</div>
              </div>
              <div>
                <div className="font-semibold">Created By</div>
                <div>{challenge.createdBy || "Unknown"}</div>
              </div>
              <div>
                <span className="font-semibold">Start:</span>{" "}
                {startDate.toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">End:</span>{" "}
                {endDate.toLocaleDateString()}
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleJoin}
                disabled={joining || challenge.joined}
                className="btn btn-success text-white disabled:opacity-60"
              >
                {challenge.joined
                  ? "Joined"
                  : joining
                  ? "Joining..."
                  : "Join Challenge"}
              </button>

              <Link to="/challenges" className="btn btn-outline">
                Back to Challenges
              </Link>
            </div>

            <div className="mt-4 text-sm text-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
