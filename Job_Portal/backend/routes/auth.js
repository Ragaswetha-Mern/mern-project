const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User"); // Make sure this import is present

// Registration and login routes (assumed already present)
router.post("/register", authController.register);
router.post("/login", authController.login);

// Forgot password
router.post("/forgot-password", authController.forgotPassword);

// Reset password
router.post("/reset-password", authController.resetPassword);

// Change password (requires authentication)
router.post("/change-password", authMiddleware, authController.changePassword);

// Get current user info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example route
router.get("/", (req, res) => res.send("Auth route working"));

// Add your routes here

module.exports = router;
