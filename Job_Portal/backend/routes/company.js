const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

// Create company profile
router.post("/", authMiddleware, companyController.createCompany);

// Get all companies
router.get("/", companyController.getCompanies);

// Get company by ID
router.get("/me", authMiddleware, companyController.getMyCompanyProfile);
router.get("/:id", companyController.getCompanyById);

// Update company profile
router.put("/:id", authMiddleware, companyController.updateCompany);

// Delete company profile
router.delete("/:id", authMiddleware, companyController.deleteCompany);

// Get my company profile

module.exports = router;
