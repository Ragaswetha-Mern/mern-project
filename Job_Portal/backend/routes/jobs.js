const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/jobs
router.get("/", authMiddleware, jobsController.getAllJobs);

// POST /api/jobs
router.post("/", authMiddleware, jobsController.postJob);

router.get(
  "/recommendations",
  authMiddleware,
  jobsController.getRecommendations
); // Get job recommendations
router.put("/:id", authMiddleware, jobsController.updateJob); // Update job
router.delete("/:id", authMiddleware, jobsController.deleteJob); // Delete job
router.get("/:id", authMiddleware, jobsController.getJobById); // Get job by ID
module.exports = router;
