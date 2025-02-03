// It's a FIFO Data Structure
// Insertion O(1)
// Removal O(1)
// Searching O(n)
// Access O(n)

class Node {
    constructor(val){
        this.value = val
        this.next = null
    }
}

class Queue{
    constructor(){
        this.first = null
        this.last = null
        this.size = 0
    }
    enqueue(val){
        const newNode = new Node(val)
        if(!this.first){
            this.first = newNode
            this.last = newNode
        }else{
            this.last.next = newNode
            this.last = newNode
        }
        this.size++
        return this
    }
    dequeue(){
        const current = this.first
        this.first = this.first.next
        if(this.size==1){
            this.first==null
            this.last=null
        }
        this.size--
        return current
    }
}

const newQueue = new Queue()
newQueue.enqueue(1)
newQueue.enqueue(3)
newQueue.enqueue(2)
newQueue.dequeue()
newQueue.dequeue()
newQueue.dequeue()

