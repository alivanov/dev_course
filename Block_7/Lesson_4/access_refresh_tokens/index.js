const express = require("express");
const bodyParser = require("body-parser");
//===============================

require("./db");
require("./db//models");

//===============================
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const products = require("./controllers/products");
const auth = require("./controllers/auth");

const authMiddleware = require("./middleware/auth");

app.get("/products", authMiddleware, products.getAll);

app.post("/signin", auth.signIn);
app.post("/signup", auth.signUp);
app.post("/refresh-tokens", auth.refreshTokens);

//================================

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function (req, res) {
  res.status(404).send({ message: "PAGE NOT FOUND!" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//===============================

app.listen(5555, () => {
  console.log("Node server started, PORT: 5555");
});
