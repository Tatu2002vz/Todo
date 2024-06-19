const statusCode = require("../enum/statusCode");

const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(statusCode.NOT_FOUND);
  next(error);
};

const errHandle = (err, req, res, next) => {
  const stt =
    res.statusCode === statusCode.OK ? statusCode.SERVER_ERROR : res.statusCode;
  return res.status(stt).json({
    mes: err.message,
  });
};

module.exports = {
  notFound,
  errHandle,
};
