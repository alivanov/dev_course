console.log('========== VISIBILITY, HOISTING & CLOSURES ==========');

console.log('- just a var');

var name = "John";

function sayHi() {
  console.log("Hi, " + name);
}

name = "Pete";

sayHi();

//----------------------------

console.log('- new function');

function makeWorker() {
  var name = "Pete";

  return function() {
    console.log(name);
  };
}

var name = "John";
var work = makeWorker();

work();

//----------------------------

console.log('- hoisting');

say('Max');

var phrase = 'Hi'; //hoisted before say('Max');

function say(name) {
  console.log( name + ", " + phrase );
}

//----------------------------

console.log('- different lexical envs');

function makeCounter() {
  var count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

console.log( counter1() ); // 0
console.log( counter1() ); // 1

console.log( counter2(), "-> 0 because another lexical env was created" );

console.log('========== VAR, LET, CONST (the code is initially commented) ==========');

//commented because the console output might be confused a bit due to the async operations
//uncomment & discuss during the lesson [@alivanov]
/* console.log('========= var vs let');

function foo() {
  for (var i=0; i < 10; i++) {
      setTimeout(function() {
          console.log(i);
      }, 0);
  }
}
foo(); */

//----------------------------

//commented because of the exception
//uncomment & discuss during the lesson [@alivanov]
/* console.log('========= const');

const myConst = 10;
myConst = 11;
console.log(myConst); */

//----------------------------

console.log('========== EXECUTION CONTEXT (the code is initially commented) ==========');

//commented because the console output might be confused a bit due to the async operations
//uncomment & discuss during the lesson [@alivanov]
/* var user = {
  firstName: "John",
  sayHi() {
    console.log(`Hi, ${this.firstName}!`);
  }
};

//step 1 - ok
user.sayHi();

//step 2 - context lost
var foo = user.sayHi;
foo();

//step 3 - again ok
var bar = user.sayHi.bind(user);
bar()

//step 4 - async functions causes context lost
setTimeout(user.sayHi, 0); // Привет, undefined! */

console.log('========== FUNCTION PARAMS ==========');

function doSomething1(n){
  n = 10;
  console.log('doSomething1 Inside ', n);
}

var n = 0;
doSomething1(n);

console.log('doSomething1 Outside ', n);

//----------------------------

function doSomething2(person){
  person.name = 'Peter';
  console.log('doSomething2 Inside ', person);
}

var user = {name: 'Alex'};
doSomething2(user);

console.log('doSomething2 Outside ',user);

//----------------------------

function doSomething3(person){
  person = {name: 'Peter'};
  console.log('doSomething3 Inside ', person);
}

var user = {name: 'Alex'};
doSomething3(user);

console.log('doSomething3 Outside ',user);

console.log('========== NULL & UNDEFINED ==========');

var TestVar;
console.log(TestVar); //shows undefined
console.log(typeof TestVar); //shows undefined

//----------------------------

var TestVar2 = null;
console.log(TestVar2); //shows null
console.log(typeof TestVar2); //shows object

//----------------------------

console.log(null === undefined);
console.log(null === null);
console.log(null == undefined); // == !