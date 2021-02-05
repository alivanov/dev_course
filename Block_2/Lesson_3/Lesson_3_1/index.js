
console.log('\x1b[31m', '//Classes: basic syntax (functions) --------------------------------------------- \n', '\x1b[0m');

function UserF(name) {
    this.name = name;
}

UserF.prototype.sayHi = function() {
    console.log(`Hi ${this.name}`);
};

let user1 = new UserF("Bill");
user1.sayHi();

//----------------------------

console.log('\x1b[31m', '//Classes: basic syntax (class) --------------------------------------------- \n', '\x1b[0m');

class UserC {
    constructor(name) {
      this.name = name;
    }
  
    sayHi() {
      console.log(`Hi ${this.name}`);
    }
    //no comma here!
    sayBye() {
      console.log(`Bye ${this.name}`);
    }
}

let user2 = new UserC("Rupert");
user2.sayHi();
user2.sayBye();

console.log('typeof User ===> ', typeof UserC);
console.log('User === User.prototype.constructor ===> ', UserC === UserC.prototype.constructor);
console.log('User.prototype.sayHi ===> ', UserC.prototype.sayHi);
console.log('Object.getOwnPropertyNames(User.prototype) ===> ', Object.getOwnPropertyNames(UserC.prototype));

//----------------------------

console.log('\x1b[31m', '//Getters & setters --------------------------------------------- \n', '\x1b[0m');

class User {
    constructor(name) {
      //call setter  
      this.name = name;
    }
  
    get name() {
      return this._name; //you can decorate internal value here somehow before return
    }
  
    set name(value) {
      if (value.length < 4) {
        console.log("The name is too short!");
        return;
      }
      this._name = value;
    }
}
  
let user = new User("Donald");
console.log(user.name);
user = new User(""); //The name is too short!

//----------------------------

console.log('\x1b[31m', '//Class properties --------------------------------------------- \n', '\x1b[0m');

class Car {
    movable = true; //new feaature that won't work on old nodejs versions

    constructor(name) {
        //call setter  
        this.name = name;
    }
  
    showName() {
      console.log(`Hi, I've just bought a new car: ${this.name}`);
    }
}
  
let car = new Car('Renault');
car.showName();
console.log('Is it movable?', car.movable);

//----------------------------

console.log('\x1b[31m', '//Static methods --------------------------------------------- \n', '\x1b[0m');

class Person {
    static isHuman = true; //new feaature that won't work on old nodejs versions

    constructor(name) {
        this.name = name;
    }

    static staticMethod() {
      console.log('"this" is in fact "Person"', this === Person);
    }

    static createPerson(name) {
        return new this(name);
    }

    work() {
        console.log(`${this.name} is working`)
    }
}
  
Person.staticMethod();
let person = Person.createPerson('Admin');
console.log(person);
console.log(Person.isHuman);

//----------------------------

console.log('\x1b[31m', '//Inheritance --------------------------------------------- \n', '\x1b[0m');

class Admin extends Person {
    constructor(name, computerName) {
        super(name); //call base class constructor
        //super(...arguments);
        this.isAdmin = true;
        this.computerName = computerName;
    }

    showComputer() {
        console.log(`I am Admin & my computer is ${this.computerName}`)
    }
}

let admin = new Admin('Paul', 'Mac Mini');
admin.showComputer();
admin.work();
console.log(admin);
console.log(Admin.isHuman);

//----------------------------

console.log('\x1b[31m', '//Private props & methods --------------------------------------------- \n', '\x1b[0m');

class CoffeeMachineLegacy {
    constructor(power) {
      this._power = power;
    }
  
    get power() {
      return this._power;
    }
}
  
let coffeeMachineLegacy = new CoffeeMachineLegacy(100);

console.log(`Power: ${coffeeMachineLegacy.power}W`); // Power: 100W

coffeeMachineLegacy.power = 25;
console.log(coffeeMachineLegacy); //no setter -> _power is still 100

//----------------------------

class CoffeeMachine {
    #waterAmount = 0; //new feaature that won't work on old nodejs versions
  
    get waterAmount() {
      return this.#waterAmount;
    }
  
    set waterAmount(value) {
      if (value < 0) {
          console.log('Error: negative water level!');
          return;
      };
      this.#waterAmount = value;
    }
  }
  
  let machine = new CoffeeMachine();
  
  machine.waterAmount = 100;
  console.log(machine.waterAmount); //100
  //console.log(machine.#waterAmount); //error

//----------------------------

console.log('\x1b[31m', '//Polymorphism --------------------------------------------- \n', '\x1b[0m');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

class TodoList {
    constructor() {
        this.todos = [];
    }

    get todoListLength() {
        return this.todos.length
    }

    get todoList() {
        return [...this.todos]; //note ... here!
    }

    addTodo(todo) {
        this.todos.push(todo)
    }

    removeTodo(id) {
        let todoIdx = this.todos.findIndex(t => t.id === id);
        if (todoIdx === -1) {
            console.log('Nothing to remove!');
            return;
        }
        
        let todo = this.todos[todoIdx];

        if (!todo.isDone) {
            console.log('Can not remove uncompleted todo!');
            return;
        }

        this.todos = [...this.todos.slice(0, todoIdx), ...this.todos.slice(todoIdx + 1)];
        
        return todo;
    }

    completeAll() {
        for (todo of todos) {
            todo.markDone()
        }
    }

    removeAll() {
        for (todo of todos) {
            this.removeTodo(todo.id)
        }
    }
}

class Todo {
    constructor(title) {
        this.title = title;
        this.id = (new Date()).getTime() + getRandomIntInclusive(1, 10000);
        this.isDone = false;
    }

    markDone() {
        this.isDone = true;
    }

    markNotDone() {
        this.isDone = false;
    }
}

class ImpossibleTodo extends Todo{
    //default constructor
    /* constructor(...args) {
        super(...args);
    } */

    markDone() {
        console.log('Can not do impossible things!');
        this.isDone = false;
    }
}

console.log('\x1b[31m', '   ===== init list =====   \n', '\x1b[0m');

let list = new TodoList();
let todos = [new Todo('todo-1'), new ImpossibleTodo('todo-2'), new Todo('todo-3'), new ImpossibleTodo('todo-4'), new Todo('todo-5')];

for (todo of todos) {
    list.addTodo(todo);
}
console.log(list.todoListLength);
let todoList = list.todoList;
console.log(todoList);

console.log('\x1b[31m', '   ===== the list is immutable! =====   \n', '\x1b[0m');

todoList[0] = null;
console.log(list.todoList) //note ... above!
console.assert(list.todoList[0] !== null, 'The list is mutable!!!')

console.log('\x1b[31m', '   ===== mark done =====   \n', '\x1b[0m');

todos[3].markDone()
console.log(list.todoList) 
todos[4].markDone()
console.log(list.todoList) 

console.log('\x1b[31m', '   ===== complete all =====   \n', '\x1b[0m');

list.completeAll();
console.log(list.todoList);

console.log('\x1b[31m', '   ===== remove all =====   \n', '\x1b[0m');

list.removeAll();
console.log(list.todoList);

//----------------------------

console.log('\x1b[31m', '//Private props can not be inherited --------------------------------------------- \n', '\x1b[0m');

/* class MegaCoffeeMachine extends CoffeeMachine {
    method() {
        console.log( this.#waterAmount ); // Error: can only access from CoffeeMachine
    }
} */

