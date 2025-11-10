import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

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
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Login to EcoTrack
        </h1>

        <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
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
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-60"
          >
            {loadingEmail ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="w-full border py-2 rounded-md hover:bg-gray-50 disabled:opacity-60"
          >
            {loadingGoogle ? "Connecting Google..." : "Continue with Google"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-green-700 hover:underline">
            Forgot Password?
          </Link>
          <span className="text-gray-500">
            New here?{" "}
            <Link to="/register" className="text-green-700 hover:underline">
              Create account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
