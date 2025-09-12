import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaAlignLeft,
} from "react-icons/fa";

export default function EditJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCompanies, setUserCompanies] = useState([]);
  const navigate = useNavigate();

  // Fetch job details
  useEffect(() => {
    apiFetch(`/api/jobs/${id}`, { method: "GET" })
      .then((data) => setJob(data))
      .catch(() => toast.error("Failed to load job"))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch current user's companies for dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await apiFetch("/api/company-profile/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res && res._id) {
          setUserCompanies([res]);
        }
      } catch {
        setUserCompanies([]);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setJob({ ...job, company: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch(`/api/jobs/${id}`, {
        method: "PUT",
        body: {
          ...job,
          company: job.company, // This should be the ObjectId
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Job updated!");
      navigate("/jobs");
    } catch {
      toast.error("Failed to update job");
    }
  };

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
          Edit Job
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 px-10 pb-10"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaBuilding className="h-6 w-6 text-green-600" />
          <select
            name="company"
            value={
              typeof job.company === "object"
                ? job.company._id
                : job.company || ""
            }
            onChange={handleCompanyChange}
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            required
          >
            <option value="">Select your company</option>
            {userCompanies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaBriefcase className="h-6 w-6 text-green-600" />
          <input
            name="title"
            value={job.title || ""}
            onChange={handleChange}
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            placeholder="Job Title"
            required
          />
        </div>
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
          <input
            name="location"
            value={job.location || ""}
            onChange={handleChange}
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            placeholder="Location"
            required
          />
        </div>
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaMoneyBillWave className="h-6 w-6 text-green-600" />
          <input
            name="salary"
            value={job.salary || ""}
            onChange={handleChange}
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
            placeholder="Salary"
          />
        </div>
        <div className="flex items-start gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
          <FaAlignLeft className="h-6 w-6 text-green-600 mt-2" />
          <textarea
            name="description"
            value={job.description || ""}
            onChange={handleChange}
            className="border-none bg-transparent outline-none w-full font-medium text-gray-800 resize-none"
            placeholder="Description"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold shadow hover:from-green-600 hover:to-green-700 transition-all text-lg"
          style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
