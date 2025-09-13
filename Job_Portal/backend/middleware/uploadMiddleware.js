const multer = require("multer");
const uploadMiddleware = multer({ storage: multer.memoryStorage() });
module.exports = uploadMiddleware;
