import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data.user);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-green-100">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-4 mb-2">
            <img
              src={logo}
              alt="Job Portal Logo"
              className="w-16 h-16 rounded-full shadow-lg border border-green-200"
            />
            <span className="text-3xl font-bold text-green-700 tracking-tight">
              Job Portal
            </span>
          </div>
          <h2 className="text-lg font-semibold text-green-600 mb-1">Sign In</h2>
          <p className="text-gray-500 text-sm">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col gap-4"
        >
          {error && (
            <div className="mb-2 text-red-500 text-center flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {error}
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
          <div className="flex justify-between mt-2">
            <Link
              to="/forgot-password"
              className="text-green-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="mt-8 text-center">
          <a
            href="/register"
            className="text-green-600 hover:underline font-semibold"
          >
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
}
