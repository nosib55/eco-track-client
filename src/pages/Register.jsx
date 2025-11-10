import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

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
    if (!minLen(password)) errs.push("Minimum length 6 characters.");
    if (!hasUpper(password)) errs.push("At least 1 uppercase letter.");
    if (!hasLower(password)) errs.push("At least 1 lowercase letter.");
    if (!hasSpecial(password)) errs.push("At least 1 special character.");
    return errs;
  };

  const onPasswordInput = (e) => {
    const v = e.target.value || "";
    setPwErrors(validatePassword(v));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    const password = e.target.password.value;

    const errs = validatePassword(password);
    setPwErrors(errs);
    if (errs.length > 0) {
      toast.error("Please fix password requirements.");
      return;
    }

    try {
      setLoadingEmail(true);
      await createUser(email, password, name, photoURL); // profile update handled in provider
      toast.success("Account created successfully! Please log in.");
      navigate("/login", { replace: true }); // ✅ Redirect to login page
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

  const handleGoogleRegister = async () => {
    try {
      setFormError("");
      setLoadingGoogle(true);
      await loginWithGoogle();
      toast.success("Signed up with Google! Please log in.");
      navigate("/login", { replace: true }); // ✅ Redirect Google users to login too
    } catch (err) {
      const msg = err?.message || "Google sign-in failed.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Join EcoTrack
        </h1>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              name="photoURL"
              type="url"
              placeholder="https://example.com/me.jpg"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <span className="text-xs text-gray-500">Min 6, Aa, aa, special</span>
            </div>
            <input
              name="password"
              type="password"
              required
              onInput={onPasswordInput}
              placeholder="••••••••"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {pwErrors.length > 0 ? (
              <ul className="mt-2 text-xs text-red-600 list-disc pl-5 space-y-0.5">
                {pwErrors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-green-600">Password looks good ✅</p>
            )}
          </div>

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-60"
          >
            {loadingEmail ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loadingGoogle}
            className="w-full border py-2 rounded-md hover:bg-gray-50 disabled:opacity-60"
          >
            {loadingGoogle ? "Connecting Google..." : "Continue with Google"}
          </button>
        </div>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
