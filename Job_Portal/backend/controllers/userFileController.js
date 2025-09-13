const File = require("../models/File");
const User = require("../models/User");

// Get file metadata (filename) by user and type
exports.getUserFileMeta = async (req, res) => {
  try {
    const { userId, fileType } = req.params;
    const file = await File.findOne({ user: userId, type: fileType });
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json({ filename: file.filename });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch file metadata", error: err.message });
  }
};

// Delete file by user and type
exports.deleteUserFile = async (req, res) => {
  try {
    const { userId, fileType } = req.params;
    const result = await File.findOneAndDelete({
      user: userId,
      type: fileType,
    });
    if (!result) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json({ message: "File deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete file", error: err.message });
  }
};
// Save uploaded file (profilePic or resume) to DB
exports.uploadUserFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const { fileType } = req.body;
    if (!fileType || !["profilePic", "resume"].includes(fileType)) {
      return res.status(400).json({ message: "Invalid file type" });
    }
    // Overwrite existing file for user and type
    const updated = await File.findOneAndUpdate(
      { user: req.user._id, type: fileType },
      {
        user: req.user._id,
        type: fileType,
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
        uploadedAt: new Date(),
      },
      { upsert: true, new: true, strict: false }
    );
    res.json({ message: "File uploaded", fileId: updated._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to upload file", error: err.message });
  }
};

// Get file by user and type
exports.getUserFile = async (req, res) => {
  try {
    const { userId, fileType } = req.params;
    const file = await File.findOne({ user: userId, type: fileType });
    if (!file) return res.status(404).json({ message: "File not found" });
    res.set("Content-Type", file.contentType);
    res.send(file.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch file", error: err.message });
  }
};
