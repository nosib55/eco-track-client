// src/pages/Profile.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="text-center mt-10">Please login first.</p>;

  return (
    <div className="max-w-md mx-auto mt-20 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=16a34a&color=fff`
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-green-600"
        />

        <div className="text-center">
          <p className="font-semibold text-lg">{user.displayName || "Anonymous User"}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Optional Update Button */}
      <div className="mt-6 text-center">
        <button className="btn btn-outline btn-success">Update Profile (optional)</button>
      </div>
    </div>
  );
}
