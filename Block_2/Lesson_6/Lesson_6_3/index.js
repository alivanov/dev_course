/*
n: 1, 2, 3, 4, 5, 6, 7, 8, 9, ...
Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

fib(0) === 1
fib(1) === 1
fib(n) = fib(n-1) + fib(n-2)
*/

//=============== step 1: Recursive solution ===============
// O(2^n) time!
// O(n) space

const fibR = (n) => {
  if (n <= 2) return 1;

  return fibR(n - 1) + fibR(n - 2);
}

//=================== step 2: Memoization ==================
// O(n) time
// O(n) space

const fibM = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;

  memo[n] = fibM(n - 1, memo) + fibM(n - 2, memo);

  return memo[n];
}

//=================== step 3: Tabulation ===================
// O(n) time
// O(n) space

const fibT = (num) => {

  const table = new Array(num + 1).fill(0n);

  table[1] = 1n;
  table[2] = 1n;

  for(let i = 3; i <= num; i++) {
    table[i] = BigInt(table[i-1] + table[i-2]);
  }

  return table[num]
}

//==========================================================

const fibonacci = (n, func) => {

  if (n < 1) {
    throw new Error('n should be greater than 0!');
  }

  console.time(`lebel: ${n}`);
  let result = func(n)
  console.timeEnd(`lebel: ${n}`);

  return result;
}

//==========================================================

console.log('\x1b[31m', '//Recursive tests --------------------------------------------- \n', '\x1b[0m');

let fibValue = fibonacci(6, fibR);
let expected = 8;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

fibValue = fibonacci(7, fibR);
expected = 13;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

fibValue = fibonacci(8, fibR);
expected = 21;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

fibValue = fibonacci(40, fibR);
expected = 102334155;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

// 2^50 steps 1,125,899,906,842,624!
/* fibValue = fibonacci(50, fibR);
expected = 12586269025;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue); */

//==========================================================

console.log('\x1b[31m', '//Memoization tests --------------------------------------------- \n', '\x1b[0m');

fibValue = fibonacci(6, fibM);
expected = 8;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

fibValue = fibonacci(7, fibM);
expected = 13;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

fibValue = fibonacci(8, fibM);
expected = 21;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

fibValue = fibonacci(40, fibM);
expected = 102334155;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

fibValue = fibonacci(50, fibM);
expected = 12586269025;
console.assert(fibValue === expected, 'Expected %s, received %s', expected, fibValue);

//RangeError: Maximum call stack size exceeded!
//console.log(fibonacci(10000, fibM));

//==========================================================

console.log('\x1b[31m', '//Tabulation tests --------------------------------------------- \n', '\x1b[0m');

console.log(fibonacci(10000, fibT));