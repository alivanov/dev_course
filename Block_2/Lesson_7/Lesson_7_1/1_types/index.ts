//npm i -g typescript
//tsc index.ts --outDir ./dist

console.log('\x1b[31m', '//Types --------------------------------------------- \n', '\x1b[0m');

//Strings ====================

let str:string = 'Hello TS!';
console.log(str);
//str = 55;

let str2 = 'type auto detect';
//str2 = 55;

//Boolean ====================

const isLoading:boolean = false;

//Number ====================

const int = 42;
const float:number = 2.5;
const num:number = 3e10;

//Array ====================

const numArr:number[] = [1,1,2,3,5,8,13];
const numArr2:Array<number> = [1,1,2,3,5,8,13];

const words:string[] = ['Hello', 'TS'];

//Enum ====================

enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log(c); //2

//Tuple ====================

const contact: [string, number] = ['Alex', 40];

//Any ====================

let variable:any = 42; // do not use any!!!
variable = 'NewString';
variable = [];

//Unknown ====================

let notSure: unknown = 4;
notSure = "maybe a string instead";
// OK, definitely a boolean
notSure = false;

/* declare const maybe: unknown; // 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;

if (maybe === true) {
  const aBoolean: boolean = maybe; // TypeScript knows that maybe is a boolean now
  const aString: string = maybe; // So, it cannot be a string
}

if (typeof maybe === "string") {
  const aString: string = maybe; // TypeScript knows that maybe is a string
  const aBoolean: boolean = maybe; // So, it cannot be a boolean
} */

//Function params ====================

function sayMyName(name: string): void {
  console.log(name);
}
sayMyName('Bob');

//Never ====================

function throwError(message: string): never {
  /* for (let i = 0; i < 10; i++) {
    if (i === 5) {
      throw new Error(message);    
    }
  } */

  throw new Error(message);
}

function infinite(): never {
  while (true) {}
}

//Declare types ====================

type Login = string;

const login: Login = 'admin';
// const login2: Login = 2

type ID = string | number;
const id1: ID = 1234;
const id2: ID = '1234';
// const id3: ID = true;

type SomeType = string | null | undefined;
let foo:SomeType = null;