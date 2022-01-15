const models = require("../models");
const moment = require("moment");
const cheerio = require("cheerio");
const axios = require("axios");

const { uploadBookImageMW } = require("../middleware/multer");
// const book = require("../models/book");
// const { response } = require("express");
const { getList } = require("../util/validators");

//Add books
exports.addBooks = async (req, res) => {
  let newBook = {
    ISBN: req.body.ISBN,
    title: req.body.title,
    bookCover: req.body.bookCover,
    summary: req.body.summary,
    category: req.body.category,
    author: req.body.author,
    publisher: req.body.publisher,
    rating: req.body.ratings,
    noOfCopies: req.body.copies,
  };

  try {
    //find book through ISBN
    const _book = await models.Book.findOne({
      where: {
        ISBN: newBook.ISBN,
      },
    });

    if (_book)
      return res
        .status(400)
        .json({ error: { ISBN: "Book ISBN number already exists" } });

    const book = await models.Book.create(newBook);

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.uploadBookImage = async (req, res) => {
  uploadBookImageMW(req, res, async (error) => {
    if (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        error.message = "File Size is too large.";
      }
      return res.status(500).json({ error });
    } else {
      if (!req.file) {
        res.status(500).json({ error: "file not found" });
      }
      try {
        const book = await models.Book.findByPk(req.params.ISBN);

        book.bookCover = `http://localhost:3001/books/${req.file.filename}`;
        book.save();
        return res
          .status(200)
          .json({ message: " Image uploaded successfully" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  });
};

//Get A single book
exports.getBook = async (req, res) => {
  try {
    const id = req.params.ISBN;
    let book = await models.Book.findByPk(id);
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Get all the books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await models.Book.findAll();
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/* TOGGLE isAvailable PROPERTY */
exports.toggleAvailability = async (req, res) => {
  book_id = req.params.ISBN;

  try {
    let book = await models.Book.findByPk(book_id);

    if (!book) return res.status(404).json({ error: "Book not found" });

    book.isAvailable = !book.isAvailable;
    book.save();

    return res
      .status(200)
      .json({ message: "Book availability successfully changed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/* GET LIST OF AVAILABLE RENTS GIVEN DROP OFF AND PICKUP DATE */
exports.getAvailableBooks = async (req, res) => {
  //Get user input
  const userInput = {
    reserveDate: req.params.reserveDate,
    returnDate: req.params.returnDate,
  };

  const reserve = moment(userInput.reserveDate, "YYYY-MM-DD")
    .add(1, "day")
    .format();
  const returnBack = moment(userInput.returnDate, "YYYY-MM-DD")
    .add(1, "day")
    .format();

  let books = await getList(new Date(reserve), new Date(returnBack));

  return res.status(200).json({ books });
};

/* DELETE A BOOK */
// exports.deleteBook = async (req, res) => {
//   try {
//     const ISBN = req.params.ISBN;

//     //Check if vehicle has any rents
//     let rents = await Rent.find({ vehicle: id });

//     if (rents.length > 0)
//       return response.status(400).json({
//         error: { deleteVehicle: "Book cannot be deleted as it has reservations" },
//       });

//     // Delete the vehicle
//     await Vehicle.findByIdAndDelete(id);

//     return response.status(200).json({ message: "Successfully deleted" });
//   } catch (error) {
//     return response.status(500).json({ error });
//   }
// };

/* SCRAPE PRICES FROM WEBSITE */
exports.getBookPrices = async (req, res) => {
  const url = process.env.SCRAPE_URL_BOOK;
  console.log(url);
  try {
    //Get html data from site and load to cheerio
    let result = await axios.get(url);
    // console.log(result);
    const html = result.data;
    const $ = cheerio.load(html);

    // const priceTable = $(".zg-ordered-list");
    const bookPrices = [];

    $(".zg-item-immersion").each((_idx, el) => {
      const bookPrice = $(el);
      const price = bookPrice.find(".p13n-sc-price").text();
      const link = bookPrice.find(".a-link-normal").attr("href");
      const title = bookPrice.find("img").attr("alt");
      const img = bookPrice.find("img").attr("src");

      bookPrices.push({
        price,
        link :`https://amazon.com${link}`,
        title,
        img,
      });
      // console.log(bookPrices)
    }); 

    return res.status(200).json({ bookPrices });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
