'use strict';

let jsonData = require('./data.json');
console.log(jsonData);

console.log('\n====================\n');

var path = require('path');
const fs = require('fs');

console.log(process.cwd());
console.log(__dirname);

let rawdata = fs.readFileSync(path.join(__dirname, './data.json'));
let data = JSON.parse(rawdata);
console.log(data);

console.log('\n====================\n');

const https = require('https');

https.get('https://jsonplaceholder.typicode.com/todos/1', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    console.log('chunk', chunk, typeof chunk);  
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log('raw data', data, typeof data);
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
