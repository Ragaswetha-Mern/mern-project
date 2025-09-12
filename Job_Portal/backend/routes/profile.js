const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Upload profile picture route
router.post(
  "/upload-pic",
  authMiddleware,
  uploadMiddleware.single("profilePic"), // <-- Must match frontend key
  profileController.uploadProfilePic
);

// Get profile route
router.get("/", authMiddleware, profileController.getProfile);

// Update profile route
router.put("/", authMiddleware, profileController.updateProfile);

// Remove profile picture route
router.delete(
  "/remove-pic",
  authMiddleware,
  profileController.removeProfilePic
);

module.exports = router;
