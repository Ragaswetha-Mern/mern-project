import { useState } from "react";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/auth/forgot-password", {
        method: "POST",
        body: { email },
      });
      toast.success("Password reset link sent to your email!");
    } catch (err) {
      toast.error(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <button
        type="button"
        className="mt-4 bg-gray-200 text-green-700 px-4 py-2 rounded hover:bg-gray-300"
        onClick={() => navigate("/login")}
      >
        ← Back to Login
      </button>
    </div>
  );
}
