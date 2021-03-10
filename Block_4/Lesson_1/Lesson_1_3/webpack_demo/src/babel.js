async function start() {
  return await Promise.resolve("async is working");
}

start().then(console.log);

class Util {
  static id = Date.now();
}

console.log("Util static id:", Util.id);

const unusedVar = 42;


//dynamic import example
/* async function getRandom() {
  const { default: _ } = await import('lodash');
  return _.random(5, 100);
}

getRandom().then(val => {
  console.log(val)
}) */

import('lodash').then(({ default: _ }) => {
  console.log(_.random(5, 100))
});
