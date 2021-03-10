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
  13. More loaders
    - npm i -D file-loader (images, fonts)
    - npm i normalize.css
    - npm i -D xml-loader csv-loader
  14. Resolve
  15. external libraries
    - npm i jquery
    - add jquery to index.js and analytics.js
    - build & observe that jquery is included twice
    - add webpack config optimization option & re-build
    - ensure that vendor* files are created
  16. dev server
    - npm i -D webpack-dev-server // webpack-dev-server stores all stuff in memory to speedup -> 'dist' folder does not exist (build scripts create 'dist' folder)
  17. copy files
    - npm i -D copy-webpack-plugin
*/

import Post from '@models/Post';

import '../styles/styles.css';
import json from '../assets/json'; //no special loader needed
import xml from "../assets/data.xml"; //xml-loader
import csv from "../assets/data.csv"; //csv-loader
import Avatar from "../assets/avatar.png"; //file-loader

import * as $ from 'jquery';

const post = new Post("Webpack post title", Avatar);

$('pre').html(post.toString());

console.log('post', post.toString());

console.log('analytics', analytics);
console.log('json', json);
console.log("CSV:", csv);
console.log("XML:", xml);