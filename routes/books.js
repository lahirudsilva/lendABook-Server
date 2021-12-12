const express = require("express");
const {
  addBooks,
  uploadBookImage,
  getAllBooks,
  getBook,
  toggleAvailability,
  getAvailableBooks,
  
} = require("../controllers/book.controller");
const checkAuthMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.post("/add-book", checkAuthMiddleware("admin"), addBooks);
router.get("/:ISBN", checkAuthMiddleware(), getBook);
router.get("/", checkAuthMiddleware(), getAllBooks);
// router.patch("/:ISBN", booksController.updateBookDetails);
// router.delete("/:ISBN", booksController.deleteBook);
router.post("/book-image/:ISBN", checkAuthMiddleware("admin"), uploadBookImage);
router.get("/book-availability/:ISBN",checkAuthMiddleware("admin"), toggleAvailability);
router.get("/available-books/:reserveDate/:returnDate", getAvailableBooks);

module.exports = router;
