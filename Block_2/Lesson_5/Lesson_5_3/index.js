//----------------------------

console.log('\x1b[31m', '//POWER --------------------------------------------- \n', '\x1b[0m');

function pow(x, n) {
  // n === 1 - recursion basis
  return (n == 1) ? x : (x * pow(x, n - 1));
}

console.log(pow(2,5).toString(2)); //32 == 0b100000

//----------------------------

console.log('\x1b[31m', '//TRAVERSE --------------------------------------------- \n', '\x1b[0m');

let company = {
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// Calculate salaries
function sumSalaries(department) {

  if (Array.isArray(department)) { // recursion basis
    return department.reduce((prev, current) => prev + current.salary, 0); // the summ of numbers in the array
  } else { // nested objects detected
    let sum = 0;

    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // execute the function itsels for each sub-object
    }

    return sum;
  }
}

console.log(sumSalaries(company)); // 6700