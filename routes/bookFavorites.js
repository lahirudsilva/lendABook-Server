const express = require("express");
const {
  addBookFavorites,
  getAllBookFavorites,
  removeBookFavorites,
} = require("../controllers/bookFavorites.controller");
const router = express.Router();

const checkAuthMiddleware = require("../middleware/checkAuth");

router.post("/add-favorite", checkAuthMiddleware(), addBookFavorites);
router.get("/", checkAuthMiddleware(), getAllBookFavorites);
router.delete("/:id", checkAuthMiddleware(), removeBookFavorites);

module.exports = router;
