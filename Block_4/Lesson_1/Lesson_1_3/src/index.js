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

//===========================

/* import User from './modules/module';
import {months} from './modules/module';
import {MODULES_BECAME_STANDARD_YEAR as mStandard, JOHN as person} from './modules/module';
import * as Module from './modules/module'; */

const post = new Post("Parcel post title", Avatar);

$('pre').html(post.toString());

console.log('post', post.toString());

//console.log('analytics', analytics); //commented to fix eslint error
console.log('json', json);
console.log("CSV:", csv);
console.log("XML:", xml);

//===========================

console.log('User', new User('Frank'));
console.log('months', months);
console.log('MODULES_BECAME_STANDARD_YEAR', mStandard);
console.log('JOHN', person);
console.log('Module', Module);
