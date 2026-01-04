import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function Login() {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  /* ---------- Email Login ---------- */
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoadingEmail(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      toast.success("Logged in successfully!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const code = err?.code || "";
      const msg =
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found"
          ? "Invalid email or password."
          : code === "auth/network-request-failed"
          ? "Network error. Try again."
          : err?.message || "Login failed.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoadingEmail(false);
    }
  };

  /* ---------- Google Login ---------- */
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoadingGoogle(true);

    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg = err?.message || "Google sign-in failed.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 text-center">
          Login to EcoTrack
        </h1>

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                           text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border rounded-md
                           bg-white dark:bg-gray-700
                           text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-600 dark:text-red-400 text-sm">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-green-600 text-white py-2 rounded-md
                       hover:bg-green-700 transition disabled:opacity-60"
          >
            {loadingEmail ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
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

        {/* Footer Links */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-green-700 dark:text-green-400 hover:underline"
          >
            Forgot Password?
          </Link>

          <span className="text-gray-500">
            New here?{" "}
            <Link
              to="/register"
              className="text-green-700 dark:text-green-400 hover:underline"
            >
              Create account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
