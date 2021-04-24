const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  tokenId: String,
  userId: String,
});

TokenSchema.virtual("id").get(function () {
  return this._id;
});

module.exports = mongoose.model("Token", TokenSchema);
