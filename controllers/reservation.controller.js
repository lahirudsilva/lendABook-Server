const req = require("express/lib/request");
const res = require("express/lib/response");
const models = require("../models");

/*Book reservation*/
exports.reserveBook = async (req, res) => {
  // Create and save the order

  const newReservation = {
    reserveDate: req.body.reserve,
    returnDate: req.body.returnDate,
    status: "pending",
    charge: req.body.charge,
    UserId: req.body.userId,
    sub: req.body.subBooks,
    cart: req.body.cartLength,
  };

  //check if books exceed subscription limit
  if (newReservation.sub < newReservation.cart) {
    res.status(401).json({
      message:
        " Sorry! You can not reserve more than " +
        newReservation.sub +
        " Books at a time",
    });
    return;
  }

  console.log(newReservation);
  console.log(req.body.books);
  const savedReservation = await models.Reservation.create(newReservation);

  req.body.books.cartItems.forEach(async (item) => {
    // Search for the book with the givenId and make sure it exists. If it doesn't, respond with status 400.

    const _book = await models.Book.findByPk(item.ISBN);
    if (!_book) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Create a dictionary with which to create the bookreservation
    const po = {
      reservatonId: savedReservation.id,
      bookId: item.ISBN,
    };

    // Create and save a BookReservation
    const savedBookReservation = await models.BookReservation.create(
      po
      // { w: 1 },
      // { returning: true }
    );
    // If everything goes well, respond with the order
    return res.status(200).json({ message: "Reservation succeeded!" });
  });
};

/*Movie reservation*/
exports.reserveMovie = async (req, res) => {
  // Create and save the order

  const newReservation = {
    reserveDate: req.body.reserve,
    returnDate: req.body.returnDate,
    status: "pending",
    charge: req.body.charge,
    UserId: req.body.userId,
    sub: req.body.subVideos,
    cart: req.body.cartLength,
  };
  console.log(newReservation);

  const subv = parseInt(req.body.subVideos);
  const length = parseInt(req.body.cartLength);
  //check if books exceed subscription limit
  if (subv < length) {
    res.status(401).json({
      message:
        " Sorry! You can not reserve more than " +
        newReservation.sub +
        " Movies at a time",
    });
    return;
  }

  const savedReservation = await models.Reservation.create(newReservation);

  req.body.movies.cartItems.forEach(async (item) => {
    // Search for the book with the givenId and make sure it exists. If it doesn't, respond with status 400.

    const _movie = await models.Movie.findByPk(item.movieId);
    if (!_movie) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Create a dictionary with which to create the bookreservation
    const po = {
      reservatonId: savedReservation.id,
      movieId: item.movieId,
    };

    // Create and save a BookReservation
    const savedBookReservation = await models.MovieReservation.create(
      po
      // { w: 1 },
      // { returning: true }
    );
    // If everything goes well, respond with the order
    return res.status(200).json({ message: "Reservation succeeded!" });
  });
};

exports.getBookReservations = async (req, res) => {
  try {
    const reservations = await models.Reservation.findAll({
      // Make sure to include the books
      include: [
        // {
        //   model: models.User,
        //   as: "user",
        // },
        {
          model: models.Book,
          as: "books",
          required: true,

          // Pass in the book attributes that you want to retrieve
          attributes: [
            "ISBN",
            "title",
            "bookCover",
            "summary",
            "category",
            "author",
            "publisher",
            "isAvailable",
            "rating",
          ],

          through: {
            model: models.BookReservation,
            as: "booksReservations",
            attributes: ["reservatonId", "bookId"],
          },
        },
      ],
    });

    return res.status(200).json({ reservations });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMovieReservations = async (req, res) => {
  try {
    const reservations = await models.Reservation.findAll({
      include: [
        {
          model: models.Movie,
          as: "movies",
          required: true,

          // Pass in the movie attributes that you want to retrieve
          attributes: [
            "movieId",
            "title",
            "movieCover",
            "summary",
            "category",
            "director",
            "production",
            "isAvailable",
            "isAdultOnly",
            "rating",
          ],
          through: {
            model: models.MovieReservation,
            as: "moviesReservations",
            attributes: ["reservatonId", "movieId"],
          },
        },
      ],
    });
    return res.status(200).json({ reservations });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.setReservationsStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  try {
    const reservation = await models.Reservation.findByPk(id);

    //If rent is not found
    if (!reservation)
      return res.status(404).json({ error: "Reservation not found." });

    //If invalid status
    if (status !== "pending" && status !== "collected" && status !== "returned")
      res.status(400).json({ error: "Invalid status." });

    //Set new status and save
    reservation.status = status;
    reservation.save();

    return res.status(200).json({ message: "Successfully changed status" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getMyBookReservations = async (req, res) => {
  const id = req.userData.dataValues.id;
  try {
    const reservations = await models.Reservation.findAll({
      where: { UserId: id },
      include: [
        {
          model: models.Book,
          as: "books",
          required: true,

          // Pass in the book attributes that you want to retrieve
          attributes: [
            "ISBN",
            "title",
            "bookCover",
            "summary",
            "category",
            "author",
            "publisher",
            "isAvailable",
            "rating",
          ],

          through: {
            model: models.BookReservation,
            as: "bookReservations",
            attributes: ["reservatonId", "bookId"],
          },
        },
      ],
    });

    const _reservations = [...reservations];
    return res.status(200).json({ reservations: _reservations });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getMyMovieReservations = async (req, res) => {
  const id = req.userData.dataValues.id;
  try {
    const reservations = await models.Reservation.findAll({
      where: { UserId: id },
      include: [
        {
          model: models.Movie,
          as: "movies",
          required: true,

          // Pass in the book attributes that you want to retrieve
          attributes: [
            "movieId",
            "title",
            "movieCover",
            "summary",
            "category",
            "director",
            "production",
            "isAvailable",
            "isAdultOnly",
            "rating",
          ],

          through: {
            model: models.MovieReservation,
            as: "movieReservations",
            attributes: ["reservatonId", "movieId"],
          },
        },
      ],
    });

    const _reservations = [...reservations];
    return res.status(200).json({ reservations: _reservations });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
