//Base example =========================================

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();
console.log(JSON.stringify(one));

let two = generator.next();
console.log(JSON.stringify(two));

let three = generator.next();
console.log(JSON.stringify(three));

let four = generator.next();
console.log(JSON.stringify(four));

//for of =========================================

function* generateSequence2() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

generator = generateSequence2();

for(let value of generator) { //this will ignore {done: true} value and receive only yield'ed values
  console.log(value);
}

let sequence = [0, ...generateSequence2()];
console.log(sequence);

//Symbol.iterator =========================================

let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

console.log( [...range] ); // 1,2,3,4,5

//Generators composition =========================================

function* generateSequence3(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence3(48, 57);
  //for (let i = 48; i <= 57; i++) yield i;

  // A..Z
  yield* generateSequence3(65, 90);
  //for (let i = 65; i <= 90; i++) yield i;

  // a..z
  yield* generateSequence3(97, 122);
  //for (let i = 97; i <= 122; i++) yield i;
}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z

//Generators composition =========================================

function* gen() {
  let ask1 = yield "2 + 2 = ?";

  console.log(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  console.log(ask2); // 9
}

generator = gen();

console.log( generator.next().value ); // "2 + 2 = ?"
console.log( generator.next(4).value ); // "3 * 3 = ?"
console.log( generator.next(9).done ); // true

//generator.throw =========================================

function* generate() {
  let result = yield "2 + 2 = ?"; // Error is here
}

generator = generate();

let question = generator.next().value;

try {
  generator.throw(new Error("I can not find an answer in the DB"));
} catch(e) {
  console.log(e);
}