const express = require("express");
const router = express.Router();

const {
  uploadResume,
  getResume,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Upload resume
router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("resume"),
  uploadResume
);

// View resume
router.get("/view", authMiddleware, getResume);

// Update resume (re-upload)
router.put(
  "/update",
  authMiddleware,
  uploadMiddleware.single("resume"),
  updateResume
);

// Delete resume
router.delete("/delete", authMiddleware, deleteResume);

module.exports = router;
