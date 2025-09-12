const Company = require("../models/Company");

// Create company profile
exports.createCompany = async (req, res) => {
  try {
    const company = new Company({
      ...req.body,
      createdBy: req.user._id, // <-- Add this line
    });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create company", error: err.message });
  }
};

// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch companies", error: err.message });
  }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch company2", error: err.message });
  }
};

// Update company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update company", error: err.message });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete company", error: err.message });
  }
};

// Get my company profile
exports.getMyCompanyProfile = async (req, res) => {
  try {
    console.log("User ID from token:", req.user._id);
    const company = await Company.findOne({ createdBy: req.user._id });
    if (!company)
      return res.status(404).json({ message: "No company profile found" });
    res.json(company);
  } catch (err) {
    res.status(200).json({
      message: "Failed to fetch company profile",
      userId: req.user._id,
    });
  }
};
