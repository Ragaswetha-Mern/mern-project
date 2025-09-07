const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./asyncErrorHandlingMiddleware");
const jwt = require("jsonwebtoken");
const userData = require("../models/userModel");

exports.isAuthenticatedUser = asyncErrorHandler(
  async (request, response, next) => {
    const { token } = request.cookies;
    if (!token) {
      return next(new ErrorHandler("Invalid Token, Login!!!", 401));
    }
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    request.user = await userData.findById(decryptedToken.id);
    next();
  }
);
exports.authorizedRole = (...roles) => {
  return async (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return next(
        new ErrorHandler(`Role ${request.user.role} is not allowed`, 401)
      );
    }
    next();
  };
};
