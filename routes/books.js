const express = require("express");
const {
  addBooks,
  uploadBookImage,
  getAllBooks,
  getBook,
  toggleAvailability,
  getAvailableBooks,
  getBookPrices,
  updateBookCopies,
  updatebook,
  deleteBook,
  addBooksToMDB,
  getAllBooksFromMDB
} = require("../controllers/book.controller");
const checkAuthMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.post("/add-book", checkAuthMiddleware("admin"), addBooks);
router.get("/:ISBN", checkAuthMiddleware(), getBook);
router.get("/", checkAuthMiddleware(), getAllBooks);
// router.patch("/:ISBN", booksController.updateBookDetails);
router.delete("/:ISBN", checkAuthMiddleware("admin"), deleteBook);
router.post("/book-image/:ISBN", checkAuthMiddleware("admin"), uploadBookImage);
router.get(
  "/book-availability/:ISBN",
  checkAuthMiddleware("admin"),
  toggleAvailability
);
router.get("/available-books/:reserveDate/:returnDate", getAvailableBooks);
router.post("/update-copies", checkAuthMiddleware("admin"), updateBookCopies);
router.post("/update-book", checkAuthMiddleware("admin"), updatebook);
router.post("/add-book-MDB", checkAuthMiddleware("admin"), addBooksToMDB);
router.get("/get-Book-From-MDB", checkAuthMiddleware("admin"), getAllBooksFromMDB);

module.exports = router;
