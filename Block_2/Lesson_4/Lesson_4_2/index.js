//----------------------------

console.log('\x1b[31m', '//Currying f(a, b, c) => f(a)(b)(c) --------------------------------------------- \n', '\x1b[0m');

//https://learn.javascript.ru/currying-partials#prodvinutaya-realizatsiya-karrirovaniya

function curry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args);
      } else {
        return function(...args2) {
          return curried.apply(this, args.concat(args2));
        }
      }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

console.log( curriedSum(1, 2, 3) ); // 6, всё ещё можно вызывать нормально
console.log( curriedSum(1)(2,3) ); // 6, каррирование первого аргумента
console.log( curriedSum(1)(2)(3) ); // 6, каррирование всех аргументов

//----------------------------

console.log('\x1b[31m', '//Bitwise operators --------------------------------------------- \n', '\x1b[0m');

function findSingle(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = result ^ arr[i];
    }

    return result;
}

console.log(findSingle([1,1,2,2,3,3,4,5,4])); //5

//----------------------------

console.log('\x1b[31m', '//BigInt --------------------------------------------- \n', '\x1b[0m');

const fibonacci = (num) => {

  const table = new Array(num + 1).fill(0n);

  table[1] = 1n;
  table[2] = 1n;

  for(let i = 3; i <= num; i++) {
    table[i] = BigInt(table[i-1] + table[i-2]);
  }

  return table[num]
}

console.log(fibonacci(5000));

//----------------------------

console.log('\x1b[31m', '//Intl --------------------------------------------- \n', '\x1b[0m');

let collator = new Intl.Collator();
console.log( "ёжик" > "яблоко" ); // true (ёжик is greater, not correct)
console.log( collator.compare("ёжик", "яблоко") ); // -1 (ёжик is less, correct)

//sensivity
console.log( collator.compare("ЁжиК", "ёжик") ); // 1, not equal ("ЁжиК" > "ёжик")
collator = new Intl.Collator(undefined, {sensitivity: "accent"});
console.log( collator.compare("ЁжиК", "ёжик") ); // 0, equal

//to be executed in a browser----------------------------

let date = new Date(2021, 3, 3, 19, 30, 0);

let formatter = new Intl.DateTimeFormat("ru");
console.log( formatter.format(date) );

formatter = new Intl.DateTimeFormat("en-US");
console.log( formatter.format(date) );

//time
date = new Date(2021, 3, 3, 19, 30, 0);

formatter = new Intl.DateTimeFormat("ru", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});

console.log( formatter.format(date) );

//numbers
formatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2
});

console.log( formatter.format(1234.5) );