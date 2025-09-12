const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use different folders for profile pics and resumes
    if (file.fieldname === "resume") {
      cb(null, path.join(__dirname, "../uploads/resumes"));
    } else {
      cb(null, path.join(__dirname, "../uploads/profile_pics"));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadMiddleware = multer({ storage });
module.exports = uploadMiddleware;
