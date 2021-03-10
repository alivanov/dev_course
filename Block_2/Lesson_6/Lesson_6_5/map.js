// Map

console.log('\x1b[31m', '//Objects --------------------------------------------- \n', '\x1b[0m');

const user = {
  name: 'Bob',
  age: 33,
  email: 'bob@gmail.com'
};

const entries = [
  ['name', 'Bob'],
  ['age', 33],
  ['email', 'bob@gmail.com']
];

console.log(Object.entries(user));
console.log(Object.fromEntries(entries)); //new nodejs feature

console.log('\x1b[31m', '//Map intro --------------------------------------------- \n', '\x1b[0m');

const map = new Map(entries);
console.log(map);
console.log('entries', map.entries());
console.log('values', map.values());
console.log('keys', map.keys());

console.log('\x1b[31m', '//get --------------------------------------------- \n', '\x1b[0m');

console.log(map.get('email'));

console.log('\x1b[31m', '//set --------------------------------------------- \n', '\x1b[0m');

map
  .set('address', 'Taganrog')
  .set(user, 'value of obj')
  .set(NaN, 'NaN!!!')
console.log(map);
console.log(map.get(user));

console.log('\x1b[31m', '//delete, has, size --------------------------------------------- \n', '\x1b[0m');

let isDeleted = map.delete('address');
console.log(map, isDeleted);
console.log(map.has('address'));
console.log(map.size);

console.log('\x1b[31m', '//for of --------------------------------------------- \n', '\x1b[0m');

for (let [key, value] of map) {
  console.log('key/value', key, value);
}

console.log('\x1b[31m', '//forEach --------------------------------------------- \n', '\x1b[0m');

map.forEach((value, key, m) => {
  console.log(value, key);
})

console.log('\x1b[31m', '//map to array & obj--------------------------------------------- \n', '\x1b[0m');

let arr = [...map];
console.log(arr);
arr = Array.from(map);
console.log(arr);

let obj = Object.fromEntries(map.entries());
console.log(obj);

console.log('\x1b[31m', '//clear --------------------------------------------- \n', '\x1b[0m');
map.clear();
console.log(map);
console.log(map.size);

console.log('\x1b[31m', '//example --------------------------------------------- \n', '\x1b[0m');

const users = [
  {name: 'Alex'},
  {name: 'Bob'},
  {name: 'John'}
];

const visits = new Map();

visits
  .set(users[0], new Date())
  .set(users[1], new Date(new Date().getTime() + 1000 * 60))
  .set(users[2], new Date(new Date().getTime() + 5000 * 60));

const lastVisit = (user) => {
  return visits.get(user);
}

console.log(visits);
console.log(lastVisit(users[2]));