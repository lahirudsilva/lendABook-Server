const express = require("express");
const {getMoviePrices} = require("../controllers/movie.controller");
const router = express.Router();

const checkAuthMiddleware = require("../middleware/checkAuth");

router.get("/", getMoviePrices);

module.exports = router;