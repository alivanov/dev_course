/*
Insertion : O(1)
Deletion :  O(1)
Access Time : O(n) [Worst Case]
Insertion and Deletion are allowed on one end. 
*/

/*
Example : Stacks are used for maintaining function calls (the last called function must finish execution first), 
we can always remove recursion with the help of stacks. 
Stacks are also used in cases where we have to reverse a word, check for balanced parenthesis and in editors where the word 
you typed the last is the first to be removed when you use undo operation. 
Similarly, to implement back functionality in web browsers.
*/

class Stack {
  constructor() {
    this.root = null;
    this.n = 0;
  }
  
  push(stackNode) {
    const oldFirst = this.root;
    this.root = stackNode;
    this.root.next = oldFirst;
    this.n++;
  }
  
  pop() {
    if(this.isEmpty()) {
      return null
    }
    const oldFirst = this.root;
    this.root = this.root.next;
    this.n--
    return oldFirst;
  }

  //========== helpers ==========

  isEmpty() {
    return this.n === 0;
  }
  
  size() {
    return this.n;
  }
  
  info() {
    console.log('=== stack content ===', this.n)
  
    let p = this.root;
    while(p) {
        console.log(p);
      p = p.next;
    }
  }
}

//=================================

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}
  
class BracketNode extends Node {
  //default constructor, could be omitted
  constructor(...args) {
    super(...args);
  }
  
  isOpeningBracket() {
    switch (this.value) {
      case '[':
      case '(':
      case '{': 
          return true;
      default: 
        return false;
    }
  }
  
  getReversedBracket() {
    switch (this.value) {
      case '{': 
        return '}';
      case '(': 
        return ')';
      case '[': 
        return ']';
      case ']': 
        return '[';
      case '}': 
        return '{';
      case ')': 
        return '(';
      default: 
        throw new Error('Non-bracket symbol!');
    }
  }
}

//=================================

function isCorrectBracketsSequence(str) {
  if (!str) {
    return true;
  }
  
  const patt = /([{}\[\]\(\)])/ig; //new RegExp('([{}\\[\\]\\(\\)])', 'ig')
  const bracketsArr = str.match(patt);
  if (!bracketsArr) {
    return true;
  }
  
  const stack = new Stack();
  
  for (let i = 0; i < bracketsArr.length; i++) {
    let bracket = new BracketNode(bracketsArr[i]);
    
    if (bracket.isOpeningBracket()) {
      stack.push(bracket);
    } else {
      const reversedBracket = bracket.getReversedBracket();
      const bracketNode = stack.pop();

      if (!bracketNode || bracketNode.value !== reversedBracket) {
        return false;
      }
    }
  }
  
  return stack.isEmpty();
}

console.log(isCorrectBracketsSequence('Lorem [ipsum [dolor {sit} amet], consectetur (adipiscing) elit.]')); // true
console.log(isCorrectBracketsSequence('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')); // true
console.log(isCorrectBracketsSequence('[({})]')); // true
console.log(isCorrectBracketsSequence('')); // true
console.log(isCorrectBracketsSequence()); // true

console.log(isCorrectBracketsSequence('Lorem [ipsum dolor {sit} amet), consectetur [adipiscing] elit.')); // false
console.log(isCorrectBracketsSequence(')')); // false
console.log(isCorrectBracketsSequence('{')); // false