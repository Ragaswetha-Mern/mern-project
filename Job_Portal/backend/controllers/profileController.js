const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    // If skills is present and is a string, convert to array
    if (typeof updates.skills === "string") {
      updates.skills = updates.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    }
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: err.message });
  }
};

exports.uploadProfilePic = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  req.user.profilePic = req.file.filename;
  await req.user.save();
  res.json(req.user);
};

exports.removeProfilePic = async (req, res) => {
  try {
    const user = req.user;
    user.profilePic = undefined;
    await user.save();
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove profile photo", error: err.message });
  }
};
