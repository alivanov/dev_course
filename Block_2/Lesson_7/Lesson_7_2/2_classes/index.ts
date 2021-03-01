//npm i -g typescript
//tsc index.ts --outDir ./dist

console.log('\x1b[31m', '//Classes, Encapsulation, Abstract classes --------------------------------------------- \n', '\x1b[0m');

class Typescript {
  version: string

  constructor(version: string) {
    this.version = version;
  }

  info(name: string) {
    return `[${name}]: Typescript version is ${this.version}`
  }
}

// class Car {
//   readonly model: string
//   readonly numberOfWheels: number = 4
//
//   constructor(theModel: string) {
//     this.model = theModel;
//   }
// }

//this equals to the class declaration above
class Car {
  readonly numberOfWheels: number = 4
  constructor(readonly model: string) {}
}
// ==============


class Animal {
  protected voice: string = ''
  public color: string = 'black'

  constructor() {
    this.go()
  }

  private go() {
    console.log('Go')
  }
}

class Cat extends Animal {
  public setVoice(voice: string): void {
    this.voice = voice;
    //this.go();
  }
}

const cat = new Cat()
// cat.voice
cat.setVoice('Meow...')
console.log(cat.color)

// =====================

abstract class Component {
  abstract render(): void
  abstract info(): string

  myAwesomeMethod() {
    console.log('Unlike an interface, an abstract class may contain implementation details for its members');
  }
}

class AppComponent extends Component {
  render(): void {
    console.log('Component on render')
  }

  info(): string {
    return 'This is info';
  }
}
