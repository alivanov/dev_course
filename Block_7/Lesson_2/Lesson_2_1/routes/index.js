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
  let user = await User.findOne({ where: { provider: 'local', email: req.body.email } });

  if (user) {
    return res.status(422).json({
      message: 'User is already registered!',
    });
  }

  //validate password here as social network auth passwords will be blank
  if (!req.body.password) {
    return res.status(422).json({
      message: 'Password is required!',
    });
  }

  const hash = await passwordUtils.genPasswordHash(req.body.password);

  User.create({
    email: req.body.email,
    password: hash,
    role: req.body.role,
  }).then(
    (user) => {
      //login right after register
      passport.authenticate('local')(req, res, () => {
        res.json({ user, message: 'registered!' });
      });
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

fetch("http://localhost:3030/login", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({email: 'admin@mail.com', password: '12345'})})
*/
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'logged in!' });
    });
  })(req, res, next);
});

/*
as postman works on another domain => to test from browser

fetch("http://localhost:3030/logout", {method: 'POST'})
*/
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'logged out!' });
});

//==================================== vk, google auth routes

router.get('/register/vk', (req, res, next) => {
  // updtae .enc with your valid VK_APP_ID VK_SECURE_KEY
  passport.authenticate('vkontakte', {
    scope: 'email',
  })(req, res, next);
});

router.get('/registration/vk/callback', (req, res, next) => {
  passport.authenticate('vkontakte', async (err, userData, info) => {
    console.log('vkontakte user data', userData);

    if (!req.user) {
      const socialId = userData.id.toString(); // vk ids are numbers
      let user = await User.findOne({ where: { socialId, provider: userData.provider } });

      if (!user) {
        user = await User.create({
          email: userData.emails[0].value,
          socialId: socialId,
          provider: userData.provider,
        });
      }

      req.logIn(user, () => {
        return res.json({ message: 'logged in with VK!', user });
      });
    }
  })(req, res, next);
});

//-------------------

router.get('/register/google', (req, res, next) => {
  // updtae .enc with your valid GOOGLE_APP_ID GOOGLE_SECURE_KEY
  passport.authenticate('google', {
    scope: 'email',
  })(req, res, next);
});

router.get('/registration/google/callback', (req, res, next) => {
  passport.authenticate('google', async (err, userData, info) => {
    console.log('Google user data', userData);

    if (!req.user) {
      let user = await User.findOne({
        where: { socialId: userData.id, provider: userData.provider }, // google ids are numbers
      });

      if (!user) {
        user = await User.create({
          email: userData.emails[0].value,
          socialId: userData.id,
          provider: userData.provider,
        });
      }

      req.logIn(user, () => {
        return res.json({ message: 'logged in with Google!', user });
      });
    }
  })(req, res, next);
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
