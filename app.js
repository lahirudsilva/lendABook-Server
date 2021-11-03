const express = require('express');
const app = express();

// allows api for parsing json
app.use(express.json()); 

const booksRoute = require('./routes/books');
app.use("/books", booksRoute);

module.exports = app;