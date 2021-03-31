// 1. node 8.5.0 will not execute this code
// 2. Docker will!

//==================

//1. $ docker build -t hello_world . // -t - tag or docker image name
//2. $ docker run hello_world // runs the container. The container will be stopped when the app finished working. The image will exist.
//3. $ docker ps -a // list stopped containers
//4. $ docker run --name hello hello_world // specify the container name

// update index.js to contain permanently executed code
//5. $ docker build -t hello_world . && docker run --name hello hello_world
//   $ docker stop hello //stop the container by it's name
//6. $ docker build -t hello_world . && docker run --name hello -d hello_world // runs the container in background
//   $ docker stop hello //stop the container by it's name

//7. docker run --name hello -d --rm hello_world //delete the container once it is stopped

//==================

/* setInterval(() => {
  console.log('Hello DOCKER world!');
}, 1000); */

console.log('Hello DOCKER world!');

class Person {
  #name = null;
  static isHuman = true;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return `My name is ${this.#name}`
  }
}

let person = new Person('Bob');

console.log(person.name);