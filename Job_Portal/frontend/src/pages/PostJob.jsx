import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/http";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaListAlt,
  FaBuilding,
} from "react-icons/fa";

export default function PostJob() {
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    company: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [userCompanies, setUserCompanies] = useState([]);
  const navigate = useNavigate();

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
          setForm((prev) => ({
            ...prev,
            company: res._id, // Set ObjectId for company
          }));
        }
      } catch {
        setUserCompanies([]);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (userCompanies.length === 1) {
      setForm((prev) => ({
        ...prev,
        company: userCompanies[0]._id,
      }));
    }
    // Show modal if no company registered (on load)
    if (userCompanies.length === 0) {
      setShowCompanyModal(true);
    }
  }, [userCompanies]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Required field validation
    if (
      !form.company ||
      !form.title ||
      !form.description ||
      !form.location ||
      !form.salary
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await apiFetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: { ...form }, // company is ObjectId
      });
      toast.success("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  // Find selected company object for display
  const selectedCompany = userCompanies.find((c) => c._id === form.company);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 font-sans">
      {showCompanyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              No Company Registered
            </h3>
            <p className="text-gray-700 mb-6 text-center">
              You must register a company before posting a job.
              <br />
              Would you like to register a company now?
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-green-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-green-700 transition-all"
                onClick={() => {
                  setShowCompanyModal(false);
                  navigate("/company-profile");
                }}
              >
                Yes, Register Company
              </button>
              <button
                type="button"
                className="bg-gray-200 text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-300"
                onClick={() => {
                  setShowCompanyModal(false);
                  navigate("/dashboard");
                }}
              >
                No, Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
      <form
        className="bg-white rounded-2xl shadow-xl p-10 border border-green-100 w-full max-w-xl flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="mb-4 self-start bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-all"
          onClick={() => navigate("/dashboard")}
        >
          ← Go back to Dashboard
        </button>
        <div className="flex items-center gap-3 mb-6">
          <FaBriefcase className="h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-extrabold text-green-700 font-sans tracking-tight">
            Post a New Job
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-700 font-semibold">Company Name</label>
          <div className="flex items-center gap-2">
            <FaBuilding className="h-5 w-5 text-green-400" />
            <select
              name="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
              className="border border-green-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select your company</option>
              {userCompanies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {selectedCompany && (
            <div className="text-green-700 font-semibold mt-2">
              Selected Company: {selectedCompany.name}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-700 font-semibold">Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Frontend Developer"
            value={form.title}
            onChange={handleChange}
            required
            className="border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-700 font-semibold">Description</label>
          <textarea
            name="description"
            placeholder="Describe the job role and responsibilities"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-700 font-semibold">Requirements</label>
          <input
            type="text"
            name="requirements"
            placeholder="e.g. React, Node.js, MongoDB"
            value={form.requirements}
            onChange={handleChange}
            required
            className="border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-700 font-semibold">Location</label>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="h-5 w-5 text-green-400" />
            <input
              type="text"
              name="location"
              placeholder="e.g. Remote, Bangalore"
              value={form.location}
              onChange={handleChange}
              required
              className="border border-green-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-700 font-semibold">Salary</label>
          <div className="flex items-center gap-2">
            <FaDollarSign className="h-5 w-5 text-green-400" />
            <input
              type="text"
              name="salary"
              placeholder="e.g. ₹10,00,000/year"
              value={form.salary}
              onChange={handleChange}
              required
              className="border border-green-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded-lg font-bold shadow hover:bg-green-700 transition-all text-lg"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
