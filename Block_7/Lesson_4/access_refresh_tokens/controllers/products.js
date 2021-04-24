const mongoose = require("mongoose");
const Product = mongoose.model("Product");

const getAll = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.json({ data: products });
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll };
