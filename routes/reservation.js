const express = require("express");

const {
  reserveBook,
  reserveMovie,
  getBookReservations,
  setReservationsStatus,
  getMovieReservations,
  getMyBookReservations,
  getMyMovieReservations
} = require("../controllers/reservation.controller");

const checkAuthMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.post("/books", reserveBook);
router.post("/movies", reserveMovie);
router.get(
  "/allBookReservations",
  checkAuthMiddleware("admin"),
  getBookReservations
);
router.get(
  "/allMovieReservations",
  checkAuthMiddleware("admin"),
  getMovieReservations
);
router.post(
  "/bookReservation-status/:id",
  checkAuthMiddleware("admin"),
  setReservationsStatus
);

router.post(
  "/movieReservation-status/:id",
  checkAuthMiddleware("admin"),
  setReservationsStatus
);
router.get(
  "/my-bookReservations",
  checkAuthMiddleware(),
  getMyBookReservations
);
router.get(
  "/my-movieReservations",
  checkAuthMiddleware(),
  getMyMovieReservations
);
module.exports = router;
