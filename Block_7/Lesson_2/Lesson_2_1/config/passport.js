const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passwordUtils = require('../lib/passwordUtils');
const { User } = require('../models');

//==========================================

//passport local strategy defaults are 'username' && 'password'
const customFields = {
  usernameField: 'email',
};

const verifyCallback = (email, password, done) => {
  User.findOne({ where: { email } })
    .then(async (user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' }); //use something less detailed here. Like 'Invalid credentials!'
      }

      const isValid = await passwordUtils.isValidPassword(password, user.password);

      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' }); //use something less detailed here. Like 'Invalid credentials!'
      }

      return done(null, user);
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//----------------------------------------

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

//==========================================
const config = require('./oauth');

const VKontakteStrategy = require('passport-vkontakte').Strategy;

passport.use(
  'vkontakte',
  new VKontakteStrategy(
    {
      clientID: config.vkontakteAuth.clientID,
      clientSecret: config.vkontakteAuth.clientSecret,
      callbackURL: config.vkontakteAuth.callbackURL,
    },
    (accessToken, refreshToken, params, profile, done) => {
      const _profile = JSON.parse(JSON.stringify(profile));
      _profile.emails = [{ value: params.email }];
      process.nextTick(() => {
        done(null, _profile);
      });
    },
  ),
);

//----------------------------------------

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: config.googleAuth.callbackURL,
    },
    (request, accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        done(null, profile);
      });
    },
  ),
);
