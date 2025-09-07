const asyncCatchErrorHandler = require("../middlewares/asyncErrorHandlingMiddleware");
const user = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const setResponseWithToken = require("../utils/jwt");

exports.createProfile = asyncCatchErrorHandler(
  async (request, response, next) => {
    const { name, email, password, avator } = request.body;
    const createdUser = await user.create({
      name,
      email,
      password,
      avator,
    });
    if (createdUser) {
      setResponseWithToken(response, 201, createdUser);
    }
  }
);

exports.getProfileById = asyncCatchErrorHandler(
  async (request, response, next) => {
    const userData = await user.findById(request.params.id);
    if (!userData) {
      return next(new ErrorHandler("User Not Found", 400));
    }
    response.status(200).json({
      success: true,
      user: userData,
      message: "User Retrieved Successfully",
    });
  }
);

exports.loginUser = asyncCatchErrorHandler(async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password)
    return next(new ErrorHandler("Please enter Email & Password", 400));
  const userData = await user.findOne({ email }).select("+password");
  if (!userData || !(await userData.isPasswordValidAsync(password))) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  userData.password = undefined;

  setResponseWithToken(response, 200, userData);
});

exports.logoutUser = (request, response, next) => {
  response
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "User Logged out Successfully",
    });
};

