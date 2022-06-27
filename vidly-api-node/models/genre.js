const mongoose = require("mongoose");
const joi = require("joi"); // capitalize because it is a class

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
});

// Task 1:
// create service for managing list of genres
const Genre = mongoose.model("Genre", genreSchema); //creates a new collection with the specified schema

function validateGenre(genre) {
  const schema = joi.object({
    name: joi.string().min(5).max(50).required(), // only have validation for this
  });
  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
