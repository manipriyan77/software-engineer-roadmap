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
  traverse() {
    let current = this.head;
    while (current) {
      current = current.next;
    }
  }
  pop() {
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

  shift() {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return temp;
  }

  // Convert Array
  convertArray() {
    let temp = this.head;
    let results = [];
    while (this.head) {
      results.push(temp.val);
      temp = temp.next;
    }
    return results;
  }
  removeDuplicates(val) {
    let current = this.head;
    while (current.val) {
      if (current.val === val) {
        current = current.next;
      }
    }
    console.log(this.head);
    return this.head;
  }
  deleteNodeWithValueX(head, X) {
    if (!head) return null;

    while (head && head.val === X) {
      head = head.next;
    }

    let current = head;

    while (current && current.next) {
      if (current.next.val === X) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }

    return head;
  }
  insertAtHead(X) {
    let newNode = new Node(X);
    if (!this.head) {
      this.head = newNode;
    } else {
      let temp = this.head;
      this.head = newNode;
      newNode.next = temp;
    }
    return this.head;
  }
  insertAtKthPosition(X, K) {
    let newNode = new Node(K);
    let count = 1;
    let current = this.head;
    while (current.next) {
      if (count === X) {
        let temp = current.next;
        newNode.next = temp;
        current.next = newNode;
      }
      count++;
      current = current.next;
    }
    console.log("list :>> ", this.head);

    return this.head;
  }
}

let list = new SinglyLinkedList();
list.push(3);
list.push(4);
list.push(7);
list.push(8);
list.push(7);
list.push(7);
list.insertAtKthPosition(2, 77);
console.log("list :>> ", list);
