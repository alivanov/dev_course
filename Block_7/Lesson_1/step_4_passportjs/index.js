// https://github.com/alex996/presentations
// https://www.youtube.com/watch?v=z7872Nki5FY&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=2
// http://www.passportjs.org/docs
//    - auth methods: https://github.com/jaredhanson/passport/blob/master/lib/http/request.js

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const routes = require('./routes');
//================================

const app = express();

//================================

const sessionManagement = require('./config/sessionManagement');

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

app.use(passport.initialize());
app.use(passport.session()); //serialize / deserialize

app.use((req, res, next) => {
  console.log('================= DEBUG =================');
  console.log('req.session', req.session); //express session middleware creates this object
  console.log('req.user', req.user); //passport middleware creates this object
  console.log('=========================================');
  next();
});

//================================

app.use('/', routes);

//================================

//The 404 Route (ALWAYS Keep this as the last route)
app.use((req, res) => {
  res.status(404).json({ message: 'NOT FOUND!' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

//================================

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
