const setResponseWithJwtToken = (response, statusCode, userData) => {
  const userToken = userData.getJwtToken();

  const cookieeOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIEE_EXPIRY_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  response.status(statusCode).cookie("token", userToken, cookieeOptions).json({
    success: true,
    user: userData,
    token: userToken,
  });
};
module.exports = setResponseWithJwtToken;
