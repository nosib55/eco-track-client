
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AddChallenge() {
  const { user } = useContext(AuthContext);

  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    target: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/api/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": user?.email, // required
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to create challenge");
      } else {
        setMessage("Challenge created successfully!");
        setForm({
          title: "",
          category: "",
          description: "",
          duration: "",
          target: "",
          imageUrl: "",
          startDate: "",
          endDate: "",
        });
      }
    } catch (err) {
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-green-700 mb-4">
        Add New Challenge
      </h2>

      {message && <p className="mb-3 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        
        <input
          className="input input-bordered"
          name="title"
          placeholder="Challenge Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <textarea
          className="textarea textarea-bordered"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="duration"
          placeholder="Duration (days)"
          type="number"
          value={form.duration}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="target"
          placeholder="Target (ex: Reduce Plastic)"
          value={form.target}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />

        <label className="font-medium">Start Date</label>
        <input
          type="date"
          className="input input-bordered"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <label className="font-medium">End Date</label>
        <input
          type="date"
          className="input input-bordered"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success text-white" disabled={loading}>
          {loading ? "Saving..." : "Add Challenge"}
        </button>
      </form>
    </div>
  );
}
