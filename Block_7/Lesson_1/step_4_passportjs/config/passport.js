const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passwordUtils = require('../lib/passwordUtils');
const { User } = require('../models');

//passport local strategy defaults are 'username' && 'password'
const customFields = {
  usernameField: 'email',
};

const verifyCallback = (email, password, done) => {
  User.findOne({ where: { email } })
    .then(async (user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isValid = await passwordUtils.isValidPassword(password, user.password);

      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//put user.id in to the express session cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//grab user from the express session cookie by user.id
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
