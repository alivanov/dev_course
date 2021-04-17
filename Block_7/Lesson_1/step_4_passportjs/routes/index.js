const passport = require('passport');
const router = require('express').Router();

const models = require('../models');
const passwordUtils = require('../lib/passwordUtils');

const { isAuth, isAdmin } = require('./authMiddleware');
//====================================

const Todo = models.Todo;
const User = models.User;

//==================================== auth routes

router.post('/register', async (req, res, next) => {
  const hash = await passwordUtils.genPasswordHash(req.body.password);

  User.create({
    email: req.body.email,
    password: hash,
    role: req.body.role,
  }).then(
    (user) => {
      res.json({ user, message: 'registered!' });

      //login right after register
      /* passport.authenticate('local')(req, res, () => {
        res.json({ user, message: 'registered!' });
      }); */
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

/*
as postman works on another domain => to test from browser

fetch("http://localhost:3030/login", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({email: 'aaa@mail.com', password: '12345'})})
*/
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'logged in!' });
});

/*
as postman works on another domain => to test from browser

fetch("http://localhost:3030/logout", {method: 'POST'})
*/
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'logged out!' });
});

//================================ public route

router.get('/', (req, res) => {
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

router.use(isAuth);

router.get('/users', isAdmin, (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }, //do not expose passwords, even if they are encoded!
  }).then((users) => {
    res.json({ users });
  });
});

router.get('/todos', (req, res) => {
  Todo.findAll().then((todos) => {
    res.json({ todos });
  });
});

router.post('/todos', (req, res) => {
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

module.exports = router;
