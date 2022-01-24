const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// allows api for parsing json
app.use(express.json());

app.use(express.static(__dirname + "/data"));

/*User Routes*/
const userRoute = require("./routes/users");

/*Book Routes*/
const booksRoute = require("./routes/books");

/*Movie Routes*/
const moviesRoute = require("./routes/movies");

// Reservation Routes
const reserveRoute = require("./routes/reservation");

const bookScrapRoute = require("./routes/BookPrices");

const movieScrapeRoute = require("./routes/VideoPrices");

const readCsv = require("./routes/csv_Reader");

const secondaryDB = require("./routes/externalDB");

const bookFavoriteRoute = require("./routes/bookFavorites");

app.use("/books", booksRoute);
app.use("/movies", moviesRoute);
app.use("/user", userRoute);
app.use("/reserve", reserveRoute);
app.use("/getBookPrices", bookScrapRoute);
app.use("/getMoviePrices", movieScrapeRoute);
app.use("/csv", readCsv);
app.use("/bookFavorites", bookFavoriteRoute);
app.use("/sencondDB", secondaryDB);

module.exports = app;
