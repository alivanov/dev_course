console.log('\x1b[31m', '//Create & compare --------------------------------------------- \n', '\x1b[0m');

let user1 = new Object({name: 'user1'});
let user2 = {name: 'user1'}; 

console.log(user1, user2); //looks similar
console.log(user1 == user2, user1 === user2); // false false !
console.log([1,2,3] === [1,2,3]) // false !

function User(name) {
    this.name = name;
}
  
let user = new User("Nick");

console.log(user)

//--------------------

console.log('\x1b[31m', '//Add attributes & references--------------------------------------------- \n', '\x1b[0m');

let u2 = user2;
u2.email = 'myemail@mail.com';
console.log(user2);

user2['is awesome guy'] = true;
console.log(u2);

//--------------------

console.log('\x1b[31m', '//Delete attributes --------------------------------------------- \n', '\x1b[0m');

delete u2['is awesome guy'];
console.log(u2);

//--------------------

console.log('\x1b[31m', '//THIS --------------------------------------------- \n', '\x1b[0m');

let user3 = {
    firstName: 'John',
    lastName: 'Doe',
    getName: function() {
        return this.firstName + ' ' + this.lastName
    }
};

console.log(user3.getName());

function doSomething() {
    return console.log(`${this.getName()} is doing something`);
}

let user4 = {
    firstName: 'Bob',
    lastName: 'Brown',
    getName() {
        return this.firstName + ' ' + this.lastName
    }
};

user3.work = doSomething;
user4.work = doSomething;

user3.work();
user4.work();

//--------------------

console.log('\x1b[31m', '//Object keys, values & entries --------------------------------------------- \n', '\x1b[0m');

console.log(Object.keys(user3));
console.log(Object.values(user3));
console.log(Object.entries(user3));

for (let key in user3) {
    console.log(`for loop user3 key: ${key}, and it's value: ${user3[key]}`)
}

//--------------------

console.log('\x1b[31m', '//Using nubers as object keys --------------------------------------------- \n', '\x1b[0m');

let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "GB",
    "1": "USA"
};

for (let code in codes) {
    console.log(code); // 1, 41, 44, 49
}

console.log(Object.keys(codes));

//--------------------

console.log('\x1b[31m', '//Call & Apply --------------------------------------------- \n', '\x1b[0m');

function sayHi(...args) {
    console.log(this.name, args);
}

let admin1 = { name: "Admin1" };
let admin2 = { name: "Admin2" };

sayHi.call(admin1, 1, 2, 3);
sayHi.apply(admin2, [1, 2, 3]);

//--------------------

console.log('\x1b[31m', '//Loosing context & bind --------------------------------------------- \n', '\x1b[0m');

let user5 = {
    firstName: 'Bob',
    lastName: 'Brown',
    printName() {
        console.log(this.firstName + ' ' + this.lastName)
    }
};

setTimeout(user5.printName, 10); // undefined undefined !
setTimeout(() => {user5.printName()}, 10); // ok

let boundFunc = user5.printName.bind(user5)
setTimeout(boundFunc, 10); // ok
 