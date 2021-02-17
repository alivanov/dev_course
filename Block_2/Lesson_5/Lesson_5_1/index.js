//----------------------------

console.log('\x1b[31m', '//Decorators --------------------------------------------- \n', '\x1b[0m');

function checkNumber(value) {
    return typeof value == 'number';
}
  
function typeCheck(f, checks) {
    return function() {
        for (var i = 0; i < arguments.length; i++) {
            if (!checks[i](arguments[i])) {
                console.error( "Incorrect type of argument " + i);
                return;
            }
        }
        return console.log(f.apply(this, arguments));
    }
}

function sum(a, b) {
    return a + b;
}
  
//decorate
sum = typeCheck(sum, [checkNumber, checkNumber]); //both arguments should be numbers

sum(1, 2); // 3, ok
sum(true, null); // Incorrect type of argument 0
sum(1, ["array", "in", "sum?!?"]); // Incorrect type of argument 1

//----------------------------

console.log('\x1b[31m', '//Fibonacci + timer decorator --------------------------------------------- \n', '\x1b[0m');

var timers = {};

// adds execution time of f to the timer timers[timer]
function timingDecorator(f, timer) {
  return function() {
    var start = Date.now();

    var result = f.apply(this, arguments); //forwarding the function call

    if (!timers[timer]) {
        timers[timer] = 0;
    }
        
    timers[timer] += Date.now() - start;

    return result;
  }
}

// calculate fibonnacci number at position n
var fibonacci = function f(n) {
  return (n > 2) ? f(n - 1) + f(n - 2) : 1;
}

// decorate
var fibonacci1 = timingDecorator(fibonacci, "fibo1");
console.log( fibonacci1(40) ); // 102334155

var fibonacci2 = timingDecorator(fibonacci, "fibo2");
console.log( fibonacci2(39) ); // 63245986

//get timers values
console.log( timers.fibo1 + 'ms' );
console.log( timers.fibo2 + 'ms' );