
class NaryNode {

    constructor(parentNode, obj, level) {
        this._parentNode=parentNode;
        this._value=obj;
    }

    get parentNode() {
        return this._parentNode;
    }

    get value() {
        return this._value;
    }

}


// This is an implementation of an iterable n-ary Tree data structure and associated methods.
// An n-ary tree is a tree data structure where any node may have an arbitrary number of 
// child nodes. 

class NaryTree {

    // Instantiates an empty n-ary tree as a JavaScript object
    constructor() {
        this._tree={};
        this._size=0;
    }

    // Adds the parameter child object as root or the root node's next child
    // Returns a boolean value
    add(child) {
        if (this.isEmpty()) {
            const node = new NaryNode(child, null);
        }
        else {
            this._tree.
        }
    }

    // Adds child as the the first child of the parent node in the n-ary tree
    // Returns a boolean value
    addAsFirstChild(child, parent) {

    }

    // Adds child as the the last child of the parent node in the n-ary tree
    // Returns a boolean value
    addAsLastChild(child, parent) {

    }

    // Adds child as the the position child of the parent node in the n-ary tree using level-order traversal
    // Returns a boolean value
    addAtPosition(child, parent, position) {

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

    }

    // In no object parameter is specified, get return the root node object
    // In an object is specified, get returns the first occurrence of the specified object using level-order traversal
    get(obj) {

    }

    // getNode returns the n-ary Tree node reference for the first occurrence of the specified object
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
    iterator() {

    }

    // returns a level-order iterator for this n-ary tree
    levelOrderIterator() {

    }

    // returns a pre-order iterator for this n-ary tree
    preOrderIterator() {

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

const happyNode = { name: "happy", type: "dog" }
const tree = new NaryTree();
tree.add(happyNode)

console.log(tree);

