// https://github.com/alex996/presentations
// https://www.youtube.com/watch?v=GihQAC1I39Q&list=RDCMUCFbNIlppjAuEX4znoulh0Cw&index=4

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

//================================

const app = express();

//================================

const sessionManagement = require('./config/sessionManagement');

//================================

const models = require('./models');
const Todo = models.Todo;
const User = models.User;

//================================

// thisl will add 'connect.sid' cookie to browser
// and save session to the database
app.use(sessionManagement);

//================================

// put request body to req.body
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//================================ passport auth

require('./config/passport');

const passwordUtils = require('./lib/passwordUtils');

app.use(passport.initialize());
app.use(passport.session()); //serialize / deserialize

//================================

app.post('/register', async (req, res, next) => {
  const hash = await passwordUtils.genPasswordHash(req.body.password);

  User.create({
    email: req.body.email,
    password: hash,
  }).then(
    (user) => {
      res.json({ user, message: 'registered!' });
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

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'logged in!' });
});

//================================ public route

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

//================================ protected routes

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
