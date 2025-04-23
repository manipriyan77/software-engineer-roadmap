import SinglyLinkedList from "./singly-linked-list";

SinglyLinkedList.prototype.convertArray = function () {
  let temp = this.head;
  let results = [];
  while (this.head) {
    results.push(temp.val);
    temp = temp.next;
  }
  return results;
};

const list = new SinglyLinkedList();
list.push(3);
list.push(4);
list.push(7);
list.push(8);
console.log("list :>> ", list);
