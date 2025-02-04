// stack LIFO Last in First Out

// Time complexity
// Insertion O(1)
// Removal O(1)
// Searching O(N)
// Access O(N)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      let firstNode = this.first;
      this.first = newNode;
      this.first.next = firstNode;
    }
    this.size++;
    return this;
  }
  pop() {
    if (!this.first) {
      return null;
    }
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return this;
  }
}

const newStack = new Stack();

newStack.push(3);
newStack.push(4);
newStack.push(5);
newStack.pop();
newStack.pop();
newStack.pop();
