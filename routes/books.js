const express = require('express');
const booksController = require('../controllers/book.controller');

const router = express.Router();

router.post("/", booksController.addBooks);
router.get("/:ISBN", booksController.getBook);
router.get("/", booksController.getAllBooks);
router.patch("/:ISBN", booksController.updateBookDetails);
router.delete("/:ISBN", booksController.deleteBook);

module.exports = router;