const models = require("../models");

exports.addBookFavorites = async (req, res) => {
  let newFavorite = {
    UserId: req.body.userId,
    BookISBN: req.body.ISBN,
  };
  console.log();
  try {
    const _favorite = await models.BookFavorites.findOne({
      where: {
        bookISBN: newFavorite.BookISBN,
        UserId: newFavorite.UserId,
      },
    });

    if (_favorite)
      return res
        .status(400)
        .json({ error: { exists: "Book is already in your favorites" } });

    await models.BookFavorites.create(newFavorite);

    return res.status(201).json({ message: "successfully added to favorites" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllBookFavorites = async (req, res) => {
  const user = req.userData.id;
  console.log(user);
  try {
    const favorites = await models.BookFavorites.findAll({
      where: {
        UserId: user,
      },
    });
    console.log({ favorites });
    let _favBooks = [];
    if (favorites) {
      for await (const BookFavorites of favorites) {
        const _book = await models.Book.findByPk(BookFavorites.BookISBN);
        console.log(_book);
        if (_book) {
          if (!_favBooks.some((book) => book.ISBN === _book.ISBN)) {
            _favBooks.push(_book);
          }
        }
      }
    }

    return res.status(200).json({ _favBooks });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.removeBookFavorites = async (req, res) => {
  const dltFav = req.params.id;

  try {
    let _favorite = await models.BookFavorites.findByPk(dltFav);

    if (!_favorite)
      return res
        .status(400)
        .json({ error: { exists: "Book is not in your favorites!" } });

    _favorite.destroy();

    return res.status(201).json({ messge: "book removed from your favorites" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
