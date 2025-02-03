class Node{
    constructor(val){
        this.value = val
        this.left=null
        this.right = null
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null
    }
    insert(val){
        const newNode = new Node(val)
        if(!this.root){
            this.root = newNode
            return this
        }else{
            let current = this.root
            while(true){
                if(val<current.value){
                    if(current.left === null){
                        current.left = newNode
                        return this
                    }else{
                        current = current.left
                    }
                }else if(val>current.value){
                    if(current.right === null){
                        current.right = newNode
                        return this
                    }else{
                        current = current.right 
                    }
                }
            }
        }
        
    }
    find(val){
        let current = this.root
        let isFound = false
        while(current && !isFound){
           if(val<current.value){
            current = current.left
           }else if (val>current.value){
            current = current.right
           }else {
            isFound = true
           }
        }
        return isFound
    }
}

const binaryTree = new BinarySearchTree()
binaryTree.insert(9)
binaryTree.insert(92)
binaryTree.insert(19)
binaryTree.insert(39)
binaryTree.insert(94)
binaryTree.insert(956)
binaryTree.insert(5)
binaryTree.insert(7)

binaryTree.find(77)