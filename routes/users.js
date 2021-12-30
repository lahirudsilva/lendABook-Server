const express = require("express");
// const userController = require("../controllers/controller");
const checkAuthMiddleware = require("../middleware/checkAuth");
const {
  signUp,
  login,
  getUsers,
  getUser,
  changeIsBlacklisted,
  changeIsVerified,
  getLoggedInUser,
  getUserSubscription,
  uploadUserImage,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", signUp);
router.get("/getSubscription", checkAuthMiddleware(), getUserSubscription);
router.post("/login", login);
router.get("/LoggedUser", checkAuthMiddleware(), getLoggedInUser);
router.get("/", checkAuthMiddleware("admin"), getUsers); //Get all users in the system
router.get("/:id", checkAuthMiddleware(), getUser); //Get information about a specific user
router.get(
  "/set-blacklisted/:id",
  checkAuthMiddleware("admin"),
  changeIsBlacklisted
); //Change isBlacklisted property of selected user
router.get("/set-verified/:id", checkAuthMiddleware("admin"), changeIsVerified); //Change isVerified property of selected user
router.post("/user-image", checkAuthMiddleware(), uploadUserImage);

module.exports = router;
