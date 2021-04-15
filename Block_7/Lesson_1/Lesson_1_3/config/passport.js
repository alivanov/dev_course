const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passwordUtils = require('../lib/passwordUtils');
const models = require('../models');

const User = models.User;

//passport local strategy defaults are 'username' && 'password'
const customFields = {
  usernameField: 'email',
};

const verifyCallback = (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isValid = passwordUtils.isValidPassword(password, user.password);

      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id); //put user.id in to the session
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user); //grab user from the session by user.id
    })
    .catch((err) => done(err));
});
