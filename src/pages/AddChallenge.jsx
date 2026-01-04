import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function AddChallenge() {
  const { user } = useContext(AuthContext);
  const API = import.meta.env.VITE_API_BASE;

  const initialForm = {
    title: "",
    category: "",
    description: "",
    duration: "",
    target: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateDates = () => {
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date must be after start date.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateDates()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": user?.email,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create challenge");
      }

      toast.success("Challenge created successfully!");
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-6">
        Add New Challenge
      </h2>

      {error && (
        <p className="mb-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4"
      >
        {/* Title */}
        <div>
          <label className="label font-medium">Title</label>
          <input
            className="input input-bordered w-full"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="label font-medium">Category</label>
          <input
            className="input input-bordered w-full"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div>
          <label className="label font-medium">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="label font-medium">Duration (days)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Target */}
        <div>
          <label className="label font-medium">Target</label>
          <input
            className="input input-bordered w-full"
            name="target"
            placeholder="e.g. Reduce plastic usage"
            value={form.target}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Image */}
        <div>
          <label className="label font-medium">Image URL</label>
          <input
            className="input input-bordered w-full"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">Start Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="label font-medium">End Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-success text-white mt-4"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Challenge"}
        </button>
      </form>
    </section>
  );
}
