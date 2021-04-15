const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./models');

//session storage
const sessionStore = new SequelizeStore({
  db: sequelize,
});
sessionStore.sync(); // make sure that Session tables are in place

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore, // let sessions be stored in the database
  cookie: {
    maxAge: 1000 * 60 * 60 * 48, // 2 days
  },
});
