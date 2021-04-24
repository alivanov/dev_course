const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: String,
    price: mongoose.Schema.Types.Decimal128
  }
);

ProductSchema.virtual("id").get(function () {
  return this._id;
});

module.exports = mongoose.model("Product", ProductSchema);
