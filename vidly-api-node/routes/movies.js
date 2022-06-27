const mongoose = require("mongoose");
const express = require("express");
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

// mongoose.connect('mongodb://localhost/vidly')
//     .then(() => console.log("Connected to Vidly - Movies"))
//     .catch((err) => console.log('Error', err.message));

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) res.status(404).send("Requested movie not found");
  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // check for genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  try {
    // movie = await movie.save(); // resets movie after saving, only demonstrates it returns a movie document.
    // movie object is set my the driver, not mongodb. dont need to reset this to return the id
    await movie.save();
    console.log("Movie successfully saved");
  } catch (err) {
    console.error("Error", err.message);
  }

  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  console.log(req.body);
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!movie)
    return res.status(404).send("The requested movie has not been found");

  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The requested movie has not been found");

  res.send(movie);
});

module.exports = router;
