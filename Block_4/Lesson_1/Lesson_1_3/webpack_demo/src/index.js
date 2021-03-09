/*
  1. $ npm init - y
  2. $ npm i -D webpack webpack-cli
  3. create webpack.config.js file
  4. $ ./node_modules/.bin/webpack
  5. export class Post, import the class in index.js
  6. $ ./node_modules/.bin/webpack (observe the difference from step 4)
  7. update index.html to get the bundle (<script src="/dist/bundle.js"></script>), start a server and ensure it works
*/

import Post from './Post.js';

const post = new Post('my post');

console.log('post', post.toString());

console.log('analytics', analytics);