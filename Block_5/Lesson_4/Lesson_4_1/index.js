// 1. npm init -y
// 2. npm i express body-parser dotenv sequelize pg
// 3. npm i -D nodemon sequelize-cli
// 4. Create .env file (do not commit this file!)
// 5. ./node_modules/.bin/sequelize-cli init //sequelize-cli is not a global package, so run it from node_modules folder or use 'npx sequelize-cli init'
//    - config — contains config file, which tells CLI how to connect with database
//    - migrations — contains all migration files
//    - models — contains all models for your project
//    - seeders — contains all seed files
// 6. rename config/config.json to config/config.js and update the code
// 7. create package.json scripts:
//    - "start:dev": "nodemon -r dotenv/config index.js",
//    - "db:create": "sequelize-cli db:create"
// 7. npm run db:create //creates development database
//    - ./node_modules/.bin/sequelize-cli --env test db:create //creates test database
//    - ./node_modules/.bin/sequelize-cli --env production db:create //creates production database

const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from EXPRESS!");
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
