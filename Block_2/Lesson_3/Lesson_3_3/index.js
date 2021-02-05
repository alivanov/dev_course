function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//-----------------------------

function Product(params) {
  this.name = params.name || 'N/A';
  this.price = params.price || 0;

  this.id = (new Date()).getTime() + getRandomIntInclusive(1, 10000);
}

//inheritance
function Pen(params) {
  Product.call(this, params)
  
  this.color = params.color || 'blue';
}

Pen.prototype.getColor = function() {
  return this.color;
}

Object.setPrototypeOf(Pen.prototype, Product.prototype)

let product = new Product({name: 'potato', price: 10})
let pen = new Pen({name: 'EK R-301', price: 20, color: 'red'})

console.log(product)
console.log(pen)
console.log(pen.getColor())

//================================================

function Notebook(params) {
  Product.call(this, params); //init base class attrs
  
  this.pages = params.pages || 0;
}

Notebook.prototype = Object.create(Product.prototype);
Notebook.prototype.constructor = Notebook;

let notebook = new Notebook({name: 'EK N-241', price: 15, pages: 80})

console.log(notebook)

//================================================

function Car(params) {
  this.speed = params.speed || 0;
}

Car.prototype = new Product({name: 'BMW', price: '$10000'}); //init base class attrs
Car.prototype.constructor = Car;

let car = new Car({speed: 300});

console.log(car)

//================================================

class Animal {
  constructor(args) {
    this.name = args.name;
  }

  getName() {
    return this.name
  }
}

class Cat extends Animal {
  //default constructor => might be omitted
  constructor(...args) {
    super(...args);
  }

  voice() {
    console.log('Meow...');
  }
}


let cat = new Cat({name: 'Gribo'});
console.log(cat);
cat.voice();

//================================================

//or nodejs
//const util = require('util');
//util.inherits(ChildClass, BaseClass);