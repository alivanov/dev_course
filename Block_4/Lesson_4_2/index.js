/*
0. node -v
  v12.16.3
1. $ npm init -y
2. create index.js
3. npm install -D @babel/core @babel/cli @babel/preset-env @babel/plugin-proposal-class-properties rimraf
4. create babel.config.json
5. update npm scripts
*/

class User {
  #isHuman = true;

  #abilities = {
    JS: 5,
    Python: 3,
    PHP: 3,
    NodeJS: 4
  }

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
}

const user = new User('John');
console.log(user.isHuman());
console.log(user.getName());
console.log(user.getAbilities());
