import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/http";
import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaAlignLeft,
} from "react-icons/fa";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch(`/api/jobs/${id}`, { method: "GET" })
      .then((data) => setJob(data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-200">
        <span className="text-green-600 text-xl font-semibold">Loading...</span>
      </div>
    );
  if (!job)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-200">
        <span className="text-red-600 text-xl font-semibold">
          Job not found
        </span>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-green-200 font-sans px-0 py-0">
      <div className="flex items-center mb-8 pt-10 pl-10">
        <button
          className="flex items-center gap-2 bg-gray-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <h2 className="text-2xl font-bold text-green-700 ml-6 tracking-tight">
          Job Details
        </h2>
      </div>
      <form
        className="flex flex-col gap-6 px-10 pb-10"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaBuilding className="h-6 w-6 text-green-600" />
          <input
            name="company"
            value={
              typeof job.company === "object"
                ? job.company.name
                : job.company || ""
            }
            disabled
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            placeholder="Company Name"
          />
        </div>
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaBriefcase className="h-6 w-6 text-green-600" />
          <input
            name="title"
            value={job.title || ""}
            disabled
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            placeholder="Job Title"
          />
        </div>
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
          <input
            name="location"
            value={job.location || ""}
            disabled
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            placeholder="Location"
          />
        </div>
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaMoneyBillWave className="h-6 w-6 text-green-600" />
          <input
            name="salary"
            value={job.salary || ""}
            disabled
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            placeholder="Salary"
          />
        </div>
        <div className="flex items-start gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaAlignLeft className="h-6 w-6 text-green-600 mt-2" />
          <textarea
            name="description"
            value={job.description || ""}
            disabled
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800 resize-none"
            placeholder="Description"
            rows={5}
          />
        </div>
      </form>
    </div>
  );
}
