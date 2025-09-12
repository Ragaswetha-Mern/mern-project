import { useEffect, useState } from "react";
import useAppliedJobs from "../hooks/useAppliedJobs";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const showAppliedOnly = location.state?.showAppliedOnly;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [_, setCompanyMap] = useState({});
  const navigate = useNavigate();
  // Only fetch applied jobs for jobseekers
  const appliedApplications = useAppliedJobs(userId);
  const appliedJobIds = Array.isArray(appliedApplications)
    ? appliedApplications.map((app) => app.job)
    : [];

  useEffect(() => {
    fetchJobs();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && (user._id || user.id)) {
      setUserId(user._id || user.id);
      setUserRole(user.role);
    }
    fetchCompanies();
  }, []);

  const fetchJobs = () => {
    apiFetch("/api/jobs", { method: "GET" })
      .then((data) => {
        console.log("/api/jobs response:", data);
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("/api/jobs error:", err);
        setLoading(false);
      });
  };

  const fetchCompanies = async () => {
    try {
      const companies = await apiFetch("/api/company-profile", {
        method: "GET",
      });
      const map = {};
      companies.forEach((c) => {
        map[c._id] = c.name;
      });
      setCompanyMap(map);
    } catch {
      setCompanyMap({});
    }
  };

  const handleDelete = async (id) => {
    setShowDeleteModal(true);
    setDeleteJobId(id);
  };

  const confirmDelete = async () => {
    try {
      await apiFetch(`/api/jobs/${deleteJobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setJobs(jobs.filter((job) => job._id !== deleteJobId));
      setShowDeleteModal(false);
      setDeleteJobId(null);
      toast.error("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
      setShowDeleteModal(false);
      setDeleteJobId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteJobId(null);
  };

  const handleEdit = (id) => {
    navigate(`/edit-job/${id}`);
  };

  // Merge application status into jobs for jobseeker
  const jobsWithStatus = jobs.map((job) => {
    console.log("jobs:", jobs);
    if (userRole === "jobseeker") {
      const app = appliedApplications.find(
        (a) => a.job === job._id || a.job?._id === job._id
      );
      return app ? { ...job, applicationStatus: app.status } : job;
    }
    return job;
  });

  console.log("jobsWithStatus:", jobsWithStatus);
  const jobsToShow =
    userRole === "jobseeker" && showAppliedOnly
      ? jobsWithStatus.filter((job) => appliedJobIds.includes(job._id))
      : userRole === "employer"
      ? jobsWithStatus.filter(
          (job) =>
            job.postedBy === userId ||
            job.postedBy?._id === userId ||
            job.postedBy?.toString() === userId?.toString()
        )
      : jobsWithStatus;
  console.log("jobsToShow:", jobsToShow);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-green-600 text-xl font-semibold">
          Loading jobs...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-green-200 py-10 px-6 font-sans">
      <div className="flex items-center mb-8 gap-6">
        <button
          className="flex items-center gap-2 bg-gray-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">
          {userRole === "jobseeker" && showAppliedOnly
            ? "Applied Jobs"
            : "Explore Opportunities"}
        </h1>
      </div>
      {jobsToShow.length === 0 ? (
        <div className="text-gray-500 text-center text-lg mt-20">
          No jobs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobsToShow.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 flex flex-col justify-between hover:shadow-xl transition relative"
            >
              {/* Edit/Delete buttons in top-right corner */}
              {userId &&
                job.postedBy &&
                (job.postedBy === userId ||
                  job.postedBy._id === userId ||
                  job.postedBy.toString() === userId.toString()) && (
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button
                      className="flex items-center justify-center h-9 w-9 bg-yellow-100 text-yellow-700 rounded-full shadow hover:bg-yellow-200 hover:text-yellow-900 transition"
                      onClick={() => handleEdit(job._id)}
                      title="Edit Job"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      className="flex items-center justify-center h-9 w-9 bg-red-100 text-red-700 rounded-full shadow hover:bg-red-200 hover:text-red-900 transition"
                      onClick={() => handleDelete(job._id)}
                      title="Delete Job"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                )}
              <div className="flex items-center gap-3 mb-2">
                <FaBriefcase className="h-7 w-7 text-green-500" />
                <span className="text-xl font-bold text-green-700">
                  {job.title}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <FaBuilding className="h-5 w-5 text-green-400" />
                <span className="text-green-600 font-semibold">
                  {job.company && typeof job.company === "object"
                    ? job.company.name || job.company._id
                    : job.company || "Company"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <FaMapMarkerAlt className="h-5 w-5 text-green-400" />
                <span className="text-gray-600">{job.location}</span>
              </div>
              {job.salary && (
                <div className="mb-2 text-green-700 font-semibold">
                  Salary: <span className="font-bold">{job.salary}</span>
                </div>
              )}
              <div className="mb-3 text-gray-700 text-sm">
                {job.description?.slice(0, 100)}
                {job.description && job.description.length > 100 ? "..." : ""}
              </div>
              {job.postedBy && (
                <div className="text-sm text-gray-500 mb-1">
                  Posted by: {job.postedBy.name || job.postedBy._id}
                </div>
              )}
              {userRole === "jobseeker" && (
                <div className="mt-auto flex flex-col gap-2">
                  {appliedJobIds.includes(job._id) ? (
                    <>
                      <button
                        className="bg-gray-300 text-gray-500 px-5 py-2 rounded-lg font-semibold shadow cursor-not-allowed"
                        disabled
                      >
                        Applied
                      </button>
                      {/* Application status display */}
                      {job.applicationStatus && (
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border mt-1
                          ${
                            job.applicationStatus === "accepted"
                              ? "bg-green-100 text-green-700 border-green-300"
                              : job.applicationStatus === "rejected"
                              ? "bg-red-100 text-red-700 border-red-300"
                              : "bg-yellow-100 text-yellow-700 border-yellow-300"
                          }`}
                        >
                          Status:{" "}
                          {job.applicationStatus.charAt(0).toUpperCase() +
                            job.applicationStatus.slice(1)}
                        </span>
                      )}
                    </>
                  ) : (
                    <button
                      className="mt-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition-all"
                      onClick={() => navigate(`/apply/${job._id}`)}
                    >
                      Apply Now
                    </button>
                  )}
                  <button
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all"
                    onClick={() => navigate(`/jobs/${job._id}`)}
                  >
                    View Job
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Modal for delete confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
            <h2 className="text-xl font-bold text-red-700 mb-4">
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-green-700 font-semibold hover:bg-gray-300"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
