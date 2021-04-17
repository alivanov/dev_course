const express = require('express');

//================================

const app = express();

//================================

const sessionManagement = require('./config/sessionManagement');

//================================

// thisl will add 'connect.sid' cookie to browser
// and save session to the database
app.use(sessionManagement);

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
