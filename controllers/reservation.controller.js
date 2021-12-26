const models = require("../models");

exports.reserveBook = async (req, res) => {
  // Create and save the order

  const newReservation = {
    reserveDate: req.body.reserve,
    returnDate: req.body.returnDate,
    status: "pending",
    charge: req.body.charge,
    UserId: req.body.userId,
  };
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
