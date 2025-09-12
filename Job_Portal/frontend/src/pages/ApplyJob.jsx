import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineUserCircle, HiOutlineUpload } from "react-icons/hi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ApplyJob() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user.role !== "jobseeker") {
        toast.error("Only jobseekers can apply for jobs.");
        setLoading(false);
        return;
      }
      if (!resume) {
        toast.error("Please upload your resume.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("resume", resume);

      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Failed to apply");
        setLoading(false);
        return;
      }
      toast.success("Applied successfully!"); // <-- Toast message for success
      setTimeout(() => navigate("/dashboard"), 1500); // Optional: delay navigation for toast
    } catch (err) {
      toast.error(err.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 font-sans">
      <div className="w-full max-w-3xl px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-bold text-green-700">
            {user.name ? user.name : "No Name"}
          </div>
          <div className="text-base text-green-600 font-semibold capitalize">
            {user.role ? user.role : "No Role"}
          </div>
          <div className="text-base text-gray-500">
            {user.email ? user.email : "No Email"}
          </div>
        </div>
        <h2 className="text-4xl font-extrabold text-green-700 mb-4 text-center tracking-tight">
          Submit Your Application
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-green-700 font-semibold mb-2">
              Upload Resume{" "}
              <span className="text-gray-400">(PDF, DOC, DOCX)</span>
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center cursor-pointer bg-green-50 border border-green-200 rounded-lg px-4 py-2 hover:bg-green-100 transition">
                <HiOutlineUpload className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-medium text-green-700">
                  {fileName ? fileName : "Choose File"}
                </span>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold shadow hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="inline mr-2 h-6 w-6 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Applying...
              </>
            ) : (
              <>Apply Now</>
            )}
          </button>
          <button
            type="button"
            className="bg-gray-100 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all text-lg"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
