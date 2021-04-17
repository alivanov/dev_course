const express = require('express');
const session = require('express-session');

//================================

const app = express();

//================================

//https://www.npmjs.com/package/express-session
//session stores in memory and will be destroyed on each server restart
app.use(
  session({
    secret: 'yous_session_secret_ket', //do not expose this!
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 3, // 3 minutes
    },
  }),
);

//================================

app.get('/', (req, res) => {
  console.log(req.session);

  // session data will be auto-saved in the cookies
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

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function (req, res) {
  res.status(404).send({ message: 'NOT FOUND!' });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//================================

app.listen(3333, () => {
  console.log('App is listening at http://localhost:3333');
});
