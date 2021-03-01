//npm i -g typescript
//tsc index.ts --outDir ./dist

console.log('\x1b[31m', '//Generic types --------------------------------------------- \n', '\x1b[0m');

const arrayOfNumbers: Array<number> = [1, 1, 2, 3, 5];
const arrayOfStrings: Array<string> = ['Hello', 'Vladilen'];


function reverse<T>(array: T[]): T[] {
  return array.reverse();
}

reverse(arrayOfNumbers);
reverse(arrayOfStrings);
