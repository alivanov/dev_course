class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

//====================================

class Queue {
	constructor() {
  	this.first = null;
    this.last = null;
    this.n = 0;
  }
  
  isEmpty() {
  	return this.n === 0;
  }
  
  size() {
  	return this.n;
  }
  
  enqueue(queueNode) {
  	const oldLast = this.last;
    this.last = queueNode;
    
    if (this.isEmpty()) {
    	this.first = this.last
    } else {
    	oldLast.next = this.last
    }
    this.n++;
  }
  
  dequeue() {
  	if (this.isEmpty()) {
    	return null;
    }
    
    const oldFirst = this.first;
    this.first = oldFirst.next;
    
  	this.n--;
    
    return oldFirst;
  }
  
  info() {
  	console.log('=== queue content ===', this.n)
    
  	let p = this.first;
    while(p) {
    	console.log(p);
      p = p.next;
    }
  }
}

//====================================

const queue = new Queue()
queue.enqueue(new Node('first'));
queue.enqueue(new Node('second'));
queue.enqueue(new Node('third'));
queue.enqueue(new Node('fourth'));
queue.info()

let last = queue.dequeue();
last = queue.dequeue();
console.log('received from queue', last)
queue.info()