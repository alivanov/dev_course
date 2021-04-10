/*
1. Environment setup

    a. vs code plugins: ESLint, Prettier

    b. create src/index.js
        var hello = 'hello world!';console.log(hello);var x = {a: 10,b: 20};console.log(x)

    c. turn ON prettier:
        - Code -> Settings -> Workspace -> 'format'
            -> Formatting -> Editor: Format On Save
            -> Text Editor -> Editor: Default Formatter === Prettier - Code formatter
        - save src/index.js -> ensure prettier works

    d. turn ON esLint (https://github.com/airbnb/javascript)
        - npm init -y
        - npm i -D eslint eslint-config-airbnb-base eslint-plugin-import
        - .eslintrc
            {
              "extends": ["airbnb-base"]
            }
        - vs code bottom blue panel -> click "ESLINT -> Allow
          (not 'Allow Everywhere' as it will apply your choise for all workspaces)
        - ensure eslint shows errors in src/index.js

    e. fix prettier vs eslint "conflicts"
        - Code -> Settings -> Workspace -> 'prettier'
            -> Prettier: Single Quote
            -> Prettier: Trailing Comma === 'all'
        - fix eslint 'var' error and ensure eslint warns 'console.log(hello);' only
          (note that this is not airbnb warning - https://eslint.org/docs/rules/no-console)
*/

/* KOA is a very lightweight framework! */

const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router');
const db = require('./db');

const app = new Koa();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = 'Hello Koa!';
});

app.listen(8080, () => {
  console.log('Server is listening http://localhost:8080');
});
