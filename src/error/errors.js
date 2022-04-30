const createError = require("http-errors");

const notfound = async (req, res, next) => {
  next(createError.NotFound("Oops! We can't find what you're looking for"));
};

const defaultHandler = async (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.isJoi === true) {
    err.status = 400;
  }
  res.status(err.status || 500);
  res.send({
    success: false,
    error:
      err.message ||
      "There was an error procesing your request, please try again later",
  });
};

module.exports = {
  notfound,
  defaultHandler,
};
