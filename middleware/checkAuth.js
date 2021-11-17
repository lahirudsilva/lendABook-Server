const jwt = require("jsonwebtoken");
const models = require("../models");

module.exports = (admin) => async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split("Bearer ")[1]; // bearer
  } else {
    return res.status(403).json({ error: "Unauthoraized" });
  }

  let auth_token;

  jwt.verify(token, process.env.JWT_KEY, (error, decodedToken) => {
    auth_token = decodedToken;
  });

  //If token is not succesfully decoded
  if (!auth_token) return res.status(403).json({ error: "Unauthoraized" });

  // console.log(auth_token.email);
  let user;

  try {
    //Check if user exists
    user = await models.User.findOne({ where: { email: auth_token.email } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  //If user doesnt exist send error response
  if (!user) return res.status(403).json({ error: "Unauthoraized" });

  //If using as admin authorization middleware. check if user is admin
  if (admin === "admin") {
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Unauthoraized" });
    }
  }

  req.userData = user;

  return next();
};
