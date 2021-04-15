// https://github.com/alex996/presentations

const express = require('express');

//================================

const app = express();

//================================

const sessionManagement = require('./sessionManagement');

//================================

const models = require('./models');
const Todo = models.Todo;
const User = models.User;

//================================

// thisl will add 'connect.sid' cookie to browser
// and save session to the database
app.use(sessionManagement);

//================================

app.post('/register', (req, res, next) => {
  res.json({ message: 'registered!' });
});

app.post('/login', (req, res) => {
  res.json({ message: 'logged in!' });
});

//================================

app.get('/', (req, res) => {
  console.log(req.session);

  // session data will be auto-saved in the database
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  res.send(
    `<h1>Public route - available for all! You have visited this page ${req.session.viewCount} times</h1>`,
  );
});

//================================

app.get('/users', (req, res) => {
  User.findAll().then((users) => {
    res.json({ users });
  });
});

app.get('/todos', (req, res) => {
  Todo.findAll().then((todos) => {
    res.json({ todos });
  });
});

app.post('/todos', (req, res) => {
  Todo.create({
    title: req.body.title,
    isDone: req.body.isDone,
  }).then(
    (todo) => {
      res.json(todo);
    },
    (validation) => {
      res.status(422).json({
        errors: validation.errors.map((error) => {
          return { attribute: error.path, message: error.message };
        }),
      });
    },
  );
});

//================================

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function (req, res) {
  res.status(404).send({ message: 'NOT FOUND!' });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//================================

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
