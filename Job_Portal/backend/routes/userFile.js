const express = require("express");
const router = express.Router();
const userFileController = require("../controllers/userFileController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Upload file (profilePic or resume)
router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("file"),
  userFileController.uploadUserFile
);

// Get file by user and type
router.get("/:userId/:fileType", userFileController.getUserFile);

// Delete file by user and type
router.delete(
  "/:userId/:fileType",
  authMiddleware,
  userFileController.deleteUserFile
);

router.get("/:userId/:fileType/meta", userFileController.getUserFileMeta);

module.exports = router;
