// Set

console.log('\x1b[31m', '//Set intro --------------------------------------------- \n', '\x1b[0m');

const set = new Set([1,1,2,2,3,3,4,5]);
console.log(set);

set
  .add(10)
  .add(20)
  .add(30)
  .add(20);

console.log(set);
console.log(set.has(30));
console.log(set.has(40));
console.log(set.size);
let isDeleted = set.delete(10);
console.log(set.size, isDeleted);

console.log(set.values()); //this methods exist to sync with Map
console.log(set.keys()); //this methods exist to sync with Map
console.log(set.entries());

for (let key of set) {
  console.log(key);
}

set.clear();
console.log(set.size);

console.log('\x1b[31m', '//example --------------------------------------------- \n', '\x1b[0m');

const arr = [11,11,22,22,33];
console.log('unique values', [...new Set(arr)], Array.from(new Set(arr)));