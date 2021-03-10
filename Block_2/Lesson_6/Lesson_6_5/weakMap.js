let obj = {
  name: 'weakMap'
};

const arr = [obj];

obj = null;

console.log(obj, arr); //{name: 'weakMap'} is still in the memory!

console.log('\x1b[31m', '//WeakMap intro --------------------------------------------- \n', '\x1b[0m');

//WeakMap keys are objects only!

obj = {name: 'another obj'}

const map = new WeakMap([
  [obj, 'some value']
]);
console.log(map);

//WeakMap has only the following methods: get, set, delete, has

console.log(map.size);
console.log(map.get(obj));
console.log(map.has(obj));

obj = null;
console.log(map.get(obj));
console.log(map.has(obj));

console.log('\x1b[31m', '//example --------------------------------------------- \n', '\x1b[0m');

const cache = new WeakMap();

function cacheUser(user) {
  if (!cache.has(user)) {
    cache.set(user, Date.now());
  }

  return cache.get(user);
}

let john = {name: 'John'};
let bill = {name: 'Bill'};
cacheUser(john);
cacheUser(bill);

john = null;

console.log(cache.has(john));
console.log(cache.has(bill));

