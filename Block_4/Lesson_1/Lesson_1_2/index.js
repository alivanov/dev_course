/*
1. node -v
  v12.16.3
2. $ npm init -y
3. create index.js
4. npm install -D @babel/core @babel/cli @babel/preset-env @babel/plugin-proposal-class-properties rimraf esm
  - use 'node -r esm index.js' to make import work in node 12.16.3 (https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js)
5. create babel.config.json
  - use "plugins": ["@babel/plugin-proposal-class-properties"] to transpile a class private properties
6. update npm scripts
7. $ npm run start:dev
8. $ npm run build
9. $ npm start
10. nvm use 8.5.0 - switch to node 8.5.0
11. $ npm run build  && npm start still works
*/

/*
package.json "engines" key info: https://www.marcusoft.net/2015/03/packagejson-and-engines-and-enginestrict.html
*/

import _ from "lodash";

class User {
  #isHuman = true;

  #abilities = {
    JS: 5,
    Python: 3,
    PHP: 3,
    NodeJS: 4,
  };

  constructor(name) {
    this.name = name;
  }

  isHuman() {
    return this.#isHuman;
  }

  getName() {
    return this.name;
  }

  getAbilities() {
    return this.#abilities;
  }

  has(lang) {
    return _.has(this.#abilities, lang);
  }
}

const user = new User("John");
console.log(user.isHuman());
console.log(user.getName());
console.log(user.getAbilities());
console.log(user.has("JS"));
console.log(user.has("Ruby"));
