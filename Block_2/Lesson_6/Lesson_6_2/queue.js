/*
Insertion : O(1)
Deletion  : O(1)
Access Time : O(n) [Worst Case]
*/

/*
Example : Queue as the name says is the data structure built according to the queues of bus stop or train where the person who is standing in the 
front of the queue(standing for the longest time) is the first one to get the ticket. 
So any situation where resources are shared among multiple users and served on first come first server basis. 
Examples include CPU scheduling, Disk Scheduling. 
Another application of queue is when data is transferred asynchronously (data not necessarily received at same rate as sent) between two processes. 
Examples include IO Buffers, pipes, file IO, etc.
*/

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

  //========== helpers ==========

  isEmpty() {
  	return this.n === 0;
  }
  
  size() {
  	return this.n;
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