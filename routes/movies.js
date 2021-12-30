const express = require("express");

const checkAuthMiddleware = require("../middleware/checkAuth");

const {
  addMovies,
  getAllMovies,
  uploadMovieImage,
  getMovie,
  toggleAvailability,
  getAvailableMovies,
} = require("../controllers/movie.controller");

const router = express.Router();

router.post("/add-movie", checkAuthMiddleware("admin"), addMovies);
router.get("/", checkAuthMiddleware(), getAllMovies);
router.get("/:movieId", checkAuthMiddleware(), getMovie);
router.post(
  "/movie-image/:movieId",
  checkAuthMiddleware("admin"),
  uploadMovieImage
);
router.get(
  "/movie-availability/:movieId",
  checkAuthMiddleware("admin"),
  toggleAvailability
);

router.get("/available-movies/:reserveDate/:returnDate", getAvailableMovies);

module.exports = router;
