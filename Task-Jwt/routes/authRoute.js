const express = require("express");
const {
  loginUser,
  logoutUser,
  createProfile,
  updateProfile,
  getProfileById,
  changeProfilePassword,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const {
  isAuthenticatedUser,
  authorizedRole,
} = require("../middlewares/authenticatorMiddleware");

const router = express.Router();
router.route("/User/CreateProfile").post(createProfile);
router
  .route("/User/GetProfileById/:id")
  .get(isAuthenticatedUser, getProfileById);
router.route("/User/Login").get(loginUser);
router.route("/User/Logout").get(logoutUser);

module.exports = router;
