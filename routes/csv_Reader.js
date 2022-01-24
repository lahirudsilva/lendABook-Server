const csv = require("csv-parser");
const fs = require("fs");
const models = require("../models");
const express = require("express");
const router = express.Router();
const checkAuthMiddleware = require("../middleware/checkAuth");
const wcsv = require("fast-csv");

router.get("/books", checkAuthMiddleware("admin"), async (req, res) => {
  let results = [];
  fs.createReadStream("books.csv")
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      let _booksPurchases = [];
      for await (const data of results) {
        const _book = await models.Book.findByPk(data.ISBN);

        if (_book) {
          data.isNewBook = false;
          if (!_booksPurchases.some((book) => book.ISBN === data.ISBN)) {
            _booksPurchases.push(data);
          }
        } else {
          data.isNewBook = true;
          if (!_booksPurchases.some((book) => book.ISBN === data.ISBN)) {
            _booksPurchases.push(data);
          }
        }
      }
      return res.status(200).json({ _booksPurchases });
    });
});

router.post("/update/:ISBN", checkAuthMiddleware("admin"), async (req, res) => {
  const ISBN = req.params.ISBN;

  console.log(ISBN);
  let updateList = [];
  let results = [];
  fs.createReadStream("books.csv")
    .pipe(csv({}))
    .on("data", async (data) => {
      results.push(data);
    })
    .on("end", async () => {
      for await (const data of results) {
        console.log(data.ISBN);
        if (data.ISBN != ISBN) {
          if (!updateList.some((book) => book.ISBN === data.ISBN)) {
            updateList.push(data);
          }
        }
      }

      console.log("CSV file successfully processed");

      const ws = fs.createWriteStream("books.csv");

      wcsv.write(updateList, { headers: true }).pipe(ws);

      res.status(200).json("success");
    });
});

router.get("/movies", checkAuthMiddleware("admin"), async (req, res) => {
  let results = [];
  fs.createReadStream("movies.csv")
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      let _moviesPurchases = [];
      for await (const data of results) {
        const _movie = await models.Movie.findByPk(data.movieId);

        if (_movie) {
          data.isNewMovie = false;
          if (
            !_moviesPurchases.some((movie) => movie.movieId === data.movieId) //check if data exists in the list
          ) {
            _moviesPurchases.push(data);
          }
        } else {
          data.isNewMovie = true;
          if (
            !_moviesPurchases.some((movie) => movie.movieId === data.movieId)
          ) {
            _moviesPurchases.push(data);
          }
        }
      }
      return res.status(200).json({ _moviesPurchases });
    });
});

router.post(
  "/updateMovies/:movieId",
  checkAuthMiddleware("admin"),
  async (req, res) => {
    const movieId = req.params.movieId;

    console.log(movieId);
    let updateList = [];
    let moviesResults = [];
    fs.createReadStream("movies.csv")
      .pipe(csv({}))
      .on("data", async (data) => {
        moviesResults.push(data);
      })
      .on("end", async () => {
        try {
          for await (const data of moviesResults) {
            console.log(data.movieId);
            if (data.movieId != movieId) {
              if (!updateList.some((movie) => movie.movieId === data.movieId)) {
                updateList.push(data);
              }
            }
          }

          console.log("CSV file successfully processed");

          const ws = fs.createWriteStream("movies.csv");

          wcsv.write(updateList, { headers: true }).pipe(ws);

          res.status(200).json("success");
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      });
  }
);

module.exports = router;
