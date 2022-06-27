const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
// const asyncMiddleware = require('../middleware/async'); // replaced with express-async-errors
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// mongoose.connect('mongodb://localhost/vidly')
//     .then(() => console.log('Connected to Vidly - Genres...'))
//     .catch(err => console.error('Error', err));

router.get("/", async (req, res) => {
  //asyncMiddleware(
  // throw new Error('Could not get the genres');
  console.log("Getting genres");
  const genres = await Genre.find().sort("name");
  res.send(genres);

  // catch(ex){
  //     // Log exception
  //     // res.status(500).send('Something failed.'); // internal server error

  //     // passing the exception on to the next middleware call (in index.js)
  //     next(ex);
  // }
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The requested genre has not been found");
  res.send(genre);
});

// Create new genres
router.post("/", auth, async (req, res) => {
  // read request header as only auth'd users can create genres

  // object destructuring!
  const { error } = validate(req.body);
  // 400 is bad request
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  // try{
  genre = await genre.save(); //variable so we can reset genre
  // console.log(result);
  // }
  // catch(err){
  // console.error('Error', err.message);
  // }
  res.send(genre);
});

// Update genres
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The requested genre has not been found");

  // genres[genreIdx].genre = req.body.genre;
  res.send(genre);
});

// Delete genres
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The requested genres has not been found");
  res.send(genre);
});

module.exports = router;
