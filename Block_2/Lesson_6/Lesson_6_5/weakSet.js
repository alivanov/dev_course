console.log('\x1b[31m', '//WeakSet intro --------------------------------------------- \n', '\x1b[0m');

const users = [
  {name: 'Alex'},
  {name: 'Bob'},
  {name: 'John'}
];

const visits = new WeakSet();

//WeakSet keys are objects only!
visits.add(users[0]).add(users[1]);

console.log(visits.has(users[0]));
console.log(visits.has(users[1]));

users.splice(1, 1); //remove user from users array

console.log(visits.has(users[0]));
console.log(visits.has(users[1]));