const { model, Schema } = require("mongoose");

const bookSchema = new Schema(
  {
    ISBN: {
      type: Number,
      primaryKey: true,
    },
    title: {
      type: String,
      required: true,
    },
    bookCover: {
      type: String,
      required: true,
      default: "http://localhost:3001/books/default_book.png",
    },
    summary: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    noOfCopies: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);

module.exports = Book;
