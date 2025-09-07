asyncErrorHandler = (func) => (request, response, next) => {
  return Promise.resolve(func(request, response, next)).catch(next);
};

module.exports = asyncErrorHandler;
