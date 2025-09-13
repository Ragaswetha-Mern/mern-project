// ...existing code...
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineUserCircle, HiOutlineUpload } from "react-icons/hi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ApplyJob() {
  // ...existing code...
  const submitApplication = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      if (resumeChoice === "new") {
        formData.append("resume", resume);
      } else {
        formData.append("useExistingResume", "true");
      }
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
      toast.success("Applied successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.message || "Failed to apply");
    } finally {
      setLoading(false);
      setPendingSubmit(false);
    }
  };
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  // Modal for resume override confirmation
  const handleOverrideConfirm = async (e) => {
    e.preventDefault();
    setShowOverrideModal(false);
    setPendingSubmit(false);
    await submitApplication();
  };
  const handleOverrideCancel = (e) => {
    e.preventDefault();
    setShowOverrideModal(false);
    setPendingSubmit(false);
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  useEffect(() => {
    // Check for existing resume in DB when user is loaded
    if (user && (user._id || user.id)) {
      const userId = user._id || user.id;
      fetch(`${API_BASE}/api/user-file/${userId}/resume`).then((res) => {
        setExistingResumeAvailable(res.ok);
        if (!res.ok) {
          setResumeChoice("new");
        }
      });
    }
  }, [user]);
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [existingResumeAvailable, setExistingResumeAvailable] = useState(false);
  const [resumeChoice, setResumeChoice] = useState("existing");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== "jobseeker") {
      toast.error("Only jobseekers can apply for jobs.");
      return;
    }
    if (resumeChoice === "new" && !resume) {
      toast.error("Please upload your resume.");
      return;
    }
    // If uploading new resume and existing resume is present, show modal
    if (resumeChoice === "new" && existingResumeAvailable && !pendingSubmit) {
      setShowOverrideModal(true);
      setPendingSubmit(true);
      return;
    }
    await submitApplication();
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
          {/* Modal for resume override warning */}
          {showOverrideModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
                <h3 className="text-xl font-bold text-red-600 mb-4">
                  Override Resume?
                </h3>
                <p className="text-gray-700 mb-6 text-center">
                  You already have an uploaded resume. Uploading a new resume
                  will <span className="font-bold text-red-600">override</span>{" "}
                  your existing resume and only the new resume will be used for
                  this and future applications.
                  <br />
                  Are you sure you want to proceed?
                </p>
                <div className="flex gap-4">
                  <button
                    className="bg-red-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-red-700 transition-all"
                    onClick={handleOverrideConfirm}
                  >
                    Yes, override and upload
                  </button>
                  <button
                    className="bg-gray-200 text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-300"
                    onClick={handleOverrideCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div>
            <label className="block text-green-700 font-semibold mb-2">
              Resume Options
            </label>
            {existingResumeAvailable && (
              <div className="mb-2 flex flex-col gap-2">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="resumeChoice"
                      value="existing"
                      checked={resumeChoice === "existing"}
                      onChange={() => setResumeChoice("existing")}
                    />
                    <span className="text-green-700 font-medium">
                      Use existing uploaded resume
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="resumeChoice"
                      value="new"
                      checked={resumeChoice === "new"}
                      onChange={() => setResumeChoice("new")}
                    />
                    <span className="text-green-700 font-medium">
                      Upload new resume
                    </span>
                  </label>
                </div>
                {/* View existing resume link */}
                <a
                  href={`${API_BASE}/api/user-file/${
                    user._id || user.id
                  }/resume`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 text-sm font-medium underline font-semibold hover:text-blue-800"
                  style={{ marginLeft: "2px" }}
                >
                  View existing resume
                </a>
              </div>
            )}
            {(!existingResumeAvailable || resumeChoice === "new") && (
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
                  />
                </label>
              </div>
            )}
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
