// src/pages/Profile.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, updateUserProfile } = useContext(AuthContext) || {};

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        Please login first.
      </p>
    );
  }

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      await updateUserProfile({
        displayName,
        photoURL,
      });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-20 px-4">
      <div
        className="
          bg-white dark:bg-gray-800
          rounded-2xl shadow-sm
          p-6
          transition-all duration-300
          hover:shadow-lg
        "
      >
        <h2 className="text-3xl font-semibold text-green-700 dark:text-green-400 mb-6 text-center">
          My Profile
        </h2>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={
              photoURL ||
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName || "User"
              )}&background=16a34a&color=fff`
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-green-600 object-cover"
          />

          {/* Info */}
          <div className="w-full space-y-3">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Name
              </label>
              {isEditing ? (
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md
                             bg-white dark:bg-gray-700
                             text-gray-900 dark:text-gray-100
                             focus:ring-2 focus:ring-green-600"
                />
              ) : (
                <p className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-100">
                  <FaUser className="text-green-600" />
                  {user.displayName || "Anonymous User"}
                </p>
              )}
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Email
              </label>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mt-1">
                <FaEnvelope />
                {user.email}
              </p>
            </div>

            {/* Photo URL */}
            {isEditing && (
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Photo URL
                </label>
                <input
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full mt-1 px-3 py-2 border rounded-md
                             bg-white dark:bg-gray-700
                             text-gray-900 dark:text-gray-100
                             focus:ring-2 focus:ring-green-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200 dark:bg-gray-700" />

        {/* Actions */}
        <div className="flex justify-center gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline btn-success flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-success text-white flex items-center gap-2"
              >
                <FaSave />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setIsEditing(false);
                  setDisplayName(user.displayName || "");
                  setPhotoURL(user.photoURL || "");
                }}
                className="btn btn-ghost flex items-center gap-2"
              >
                <FaTimes />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
