const express = require("express");
const userController = require("../controllers/user.controller");
const checkAuthMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register", userController.signUp);
router.post("/login", userController.login);
router.get(
  "/LoggedUser",
  checkAuthMiddleware.checkAuth,
  userController.getLoggedUser
);

module.exports = router;
