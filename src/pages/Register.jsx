import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaGoogle,
  FaCheckCircle,
} from "react-icons/fa";

/* ---------- Password Rules ---------- */
const hasUpper = (s) => /[A-Z]/.test(s);
const hasLower = (s) => /[a-z]/.test(s);
const hasSpecial = (s) => /[!@#$%^&*()[\]{}._\-+!?~\\/|:;"'<>,.=]/.test(s);
const minLen = (s) => s.length >= 6;

export default function Register() {
  const { createUser, loginWithGoogle } = useContext(AuthContext);

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [pwErrors, setPwErrors] = useState([]);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) => {
    const errs = [];
    if (!minLen(password)) errs.push("Minimum length 6 characters");
    if (!hasUpper(password)) errs.push("At least 1 uppercase letter");
    if (!hasLower(password)) errs.push("At least 1 lowercase letter");
    if (!hasSpecial(password)) errs.push("At least 1 special character");
    return errs;
  };

  const onPasswordInput = (e) => {
    setPwErrors(validatePassword(e.target.value || ""));
  };

  /* ---------- Register ---------- */
  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    const password = e.target.password.value;

    const errs = validatePassword(password);
    setPwErrors(errs);
    if (errs.length) {
      toast.error("Please fix password requirements.");
      return;
    }

    try {
      setLoadingEmail(true);
      await createUser(email, password, name, photoURL);
      toast.success("Account created successfully! Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      const code = err?.code || "";
      const msg =
        code === "auth/email-already-in-use"
          ? "This email is already registered."
          : code === "auth/weak-password"
          ? "Weak password."
          : code === "auth/network-request-failed"
          ? "Network error. Try again."
          : err?.message || "Registration failed.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoadingEmail(false);
    }
  };

  /* ---------- Google ---------- */
  const handleGoogleRegister = async () => {
    try {
      setFormError("");
      setLoadingGoogle(true);
      await loginWithGoogle();
      toast.success("Signed up with Google! Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      const msg = err?.message || "Google sign-in failed.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 text-center">
          Join EcoTrack
        </h1>

        {/* ---------- Form ---------- */}
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                className="w-full pl-10 pr-3 py-2 border rounded-md
                           bg-white dark:bg-gray-700
                           focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 border rounded-md
                           bg-white dark:bg-gray-700
                           focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo URL
            </label>
            <div className="relative mt-1">
              <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="photoURL"
                type="url"
                placeholder="https://example.com/me.jpg"
                className="w-full pl-10 pr-3 py-2 border rounded-md
                           bg-white dark:bg-gray-700
                           focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                onInput={onPasswordInput}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border rounded-md
                           bg-white dark:bg-gray-700
                           focus:ring-2 focus:ring-green-600"
              />
            </div>

            {pwErrors.length > 0 ? (
              <ul className="mt-2 text-xs text-red-600 list-disc pl-5 space-y-0.5">
                {pwErrors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                <FaCheckCircle /> Password looks good
              </p>
            )}
          </div>

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-green-600 text-white py-2 rounded-md
                       hover:bg-green-700 transition disabled:opacity-60"
          >
            {loadingEmail ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleRegister}
          disabled={loadingGoogle}
          className="w-full flex items-center justify-center gap-3
                     border py-2 rounded-md
                     bg-white dark:bg-gray-700
                     hover:bg-gray-50 dark:hover:bg-gray-600
                     transition disabled:opacity-60"
        >
          <FaGoogle className="text-red-500" />
          {loadingGoogle ? "Connecting Google..." : "Continue with Google"}
        </button>

        {/* Footer */}
        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 dark:text-green-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
