const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const COOKIE_NAME = 'cookie_set_from_server';

//https://www.npmjs.com/package/cors#configuration-options
app.use(
  cors({
    origin: true, //Configures the Access-Control-Allow-Origin CORS header. Set origin to true to reflect the request origin, as defined by req.header('Origin'), or set it to false to disable CORS.
    credentials: true, //Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  }),
);
app.use(cookieParser()); //to get req.cookies

app.get('/api/cookie', (req, res, next) => {
  res
    .set({ 'Set-Cookie': `${COOKIE_NAME}=my_awesome_client_cookie_value; Max-Age=120` }) //set browser cookie for 120 secons
    .json({ message: 'Cookie set by server!' });
});

app.get('/api/hello', (req, res, next) => {
  console.log('Cookies received:', req.cookies);
  res.json({ message: 'Observe req headers cookie' });
});

//The 404 Route (ALWAYS Keep this as the last route)
app.use((req, res) => {
  res.status(404).send('PAGE NOT FOUND!');
});

app.listen(3333, () => {
  console.log(`Example app listening at http://localhost:3333`);
});
