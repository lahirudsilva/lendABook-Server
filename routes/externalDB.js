const express = require("express");

const { getAllBooksFromMDB} = require("../controllers/book.controller");


const checkAuthMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuthMiddleware("admin"), getAllBooksFromMDB);


module.exports = router;