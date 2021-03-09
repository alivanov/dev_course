/*
  1. $ npm init - y
  2. $ npm i -D webpack webpack-cli
  3. create webpack.config.js file
  4. $ ./node_modules/.bin/webpack
  5. export class Post, import the class in index.js
  6. $ ./node_modules/.bin/webpack (observe the difference from step 4)
  7. update index.html to get the bundle (<script src="/dist/bundle.js"></script>), start a server and ensure it works
  8. the second entry point for webpack
  9. Avoid caching by using [contenthash] pattern (update analytics.js text and check the bundle hash)
  10. plugins 
    - $ npm i -D html-webpack-plugin loader-utils
    - remove <script> tags from index.html
    - move index.html to src folder
    - $ npm i -D clean-webpack-plugin
  11. update scripts in package.json
  12. context & loaders
    - npm i -D style-loader css-loader
*/

import Post from './Post.js';

import '../styles/styles.css'

const post = new Post('my post');

console.log('post', post.toString());

console.log('analytics', analytics);