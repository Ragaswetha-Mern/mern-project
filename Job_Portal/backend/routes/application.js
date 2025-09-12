const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const verifyToken = require("../middleware/authMiddleware");
const { applyJob } = require("../controllers/applicationController");
const multer = require("multer");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// GET /api/applications/user - get all jobs applied by the current user (jobseeker)
router.get("/user", verifyToken, applicationController.getAppliedJobsForUser);

// POST /api/applications - apply for a job (jobseeker only)
router.post("/", verifyToken, uploadMiddleware.single("resume"), applyJob);

// Get all applications for jobs posted by current employer
router.get(
  "/employer",
  authMiddleware,
  applicationController.getApplicationsForEmployer
);

// Update application status
router.put(
  "/:id/status",
  authMiddleware,
  applicationController.updateApplicationStatus
);

router.get("/user", verifyToken, applicationController.getAppliedJobsForUser);

module.exports = router;
