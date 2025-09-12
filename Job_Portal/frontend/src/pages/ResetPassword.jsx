import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/auth/reset-password", {
        method: "POST",
        body: { token, password },
      });
      toast.success("Password has been reset!");
    } catch (err) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
