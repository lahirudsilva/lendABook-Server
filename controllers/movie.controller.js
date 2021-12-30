const models = require("../models");
const moment = require("moment");

const { uploadMovieImageMW } = require("../middleware/multer");

const { getMovieList } = require("../util/validators");

//Add movies
exports.addMovies = async (req, res) => {
  let newMovie = {
    movieId: req.body.movieId,
    title: req.body.title,
    movieCover: req.body.movieCover,
    summary: req.body.summary,
    category: req.body.category,
    director: req.body.director,
    production: req.body.production,
    rating: req.body.ratings,
    noOfCopies: req.body.copies,
  };

  try {
    //find book through ISBN
    const _movie = await models.Movie.findOne({
      where: {
        movieId: newMovie.movieId,
      },
    });

    if (_movie)
      return res
        .status(400)
        .json({ error: { ISBN: "Movie ID number already exists" } });

    const movie = await models.Movie.create(newMovie);

    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Get all the movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await models.Movie.findAll();
    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.uploadMovieImage = async (req, res) => {
  // console.log("herereeeeeeeeeeeeee");
  uploadMovieImageMW(req, res, async (error) => {
    if (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        error.message = "File Size is too large.";
      }
      return res.status(500).json({ error: error.message });
    } else {
      if (!req.file) {
        res.status(500).json({ error: "file not found" });
      }
      try {
        const movie = await models.Movie.findByPk(req.params.movieId);

        movie.movieCover = `http://localhost:3001/movies/${req.file.filename}`;

        movie.save();
        return res
          .status(200)
          .json({ message: " Image uploaded successfully" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  });
};

//Get A single movie
exports.getMovie = async (req, res) => {
  try {
    const id = req.params.movieId;
    let movie = await models.Movie.findByPk(id);
    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/* TOGGLE isAvailable PROPERTY */
exports.toggleAvailability = async (req, res) => {
  movie_id = req.params.movieId;

  try {
    let movie = await models.Movie.findByPk(movie_id);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    movie.isAvailable = !movie.isAvailable;
    movie.save();

    return res
      .status(200)
      .json({ message: "Movie availability successfully changed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/* GET LIST OF AVAILABLE RENTS GIVEN DROP OFF AND PICKUP DATE */
exports.getAvailableMovies = async (req, res) => {
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

  let movies = await getMovieList(new Date(reserve), new Date(returnBack));

  return res.status(200).json({ movies });
};