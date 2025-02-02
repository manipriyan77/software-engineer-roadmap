const { current } = require('@reduxjs/toolkit');

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
    return this;
  }

  // Remove item from the end
  pop() {
    if (!this.head) {
      return null;
    }
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  // Remove from the head / first
  shift() {
    if (!this.head) {
      return undefined;
    }
    let tempHead = this.head;
    this.head = this.head.next;
    tempHead.next = null;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return tempHead;
  }

  // add item on the first / head
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // get item by index
  get(index) {
    let count = 0;
    let current = this.head;
    if (index > this.length - 1) {
      return undefined;
    }
    while (index !== count) {
      current = current.next;
      count++;
    }
    return current;
  }

  set(index, val) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
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

console.log(newSinglyLinkedList, 'push');

// newSinglyLinkedList.pop();
// newSinglyLinkedList.pop();
// newSinglyLinkedList.pop();
newSinglyLinkedList.shift();
newSinglyLinkedList.push('Hello 2');

newSinglyLinkedList.unshift('Value');
console.log(newSinglyLinkedList, 'unsift');
