import { toast } from "react-toastify";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import { apiFetch } from "../utils/http";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { name, email, password, role } = form;
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: { name, email, password, role },
      });
      toast.success("Registration successful!");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-green-100">
          {/* Header */}
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
            <h2 className="text-lg font-semibold text-green-600 mb-1">
              Create your account
            </h2>
            <p className="text-gray-500 text-sm">
              Start your journey to your dream job.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.role}
                onChange={handleChange}
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
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
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <a
              href="/login"
              className="text-green-600 hover:underline font-semibold"
            >
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
