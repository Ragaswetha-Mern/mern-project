import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFileUpload } from "react-icons/fa";
import { apiFetch } from "../utils/http";

export default function UploadResume() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [resumeFilename, setResumeFilename] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
  // Fetch current resume from DB on mount
  useEffect(() => {
    async function fetchResume() {
      try {
        if (!user.id) return;
        const res = await fetch(
          `${API_BASE}/api/user-file/${user.id}/resume/meta`
        );
        if (res.ok) {
          const data = await res.json();
          setResume(true);
          setResumeFilename(data.filename || "resume");
        } else {
          setResume("");
          setResumeFilename("");
        }
      } catch {
        setResume("");
        setResumeFilename("");
      }
    }
    fetchResume();
  }, [API_BASE, user]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiFetch(`/api/user-file/${user.id}/resume`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Resume deleted successfully!");
      setResume("");
    } catch (err) {
      toast.error(err.message || "Failed to delete resume");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!file) {
        toast.error("Please select a file.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", "resume");
      const res = await fetch(`${API_BASE}/api/user-file/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to upload resume");
        setLoading(false);
        return;
      }
      toast.success("Resume uploaded successfully!");
      setFile(null);
      // Fetch latest resume metadata
      const metaRes = await fetch(
        `${API_BASE}/api/user-file/${user.id}/resume/meta`
      );
      if (metaRes.ok) {
        const meta = await metaRes.json();
        setResume(true);
        setResumeFilename(meta.filename || "resume");
      } else {
        setResume(true);
        setResumeFilename("");
      }
    } catch (err) {
      toast.error(err.message || "Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 font-sans">
      <form
        className="bg-white rounded-2xl shadow-xl p-10 border border-green-100 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <button
          type="button"
          className="mb-4 self-start bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-all"
          onClick={() => navigate("/dashboard")}
        >
          ← Go back to Dashboard
        </button>
        <div className="flex flex-col gap-2 items-center mb-6 pb-4 border-b border-green-100">
          <span className="flex items-center gap-2 text-lg font-bold text-green-700">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {user.name || "No Name"}
          </span>
          <span className="flex items-center gap-2 text-base text-green-600 font-semibold capitalize">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v4a4 4 0 01-8 0V7m8 0V5a4 4 0 00-8 0v2"
              />
            </svg>
            {user.role || "No Role"}
          </span>
          <span className="flex items-center gap-2 text-base text-gray-500">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12v1a4 4 0 01-8 0v-1m8 0V7a4 4 0 00-8 0v5"
              />
            </svg>
            {user.email || "No Email"}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <FaFileUpload className="h-8 w-8 text-green-600" />
          <h2 className="text-2xl font-extrabold text-green-700 font-sans tracking-tight">
            {resume ? "Your Resume" : "Upload Resume"}
          </h2>
        </div>
        {resume && user.id && (
          <div className="flex flex-col gap-2 mb-4">
            <span className="text-green-700 font-semibold">
              Current Resume:
            </span>
            <a
              href={`${API_BASE}/api/user-file/${user.id}/resume`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 text-sm font-medium underline font-semibold hover:text-blue-800"
            >
              {resumeFilename || user.name + "_resume"}
            </a>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-green-700 font-semibold">
            {resume
              ? "Update Resume (PDF, DOC, DOCX)"
              : "Select Resume (PDF, DOC, DOCX)"}
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {file && (
            <span className="text-green-600 text-sm font-medium mt-1">
              Selected: {file.name}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded-lg font-bold shadow hover:bg-green-700 transition-all text-lg"
          disabled={loading}
        >
          {loading
            ? resume
              ? "Updating..."
              : "Uploading..."
            : resume
            ? "Update Resume"
            : "Upload Resume"}
        </button>
        {resume && (
          <button
            type="button"
            className="bg-red-500 text-white py-2 rounded-lg font-bold shadow hover:bg-red-700 transition-all text-sm mt-2"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete Resume
          </button>
        )}
      </form>
    </div>
  );
}
