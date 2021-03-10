/*
  1. $ npm init - y
  2. $ npm install -D parcel-bundler@1.12.3 lodash jquery normalize.css less node-sass
*/

import Post from './models/Post';

import '../styles/styles.css';
import '../styles/less.less';
import '../styles/scss.scss';

import json from '../assets/json'; //no special loader needed
import xml from "../assets/data.xml"; //xml-loader
import csv from "../assets/data.csv"; //csv-loader

import Avatar from "../assets/avatar.png"; //file-loader

import $ from 'jquery';

const post = new Post("Webpack post title", Avatar);

$('pre').html(post.toString());

console.log('post', post.toString());

//console.log('analytics', analytics); //commented to fix eslint error
console.log('json', json);
console.log("CSV:", csv);
console.log("XML:", xml);