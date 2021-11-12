const jwt = require("jsonwebtoken");
const models = require("../models/user");

function checkAuth(req, res, next) {
  // try {
  //   const token = req.headers.authorization.split("Bearer ")[1]; // bearer
  //   const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  //   req.userDate = decodedToken;
  //   next();
  // } catch (error) {
  //   return res.status(401).json({
  //     message: "Invalid or expired token provided!",
  //     error: error,
  //   });
  // }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split("Bearer ")[1]; // bearer
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (decodedToken === null) {
      return res.status(403).json({
        message: "No token found!",
        error: "Unauthoraized",
      });
    } else {
      req.userData = decodedToken;
      return next();
    }
  } else {
    return res.status(403).json({
      message: "Invalid or expired token provided!",
      error: "Unauthoraized",
    });
  }

  // } catch (error) {
  //   return res.status(401).json({
  //     message: "Invalid or expired token provided!",
  //     error: "Unauthoraized",
  //   });
  // }
}

module.exports = {
  checkAuth: checkAuth,
};
