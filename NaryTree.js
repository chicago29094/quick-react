
class NaryNode {

    constructor(childObj, level) {
        this._value=childObj;
        this._children=[];
        this._level=level;
    }

    get children() {
        return this._children;
    }

    get value() {
        return this._value;
    }

    get level() {
        return this._level;
    }

}


// This is an implementation of an iterable n-ary tree data structure and associated methods.
// An n-ary tree is a tree data structure where any node may have an arbitrary number of 
// child nodes. 

class NaryTree {

    // Instantiates an empty n-ary tree as a JavaScript object
    constructor() {
        this._tree={};
        this._size=0;
        this._modCount=0;
    }

    // Adds the parameter child object as root or the root node's next child
    // Returns a boolean value
    add(childObj) {
        if ( (childObj===undefined) || (childObj===null) ) {
            throw new Error('A valid child object must be specified to add a node to the n-ary tree.');
        }

        // Add the root node itself
        if (this.isEmpty()) {
            const node = new NaryNode(childObj, 0);
            this._tree = node;
            this._root = node;
            this._size++;
            this._modCount++;
        }
        // Add the next child for the root node
        else {
            const node = new NaryNode(childObj, 1);
            this._root.children.push(node);
            this._size++;
            this._modCount++;            
        }
        return true;
    }

    // Adds child as the the first child of the parent node in the n-ary tree
    // Returns a boolean value
    addAsFirstChild(childObj, parent) {
        if ( (childObj===undefined) || (childObj===null) ) {
            throw new Error('A valid child object must be specified to add a node to the n-ary tree.');
        }        
        if ( (parent===undefined) || (parent===null) || !(parent instanceof NaryNode) ) {
            throw new Error('A valid n-ary parent node must be specified to add a node to the n-ary tree.');
        }        
        const node = new NaryNode(childObj, parent.level+1)
        parent.children.unshift(node);
        this._size++;
        this._modCount++;
        return true;
    }

    // Adds child as the the last child of the parent node in the n-ary tree
    // Returns a boolean value
    addAsLastChild(childObj, parent) {
        if ( (childObj===undefined) || (childObj===null) ) {
            throw new Error('A valid child object must be specified to add a node to the n-ary tree.');
        }        
        if ( (parent===undefined) || (parent===null) || !(parent instanceof NaryNode) ) {
            throw new Error('A valid n-ary parent node must be specified to add a node to the n-ary tree.');
        }                
        const node = new NaryNode(childObj, parent.level+1)
        parent.children.push(node);
        this._size++;
        this._modCount++;        
        return true;
    }

    // Adds child as the the position child of the parent node in the n-ary tree using level-order traversal
    // Returns a boolean value
    addAtPosition(childObj, parent, position) {
        if ( (childObj===undefined) || (childObj===null) ) {
            throw new Error('A valid child object must be specified to add a node to the n-ary tree.');
        }        
        if ( (parent===undefined) || (parent===null) || !(parent instanceof NaryNode) ) {
            throw new Error('A valid n-ary parent node must be specified to add a node to the n-ary tree.');
        }              
        if ( (position<0) || (position>parent.children.length) ) {
            throw new Error('Position out of range. A tree node can not be added at the specified position.');
        }
        const node = new NaryNode(childObj, parent.level++)
        parent.children.splice(position, 0, node);
        this._size++;
        this._modCount++;        
        return true;
    }

    // Make this n-ary tree empty
    // Returns a boolean value
    clear() {
		this._root = null;
		this._size = 0;
		this._modCount++;
        return true;
    }

    // Indicates whether the existing object exists in this n-ary tree
    // Returns a boolean value
    contains(obj) {

        const startingNode=this._root;






    }

    // Return the root node of this n-ary tree
    get root() {
        return this._root;
    }

    // In no object parameter is specified, return the root node object
    // In an object is specified, get returns the first occurrence of the specified object using level-order traversal
    get(obj) {

    }

    // getNode returns the n-ary tree node reference for the first occurrence of the specified object
    getNode(obj) {

    }

    // returns the object in the root node
    getRootItem() {

    }

    // if naryNode is not specified, height returns the height of the naryTree from the root to the leaf nodes
    // if naryNode is specified, height return the height of the naryTree from the naryNode to the leaf nodes
    height(naryNode) {

    }

    // Returns a boolean value regarding whether the n-ary tree is empty or not
    isEmpty() {
        return (this._size===0)
    }

    // returns a level-order iterator for this n-ary tree
    * iterator(node) {
        return this.levelOrderIterator(node)    
    }

    // returns a level-order iterator for this n-ary tree
    * levelOrderIterator(node) {

        if (node===undefined || node===null) {
            return null;
        }
        const queue=[];
        queue.push(node);
        while (queue.length!==0) {

            let numNodes = queue.length;

            while (numNodes > 0) {

                const yieldNode = queue.shift();
                yield yieldNode;

                for (let child of yieldNode.children) {
                    queue.push(child);
                }
                numNodes--;
            }
        }

    }

    // returns a pre-order iterator for this n-ary tree
    * preOrderIterator(node) {

        if (node===undefined || node===null) {
            return null;
        }

        yield node;

        for (let child of node.children) {
            this.preOrderIterator(child);
        }

    }

    // If obj is not specified, remove removes the first item in the n-ary tree
    // If obj is specified, remove removes the first occurrence of the specified object
    // If object and parent are specified, remove removes the first occurrence of the specified object which is a descendant of the parent obj
    remove(obj, parent) {

    }

    // Removes the complete subtree having the specified object in the subtree's root node
    removeSubtree(obj) {

    }

    // Removes the complete subtree at the naryTree node is the root node
    removeNode(naryNode) {
        
    }

    // If naryNode is not specified, returns in the current size of the n-ary tree as a node count
    // If naryNode is specified, returns in the current size of the n-ary tree rooted from the specified node as a node count
    size(naryNode) {
        if (naryNode===undefined) {
            return this._size;
        }
    }

    // If naryNode is not specified, returns a string representation of the entire n-ary tree
    // If naryNode is specified, returns a string representation of the n-ary tree from the specified naryNode 
    toString(naryNode) {

    }
}


let happyObj0 = { name: "happy", type: "dog" }
const tree = new NaryTree();
tree.add(happyObj0)
let happyObj1 = { name: "happy1", type: "dog1" }
tree.add(happyObj1)
let happyObj2 = { name: "happy2", type: "dog2" }
tree.add(happyObj2)
let happyObj3 = { name: "happy3", type: "dog3" }
tree.add(happyObj3)
let happyObj4 = { name: "happy4", type: "dog4" }
tree.add(happyObj4)
let happyObj5 = { name: "happy5", type: "dog5" }
tree.add(happyObj5)
let happyObj6 = { name: "happy6", type: "dog6" }
tree.add(happyObj6)

//addAsLastChild(happyObj, parent)

console.log('Tree=');
console.log(tree);

console.log('Level Order Iterator=');
const iter = tree.levelOrderIterator(tree.root);

let h=0;
for (let val of iter) {
    h++;
    console.log(h);
    console.log(val);
}

console.log("Done");

