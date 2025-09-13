import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";
import {
  HiOutlineUserCircle,
  HiOutlineUpload,
  HiOutlineTrash,
} from "react-icons/hi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [profilePicExists, setProfilePicExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    apiFetch("/api/profile", { method: "GET" })
      .then(async (data) => {
        setProfile(data);
        // Check if profilePic exists in DB
        if (data._id) {
          const res = await fetch(
            `${API_BASE}/api/user-file/${data._id}/profilePic`
          );
          setProfilePicExists(res.ok);
        }
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleUpdate = async () => {
    const updated = await apiFetch("/api/profile", {
      method: "PUT",
      body: form,
    });
    setProfile(updated);
    toast.success("Profile updated successfully!");
    setEdit(false);
  };

  const handleProfilePicUpload = async (fileInput) => {
    const file = fileInput.files[0];
    if (!file || !profile?._id) return;
    setUploading(true);
    setError("");
    setFileName(file.name);
    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", "profilePic");
    try {
      const res = await fetch(`${API_BASE}/api/user-file/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "Profile photo upload failed!");
      setProfilePicExists(true);
      setUploading(false);
      setPreview(null);
      setFileName("");
      toast.success("Profile photo uploaded successfully!");
    } catch (err) {
      setError(err.message || "Profile photo upload failed!");
      toast.error(err.message || "Profile photo upload failed!");
      setUploading(false);
      setPreview(null);
      setFileName("");
    }
  };

  const handleRemovePic = async () => {
    if (!profile?._id) return;
    try {
      await apiFetch(`/api/user-file/${profile._id}/profilePic`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfilePicExists(false);
      toast.success("Profile photo removed!");
    } catch (err) {
      toast.error(err.message || "Failed to remove profile photo!");
    }
  };

  if (!profile)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow mb-3"
            />
          ) : profilePicExists ? (
            <img
              src={`${API_BASE}/api/user-file/${profile._id}/profilePic`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow mb-3"
            />
          ) : (
            <HiOutlineUserCircle className="w-32 h-32 text-green-300 mb-3" />
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-full">
              <span className="text-green-600 font-semibold">Uploading...</span>
            </div>
          )}
          <label className="absolute bottom-2 right-2 flex items-center gap-2 bg-green-600 text-white rounded-full px-3 py-2 cursor-pointer shadow-lg hover:bg-green-700 transition duration-200 font-semibold">
            <HiOutlineUpload className="h-5 w-5" />
            <span className="text-xs">
              {fileName ? fileName : "Upload Photo"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleProfilePicUpload(e.target)}
              className="hidden"
            />
          </label>
          {profile.profilePic && !uploading && (
            <button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-red-700 transition duration-200 flex items-center"
              onClick={handleRemovePic}
              title="Remove Profile Photo"
              type="button"
            >
              <HiOutlineTrash className="h-5 w-5" />
            </button>
          )}
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600 font-semibold">{error}</div>
        )}
        <div className="mt-4 text-lg font-bold text-green-700">
          {profile.name}
        </div>
        <div className="text-sm text-gray-500">{profile.email}</div>
        <span className="inline-block mt-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold capitalize shadow">
          {profile.role}
        </span>
      </div>
      <div className="mb-6">
        {edit ? (
          <>
            <input
              className="border p-2 mb-3 w-full rounded"
              value={form.name ?? profile.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />
            <input
              className="border p-2 mb-3 w-full rounded"
              value={form.email ?? profile.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />
            <input
              className="border p-2 mb-3 w-full rounded"
              value={
                form.skills ?? (profile.skills ? profile.skills.join(", ") : "")
              }
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              placeholder="Skills (comma separated)"
            />
            <div className="text-xs text-gray-500 mb-3">
              Enter your skills separated by commas (e.g. React, Node.js,
              MongoDB)
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full font-semibold"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              className="mt-2 text-green-600 underline w-full"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="text-xl font-bold text-green-700 mb-2">
              {profile.name}
            </div>
            <div className="text-gray-700 mb-2">{profile.email}</div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full font-semibold"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
      <div className="text-sm text-gray-500 text-center">
        Role:{" "}
        <span className="font-semibold text-green-700">{profile.role}</span>
      </div>
      <button
        className="mt-4 bg-gray-200 text-green-700 px-4 py-2 rounded font-semibold hover:bg-gray-300"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
