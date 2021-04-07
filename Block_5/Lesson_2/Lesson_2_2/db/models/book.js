const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: [{ type: String }]
});

//Export model
module.exports = mongoose.model("Book", BookSchema);
