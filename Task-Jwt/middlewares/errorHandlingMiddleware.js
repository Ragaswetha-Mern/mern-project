const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, request, response, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") {
    response.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV == "production") {
    let message = err.message;

    let errorData = new ErrorHandler(message, 400);

    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((val) => val.message);
      errorData = new ErrorHandler(message, 400);
    }

    if (err.name === "CastError") {
      message = `Resource Not Found ${err.path} : ${err.value}`;
      errorData = new ErrorHandler(message, 400);
    }

    if (err.name === "CastError") {
      message = `Resource Not Found ${err.path} : ${err.value}`;
      errorData = new ErrorHandler(message, 400);
    }

    if (err.code == 11000) {
      let message = `Duplicate ${Object.keys(err.keyValue)} error`;
      errorData = new ErrorHandler(message, 400);
    }

    if (err.name == "JSONWebTokenError") {
      let message = `JSON Web Token is invalid. Try again`;
      errorData = new ErrorHandler(message, 400);
    }

    if (err.name == "TokenExpiredError") {
      let message = `JSON Web Token is expired. Try again`;
      errorData = new ErrorHandler(message, 400);
    }

    return response.status(err.statusCode).json({
      success: false,
      messages: errorData.message || "Internal Server Error",
    });
  }
};
