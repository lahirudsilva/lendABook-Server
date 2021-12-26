const express = require("express");

const { reserveBook} = require("../controllers/reservation.controller");

const router = express.Router();


router.post("/books",  reserveBook);

module.exports = router;