// https://github.com/alex996/presentations

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//================================

const app = express();

//================================

const models = require('./models');
const Todo = models.Todo;
const User = models.User;

//================================

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//================================

app.post('/register', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.create({
      email: req.body.email,
      password: hashedPassword,
    }).then(
      (user) => {
        res.json({ userId: user.id, message: 'registered' });
      },
      (validation) => {
        res.status(422).json({
          errors: validation.errors.map((error) => {
            return { attribute: error.path, message: error.message };
          }),
        });
      },
    );
  } catch (e) {
    next(e);
  }
});

app.post('/login', (req, res) => {
  res.status(200).send();
});

//================================

app.get('/', (req, res) => {
  res.send('Public route - available for all!');
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
