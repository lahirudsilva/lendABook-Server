const express = require("express");
const {getBookPrices} = require("../controllers/book.controller");
const router = express.Router();

const checkAuthMiddleware = require("../middleware/checkAuth");

router.get("/", getBookPrices);

module.exports = router;