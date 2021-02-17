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