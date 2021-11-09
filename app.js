const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// allows api for parsing json
app.use(express.json());

/*User Routes*/
const userRoute = require("./routes/users");

/*Book Routes*/
const booksRoute = require("./routes/books");
app.use("/books", booksRoute);
app.use("/user", userRoute);

module.exports = app;
