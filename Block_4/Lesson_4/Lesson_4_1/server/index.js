//1. .dockerignore //see https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#dockerignore-file

//2. docker build -t web-server .
//3. docker run --rm --name web -p 4445:4444 web-server // 4444 is the exposed port

//4. add ENV variables to dockerfile
//5. docker run --rm --name web -p 4445:4444 -e TZ=Europe/Moscow web-server

//6. volumes
// try to update todos.json and ensure the server response will not changed
// go to data folder 
//    $ pwd //to grab the absolute path
// mount folder
//    $ docker run --rm --name web -p 4445:4444 -e TZ=Europe/Moscow -v /Users/alexeyivanov/Work/Projects/github/dev_course/Block_4/Lesson_2/Lesson_2_2/server/data:/usr/src/app/data web-server
// try to update todos.json and ensure the server response will changed

//global modules
const express = require('express');
const cors = require('cors');

//local modules
const config = require('./config.json')[process.env.NODE_ENV];
const route = require('./route');

//init app
const app = express();

//top level middlewares
app.use(cors())

app.use('/', route);

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function(req, res) {
  res.status(404).send('PAGE NOT FOUND!');
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
})