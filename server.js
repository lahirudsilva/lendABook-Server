const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

//api for cross-origin resource sharing

const db = require("./models");

const server = http.createServer(app);
const port = process.env.PORT || 3001;

const URL = process.env.MOGODBURL;

db.sequelize
  .sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`server is running on PORT:${port}`);
    });
  })
  .then(() => {
    mongoose
      .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to secondary database!");
      });
  })
  .catch((err) => {
    console.log(`Error connecting : ${err.message}`);
  });
