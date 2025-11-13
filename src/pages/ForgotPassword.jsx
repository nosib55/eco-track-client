import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Forgot Password
        </h1>

        

        
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              aria-describedby="reset-help"
            />
            <p id="reset-help" className="mt-1 text-xs text-gray-500">
              Enter your email to reset your password (disabled for assessment).
            </p>
          </div>

          <button
            type="submit"
            disabled
            className="w-full bg-red-500 text-black py-2 rounded-md "
            title="Disabled for assignment"
          >
            Send reset link (disabled)
          </button>
        </form>

        {/* Helpful links */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/login" className="text-green-700 hover:underline">
            Back to Login
          </Link>
          <span className="text-gray-500">
            New here?{" "}
            <Link to="/register" className="text-green-700 hover:underline">
              Create account
            </Link>
          </span>
        </div>

        
        <p className="mt-4 text-center text-xs text-gray-500">
          We care about your privacy. Password reset is temporarily disabled for evaluation.
        </p>
      </div>
    </div>
  );
}
