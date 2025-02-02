class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add item to the end
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return this;
  }

  // Remove item from the end
  pop() {
    if (!this.head) {
      return null;
    }
    debugger;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    return current;
  }

  // Remove from the head / first
  shift() {
    if (!this.head) {
      return undefined;
    }
    let tempHead = this.head;
    this.head = this.head.next;
    console.log(this, 'this shift');
    this.length--;
    if (this.length === 1) {
      this.tail = null;
    }
    return tempHead;
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log('current.val :>> ', current.val);
      current = current.next;
    }
  }
}

let newSinglyLinkedList = new SinglyLinkedList();
newSinglyLinkedList.push('Hi');

newSinglyLinkedList.push('Hello');
newSinglyLinkedList.push('Hello 2');

console.log(newSinglyLinkedList, 'push');

// newSinglyLinkedList.pop();
// newSinglyLinkedList.pop();
// newSinglyLinkedList.pop();
newSinglyLinkedList.shift();
