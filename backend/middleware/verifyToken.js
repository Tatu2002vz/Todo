const jwt = require("jsonwebtoken");
const statusCode = require("../enum/statusCode");
const verifyToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      const data = jwt.verify(
        req?.headers?.authorization?.split(" ")[1],
        process.env.SECRET_KEY
      );
      req.user = data;
      next();
    } catch (error) {
        throw new Error('Invalid access token!')
    }
  } else {
    return res.status(statusCode.UNAUTHORIZED).json({
      mes: "Authentication required!",
    });
  }
};
module.exports = {
  verifyToken,
};
