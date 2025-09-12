import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaFileUpload,
  FaBriefcase,
  FaSignOutAlt,
  FaUser,
  FaPlusCircle,
  FaHistory,
  FaTachometerAlt,
  FaBars,
  FaBuilding,
  FaListAlt,
} from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import ChangePasswordForm from "../components/ChangePasswordForm";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }
    (async () => {
      try {
        const data = await apiFetch("/api/auth/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        if (data.role === "jobseeker") {
          const jobs = await apiFetch("/api/jobs/recommendations", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          setRecommendations(jobs);
        } else {
          setRecommendations([]);
        }
      } catch {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      }
    })();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-green-600 mb-4"
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
          <span className="text-lg text-green-700 font-semibold">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  const sidebarWidth = sidebarCollapsed ? "w-20" : "w-64";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex font-sans">
      <aside
        className={`${sidebarWidth} bg-white shadow-lg flex flex-col justify-between py-8 px-2 border-r border-green-100 transition-all duration-300`}
      >
        <div>
          {/* Collapse/Expand Button - Centered Top */}
          <div className="flex items-center justify-center mb-4">
            <button
              className="p-2 rounded-lg hover:bg-green-100 transition-all"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setSidebarCollapsed((prev) => !prev)}
            >
              <FaBars
                className={`h-6 w-6 text-green-600 ${
                  sidebarCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div className="flex flex-col items-center mb-8">
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center">
                {user.profilePic ? (
                  <img
                    src={`${API_BASE}/uploads/profile_pics/${user.profilePic}`}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover border-2 border-green-300 shadow mb-2"
                  />
                ) : (
                  <HiOutlineUserCircle className="h-10 w-10 text-green-300 mb-2" />
                )}
                <span className="text-green-700 font-bold text-base mb-2">
                  {user.name.slice(0, 4)}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {user.profilePic ? (
                  <img
                    src={`${API_BASE}/uploads/profile_pics/${user.profilePic}`}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover border-4 border-green-300 shadow"
                  />
                ) : (
                  <HiOutlineUserCircle className="h-24 w-24 text-green-300" />
                )}
                <span
                  className="block text-xl font-extrabold text-green-700 tracking-tight text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
                  title={user.name}
                  style={{ width: "100%" }}
                >
                  {user.name}
                </span>
                <span className="mt-2 inline-flex items-center bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold capitalize shadow">
                  {user.role === "employer" ? (
                    <FaBriefcase className="h-4 w-4 mr-1" />
                  ) : (
                    <FaUser className="h-4 w-4 mr-1" />
                  )}
                  {user.role}
                </span>
              </div>
            )}
          </div>
          <nav className="flex flex-col gap-4 items-center">
            <div className="w-full flex flex-col items-center">
              {user.role === "jobseeker" && (
                <button
                  className={`flex items-center gap-2 text-blue-700 bg-blue-100 font-semibold px-3 py-2 rounded-lg shadow hover:bg-blue-200 transition-all w-full justify-center mt-2 ${
                    sidebarCollapsed ? "flex-col px-2 py-2" : ""
                  }`}
                  onClick={() => navigate("/upload-resume")}
                >
                  <FaFileUpload className="h-5 w-5" />
                  {!sidebarCollapsed && <span>Resume Upload</span>}
                </button>
              )}
              <button
                className={`flex items-center gap-2 text-green-700 font-semibold px-3 py-2 rounded-lg hover:bg-green-50 transition-all w-full justify-center ${
                  sidebarCollapsed ? "flex-col px-2 py-2" : ""
                }`}
                onClick={() => navigate("/dashboard")}
              >
                <FaBriefcase className="h-5 w-5" />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </button>
              <button
                className={`flex items-center gap-2 text-green-700 font-semibold px-3 py-2 rounded-lg hover:bg-green-50 transition-all w-full justify-center ${
                  sidebarCollapsed ? "flex-col px-2 py-2" : ""
                }`}
                onClick={() => navigate("/jobs")}
              >
                <FaBriefcase className="h-5 w-5" />
                {!sidebarCollapsed && <span>Jobs</span>}
              </button>
              <button
                className={`flex items-center gap-2 text-green-700 font-semibold px-3 py-2 rounded-lg hover:bg-green-50 transition-all w-full justify-center ${
                  sidebarCollapsed ? "flex-col px-2 py-2" : ""
                }`}
                onClick={() => navigate("/profile")}
              >
                <FaUser className="h-5 w-5" />
                {!sidebarCollapsed && <span>Profile</span>}
              </button>
              {user.role === "employer" && (
                <>
                  <button
                    className={`flex items-center gap-2 text-white bg-green-600 font-semibold px-3 py-2 rounded-lg shadow hover:bg-green-700 transition-all w-full justify-center ${
                      sidebarCollapsed ? "flex-col px-2 py-2" : ""
                    }`}
                    onClick={() => navigate("/post-job")}
                  >
                    <FaPlusCircle className="h-5 w-5" />
                    {!sidebarCollapsed && <span>Post a Job</span>}
                  </button>
                  <button
                    className={`flex items-center gap-2 text-purple-700 bg-purple-100 font-semibold px-3 py-2 rounded-lg shadow hover:bg-purple-200 transition-all w-full justify-center mt-2 ${
                      sidebarCollapsed ? "flex-col px-2 py-2" : ""
                    }`}
                    onClick={() => navigate("/manage-applications")}
                  >
                    <FaListAlt className="h-5 w-5" />
                    {!sidebarCollapsed && <span>Manage Applications</span>}
                  </button>
                  <button
                    className={`flex items-center gap-2 text-blue-600 bg-blue-100 font-semibold px-3 py-2 rounded-lg shadow hover:bg-blue-200 transition-all w-full justify-center mt-2 ${
                      sidebarCollapsed ? "flex-col px-2 py-2" : ""
                    }`}
                    onClick={() => navigate("/create-company-profile")}
                  >
                    <FaBuilding className="h-5 w-5" />
                    {!sidebarCollapsed && <span>Company Profile</span>}
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-2 mt-8">
          <button
            className={`flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all w-full justify-center ${
              sidebarCollapsed ? "flex-col px-2 py-2" : ""
            }`}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="h-5 w-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col px-2 sm:px-8 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 border-b border-green-200 pb-4 gap-2">
          <div className="flex items-center gap-3">
            <FaTachometerAlt className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-700 font-sans tracking-tight">
              Dashboard
            </h1>
            <span className="ml-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {user.role}
            </span>
          </div>
          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-base font-semibold break-all">
            {user.email}
          </span>
        </div>
        {/* Recommendations Card - Professional Placement */}
        {user && user.role === "jobseeker" && (
          <div className="w-full max-w-5xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl shadow-lg p-6 border border-green-200 flex flex-col">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <FaBriefcase className="h-7 w-7 text-green-600" />
                Recommended Jobs For You
              </h2>
              {recommendations.length === 0 ? (
                <span className="text-gray-500 text-base">
                  No recommendations found.
                </span>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {recommendations.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white rounded-xl border border-green-100 shadow p-5 flex flex-col gap-2 hover:shadow-lg transition-all"
                    >
                      <span className="text-lg font-semibold text-green-700">
                        {job.title}
                      </span>
                      <span className="text-sm text-gray-600">
                        {job.company ? job.company.name : ""}
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.location}
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.requirements}
                      </span>
                      <button
                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all w-fit"
                        onClick={() =>
                          navigate(`/jobs/${job._id}`, { replace: false })
                        }
                      >
                        View Job
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6 mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 border border-green-100 flex flex-col items-center">
            <FaUser className="h-10 w-10 text-green-500 mb-2" />
            <h2 className="text-xl font-bold text-green-700 mb-1">Profile</h2>
            <p className="text-gray-600 mb-1">{user.name}</p>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
              {user.role}
            </span>
            <button
              className="mt-2 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all"
              onClick={() => navigate("/profile")}
            >
              <FaUser className="h-5 w-5" /> View Profile
            </button>
            <button
              className="mt-2 w-full flex items-center justify-center gap-2 bg-yellow-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all"
              onClick={() => setShowModal(true)}
            >
              <FaUserCircle className="h-5 w-5" /> Change Password
            </button>
          </div>
          {/* Recent Activity Card */}
          <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 border border-green-100 flex flex-col items-center w-full min-w-0">
            <FaHistory className="h-10 w-10 text-green-500 mb-2" />
            <h2 className="text-xl font-bold text-green-700 mb-1">
              Recent Activity
            </h2>
            <ul className="text-gray-700 text-base font-medium list-disc pl-4 mb-2 w-full break-words">
              <li>
                <span className="font-semibold text-green-700">
                  Last login:
                </span>{" "}
                Today
              </li>
              <li>
                <span className="font-semibold text-green-700">Role:</span>{" "}
                {user.role}
              </li>
              <li>
                <span className="font-semibold text-green-700">Email:</span>{" "}
                <span className="break-all">{user.email}</span>
              </li>
            </ul>
            <button
              onClick={() =>
                user.role === "jobseeker"
                  ? navigate("/jobs", { state: { showAppliedOnly: true } })
                  : navigate("/jobs")
              }
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all"
            >
              <FaBriefcase className="h-5 w-5" />
              <span>
                {user.role === "jobseeker" ? "Applied Jobs" : "View Jobs"}
              </span>
            </button>
          </div>
          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 border border-green-100 flex flex-col items-center w-full min-w-0">
            <FaPlusCircle className="h-10 w-10 text-green-500 mb-2" />
            <h2 className="text-xl font-bold text-green-700 mb-1">
              Quick Actions
            </h2>
            {user.role === "employer" ? (
              <>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all mb-2"
                  onClick={() => navigate("/post-job")}
                >
                  <FaPlusCircle className="h-5 w-5" />
                  <span>Post a Job</span>
                </button>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition-all mb-2"
                  onClick={() => navigate("/manage-applications")}
                >
                  <FaListAlt className="h-5 w-5" />
                  <span>Manage Applications</span>
                </button>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all mb-2"
                  onClick={() => navigate("/create-company-profile")}
                >
                  <FaBuilding className="h-5 w-5" />
                  <span>Company Profile</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all mb-2"
                  onClick={() => navigate("/jobs")}
                >
                  <FaBriefcase className="h-5 w-5" />
                  <span>Explore Opportunities</span>
                </button>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all mb-2"
                  onClick={() => navigate("/upload-resume")}
                >
                  <FaFileUpload className="h-5 w-5" />
                  <span>Resume Upload</span>
                </button>
              </>
            )}
            <button
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition-all"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        {/* Modal for Change Password */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold text-green-700 mb-4">
                Change Password
              </h2>
              <ChangePasswordForm
                onSuccess={() => {
                  setShowModal(false);
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  toast.success(
                    "Password changed successfully. Please login again."
                  );
                  navigate("/login");
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
