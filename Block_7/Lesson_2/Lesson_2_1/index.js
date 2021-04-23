/*
  1. npx localtunnel --port 3030 
    - expose your server port (process.env.PORT)
    - this should be done because the most of services do not work with 'localhost'

  2. Register apps:
    - https://vk.com/apps?act=manage
    - https://console.cloud.google.com/projectcreate
    - https://developers.facebook.com/apps/?show_reminder=true
*/

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
