const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Get resume for current user
exports.getResume = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ message: "Only jobseekers can view resumes." });
    }
    const user = await User.findById(req.user._id);
    if (!user || !user.resume) {
      return res.status(404).json({ message: "No resume found." });
    }
    res.json({ resume: user.resume });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch resume.", error: err.message });
  }
};

// Update (re-upload) resume for current user
exports.updateResume = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("User info:", req.user);
    if (!req.user || req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ message: "Only jobseekers can update resumes." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // Optionally delete old resume file here
    await User.findByIdAndUpdate(
      req.user._id,
      { resume: req.file.filename },
      { new: true }
    );
    res.json({ message: "Resume updated!", resume: req.file.filename });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update resume.", error: err.message });
  }
};

// Delete resume for current user
exports.deleteResume = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ message: "Only jobseekers can delete resumes." });
    }
    const user = await User.findById(req.user._id);
    if (!user || !user.resume) {
      return res.status(404).json({ message: "No resume found." });
    }
    // Optionally delete file from disk
    await User.findByIdAndUpdate(req.user._id, { $unset: { resume: 1 } });
    res.json({ message: "Resume deleted." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete resume.", error: err.message });
  }
};

exports.uploadResume = async (req, res) => {
  console.log("File received (req.file):", req.file);
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  console.log("User info:", req.user);
  try {
    if (!req.user || req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ message: "Only jobseekers can upload resumes." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // Save file path in user document
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resume: req.file.filename },
      { new: true }
    );
    if (!user) {
      return res.status(500).json({ message: "Failed to update user resume." });
    }
    res.json({ message: "Resume uploaded!", resume: req.file.filename });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to upload resume.", error: err.message });
  }
};
