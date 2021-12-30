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

app.use("/books", booksRoute);
app.use("/movies", moviesRoute);
app.use("/user", userRoute);
app.use("/reserve", reserveRoute)

module.exports = app;
