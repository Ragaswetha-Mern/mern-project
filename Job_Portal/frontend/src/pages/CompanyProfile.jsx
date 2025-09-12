import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaEnvelope,
  FaArrowLeft,
  FaAlignLeft,
} from "react-icons/fa";
import { apiFetch } from "../utils/http";

export default function CompanyProfile() {
  const [company, setCompany] = useState({
    name: "",
    location: "",
    email: "",
    description: "",
    logo: "",
  });
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const navigate = useNavigate();

  // Fetch existing company profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch company profile for current user
        const res = await apiFetch("/api/company-profile/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res && res._id) {
          setCompany({
            name: res.name || "",
            location: res.location || "",
            email: res.email || "",
            description: res.description || "",
            logo: res.logo || "",
          });
          setCompanyId(res._id); // <-- Set companyId here
        }
      } catch {
        // No existing profile, do nothing
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (companyId) {
        // Edit existing company profile
        await apiFetch(`/api/company-profile/${companyId}`, {
          method: "PUT",
          body: company,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Company profile updated!");
      } else {
        // Create new company profile
        await apiFetch("/api/company-profile", {
          method: "POST",
          body: company,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Company profile created!");
      }
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.message || "Failed to save company profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-green-200 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-2xl px-8 py-12">
        <div className="flex items-center mb-8">
          <button
            className="flex items-center gap-2 bg-gray-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-2xl font-bold text-green-700 ml-6 tracking-tight">
            Company Profile
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div
            className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3"
            style={{
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontSize: "1.1rem",
            }}
          >
            <FaBuilding className="h-6 w-6 text-green-600" />
            <input
              name="name"
              value={company.name}
              onChange={handleChange}
              className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
              placeholder="Company Name"
              required
            />
          </div>
          <div
            className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3"
            style={{
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontSize: "1.1rem",
            }}
          >
            <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
            <input
              name="location"
              value={company.location}
              onChange={handleChange}
              className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
              placeholder="Location"
              required
            />
          </div>
          <div
            className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3"
            style={{
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontSize: "1.1rem",
            }}
          >
            <FaEnvelope className="h-6 w-6 text-green-600" />
            <input
              name="email"
              type="email"
              value={company.email}
              onChange={handleChange}
              className="border-none bg-transparent outline-none w-full font-medium text-gray-800"
              placeholder="Contact Email"
              required
            />
          </div>
          <div
            className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3"
            style={{
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontSize: "1.1rem",
            }}
          >
            <FaAlignLeft className="h-6 w-6 text-green-600" />
            <textarea
              name="description"
              value={company.description}
              onChange={handleChange}
              className="border-none bg-transparent outline-none w-full font-medium text-gray-800 resize-none"
              placeholder="Company Description"
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold shadow hover:from-green-600 hover:to-green-700 transition-all text-lg"
            disabled={loading}
            style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
          >
            {loading
              ? companyId
                ? "Updating..."
                : "Creating..."
              : companyId
              ? "Update Profile"
              : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
