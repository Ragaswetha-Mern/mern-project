import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/http";
import { FaUser, FaFileAlt, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await apiFetch("/api/applications/employer", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setApplications(res);
    } catch {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await apiFetch(`/api/applications/${id}/status`, {
        method: "PUT",
        body: { status },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Application status updated");
      fetchApplications();
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-200">
        <span className="text-green-600 text-xl font-semibold">Loading...</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 py-10 px-4 font-sans">
      <div className="flex flex-col md:flex-row items-start mb-10 gap-4">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 bg-gray-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition shadow"
            onClick={() => navigate("/dashboard")}
          >
            <span className="text-xl">&larr;</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 tracking-tight text-left">
          Manage Applications
        </h1>
      </div>

      {applications.length === 0 ? (
        <div className="text-gray-500 text-center text-lg mt-20">
          No applications found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-2xl shadow-xl p-7 border border-green-100 flex flex-col gap-4 hover:shadow-2xl transition duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <FaUser className="h-6 w-6 text-green-400" />
                <span className="font-bold text-green-700 text-lg">
                  {app.applicant?.name}
                </span>
                {app.applicant?.email && (
                  <span className="ml-2 text-gray-500 text-sm">
                    {app.applicant.email}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <FaFileAlt className="h-5 w-5 text-green-400" />
                <span className="text-gray-700 font-medium">
                  {app.job?.title}
                </span>
                {app.job?.company && (
                  <span className="ml-2 text-gray-500 text-sm">
                    {app.job.company}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold text-green-700">Status:</span>
                <span
                  className={`capitalize px-3 py-1 rounded-full text-xs font-bold
                  ${
                    app.status === "accepted"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                {app.status === "interviewed" && (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded font-semibold shadow transition bg-green-600 text-white hover:bg-green-700"
                      onClick={() => handleStatus(app._id, "accepted")}
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded font-semibold shadow transition bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleStatus(app._id, "rejected")}
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
                {app.status === "applied" && (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded font-semibold shadow transition bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handleStatus(app._id, "scheduleInterview")}
                    >
                      <FaUser /> Schedule Interview
                    </button>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded font-semibold shadow transition bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleStatus(app._id, "rejected")}
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
                {app.status === "scheduleInterview" && (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded font-semibold shadow transition bg-yellow-500 text-white hover:bg-yellow-600"
                      onClick={() => handleStatus(app._id, "interviewed")}
                    >
                      <FaUser /> Interviewed
                    </button>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded font-semibold shadow transition bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleStatus(app._id, "rejected")}
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
              </div>
              {app.resume && (
                <>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition mt-3"
                    onClick={() =>
                      setResumeUrl(
                        `${API_BASE}/api/user-file/${
                          app.applicant?._id || app.applicant?.id
                        }/resume`
                      )
                    }
                  >
                    <FaEye /> View Resume
                  </button>
                </>
              )}
              {resumeUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full relative flex flex-col items-center">
                    <button
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                      onClick={() => setResumeUrl(null)}
                    >
                      &times;
                    </button>
                    <h2 className="text-lg font-bold mb-4 text-blue-700">
                      Resume Preview
                    </h2>
                    <iframe
                      src={resumeUrl}
                      title="Resume PDF"
                      className="w-full h-96 border rounded"
                    />
                    <div className="flex gap-4 mt-4">
                      <a
                        href={`${API_BASE}/api/user-file/${
                          applications.find(
                            (appItem) =>
                              `${API_BASE}/api/user-file/${
                                appItem.applicant?._id || appItem.applicant?.id
                              }/resume` === resumeUrl
                          )?.applicant?._id ||
                          applications.find(
                            (appItem) =>
                              `${API_BASE}/api/user-file/${appItem.applicant?.id}/resume` ===
                              resumeUrl
                          )?.applicant?.id
                        }/resume`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline font-semibold hover:text-blue-800"
                      >
                        New Tab
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
