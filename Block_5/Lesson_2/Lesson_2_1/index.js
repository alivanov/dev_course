const express = require("express");
const bodyParser = require("body-parser"); //to get req.body json data
const app = express();
//===============================

const db = require("./db");
const Book = require("./db//models/book");
const Author = require("./db//models/author");
const Genre = require("./db//models/genre");

//===============================

app.get("/books", async (req, res, next) => {
  try {
    const books = await Book.find(); //.populate("author").populate('genre');
    res.send(books);
  } catch (e) {
    next(e);
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })
      .populate("author")
      .populate("genre");
    res.send(book);
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "Book doesn't exist!" });
  }
});

app.post("/books", bodyParser.json(), async (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: "created using api!",
    isbn: "1234567890",
    genre: req.body.genre
  });

  try {
    await book.save();
    res.send(book);
  } catch (e) {
    next(e);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (e) {
    res.status(404).send({ message: "Book doesn't exist!" });
  }
});

app.patch("/books/:id", bodyParser.json(), async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });

    if (req.body.title) {
      book.title = req.body.title;
      await book.save();
    }

    res.send(book);
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "Book doesn't exist!" });
  }
});

//Note the virtuals!
app.get("/authors", async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (e) {
    next(e);
  }
});

app.get("/authors/:id", async (req, res, next) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    res.send(author);
  } catch (e) {
    next(e);
  }
});

//===============================
//paginated data example

const PER_PAGE = 5;

app.get("/v2/books", async (req, res) => {
  const page = Math.max(0, req.query.page);

  try {
    const books = await Book.find()
      .limit(PER_PAGE)
      .skip(PER_PAGE * page)
      .sort({
        title: "desc"
      })
      .populate("author")
      .populate("genre");

    const totalBooks = await Book.countDocuments();

    res.send({
      data: books,
      meta: {
        page: page,
        totalPages: Math.ceil(totalBooks / PER_PAGE)
      }
    });
  } catch (e) {
    next(e);
  }
});
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
