import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";

export default function ChangePasswordForm({ onSuccess }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/auth/change-password", {
        method: "POST",
        body: { oldPassword, newPassword },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      if (onSuccess) {
        onSuccess();
      } else {
        // fallback: logout and redirect if no onSuccess prop
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
      <h3 className="text-lg font-semibold">Change Password</h3>
      <input
        type="password"
        placeholder="Current password"
        value={oldPassword}
        required
        onChange={(e) => setOldPassword(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        required
        onChange={(e) => setNewPassword(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
}
