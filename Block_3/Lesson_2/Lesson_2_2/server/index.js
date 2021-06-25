/*
1. $ npm init -y
2. $ npm install express --save
3. $ npm install --save-dev nodemon
4. $ npm i connect-timeout cors
5. Create index.js
6. update package.json with start scripts
7. $ npm run start:dev
8. $ sudo subl /etc/hosts
    - add 127.0.0.1 devdemo
    - save
9. open browser & navigate to http://devdemo:3333
10. curl http://devdemo:3333/todos
11. postman
*/

//global modules
const express = require('express');
const cors = require('cors');
//const timeout = require('connect-timeout'); //to use as "top-level" middleware -> not recommended!!!

//local modules
const config = require('./config.json')[process.env.NODE_ENV];
const route = require('./route');

//init app
const app = express();

//top level middlewares
app.use(cors())

//app.use(timeout('5s')); //not recommended!!!
//console.log(process.env)

//local middleware demo
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
  //next(); //uncomment to see how middlewares work
})

app.use(function (req, res, next) {
  console.log('I am custom middleware - 1');
  next();
})

app.use(function (req, res, next) {
  console.log('I am custom middleware - 2');
  next();
})

app.use('/', route); // the request should get response here -> all middlewares below will not be executed. But... uncomment the 2nd next() above... :(

//these middlewares are not reachable if the req rout matches 'route' stuff
app.use(function (req, res, next) {
  console.log("Unreachable - 1");
  next();
})

app.use(function (req, res, next) {
  console.log("Unreachable - 2");
  next();
})

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function(req, res) {
  res.status(404).send('PAGE NOT FOUND!');
});

//https://expressjs.com/en/guide/error-handling.html
app.use(function(err, req, res, next) {
  res.statusMessage = err.toString();
  res.status(500).end();
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
})