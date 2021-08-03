// n-ary Nodes have an item value, which can be any data type, although preferably an object, and 
// an array of reference pointers to the node's children
class NaryNode {

    constructor(childObj) {
        if ( (childObj===undefined) || (childObj===null) ) {
            throw TypeError('n-ary Nodes must be instantiated with a valid child object')
        }
        this._value=childObj;
        this._children=[];
    }

    get children() {
        return this._children;
    }

    get value() {
        return this._value;
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
            throw new TypeError('A valid child object must be specified to add a node to the n-ary tree.');
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
            throw new TypeError('A valid child object must be specified to add a node to the n-ary tree.');
        }        
        if ( (parent===undefined) || (parent===null) || !(parent instanceof NaryNode) ) {
            throw new TypeError('A valid n-ary parent node must be specified to add a node to the n-ary tree.');
        }        
        const node = new NaryNode(childObj)
        parent.children.unshift(node);
        this._size++;
        this._modCount++;
        return true;
    }

    // Adds child as the the last child of the parent node in the n-ary tree
    // Returns a boolean value
    addAsLastChild(childObj, parent) {
        if ( (childObj===undefined) || (childObj===null) ) {
            throw new TypeError('A valid child object must be specified to add a node to the n-ary tree.');
        }        
        if ( (parent===undefined) || (parent===null) || !(parent instanceof NaryNode) ) {
            throw new TypeError('A valid n-ary parent node must be specified to add a node to the n-ary tree.');
        }                
        const node = new NaryNode(childObj)
        parent.children.push(node);
        this._size++;
        this._modCount++;        
        return true;
    }

    // Adds child as the the position child of the parent node in the n-ary tree using level-order traversal
    // Returns a boolean value
    addAtPosition(childObj, parent, position) {
        if ( (childObj===undefined) || (childObj===null) ) {
            throw new TypeError('A valid child object must be specified to add a node to the n-ary tree.');
        }        
        if ( (parent===undefined) || (parent===null) || !(parent instanceof NaryNode) ) {
            throw new TypeError('A valid n-ary parent node must be specified to add a node to the n-ary tree.');
        }              
        if ( (position<0) || (position>parent.children.length) ) {
            throw new RangeError('Position out of range. A tree node can not be added at the specified position.');
        }
        const node = new NaryNode(childObj)
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

        if ( (obj===undefined) || (obj===null) ) {
            throw new TypeError('A valid child object must be specified when searching the n-ary tree for an object.');
        }     

        const treeIterator = this.levelOrderIterator(this._root);

        for (let node of treeIterator) {
            if (node.value===obj) {
                return true;
            }
        }
        return false;
    }

    // Return the root node of this n-ary tree
    get root() {
        return this._root;
    }

    // In no object parameter is specified, return the root node object
    // In an object is specified, get returns the first occurrence of the specified object using level-order traversal
    get(obj) {

        if ( (obj===undefined) || (obj===null) ) {
            return this._root.value;
        }

        const treeIterator = this.levelOrderIterator(this._root);

        for (let node of treeIterator) {
            if (node.value===obj) {
                return node.value;
            }
        }
        return null;
    }

    // getNode returns the n-ary tree node reference for the first occurrence of the specified object
    getNode(obj) {

        if ( (obj===undefined) || (obj===null) ) {
            return this._root;
        }

        const treeIterator = this.levelOrderIterator(this._root);

        for (let node of treeIterator) {
            if (node.value===obj) {
                return node;
            }
        }
        return null;
    }

    // returns the object in the root node
    getRootItem() {
        return this._root.value;
    }

    // if naryNode is not specified, height returns the height of the naryTree from the root to the leaf nodes
    // if naryNode is specified, height return the height of the naryTree from the naryNode to the leaf nodes
    // parentNaryNode is only utilized for recursive calls to skip reiterating through the entire tree
    height(naryNode, parentNaryNode) {
        if ( (naryNode===undefined) || (naryNode===null) ) {
            return 1+Math.max(this._root.children.map( (node) => {
                this.height(node. naryNode);
            } ) );
        }
        else {
            if ( (parentNaryNode===undefined) || (parentNaryNode==null) ) {
                const treeIterator = this.levelOrderIterator(this._root);

                let found=false;
                for (let node of treeIterator) {
                    if (node===naryNode) {
                        found=true;
                    }
                }
                if (found===false) {
                    throw new ReferenceError('The specified n-ary node was not found in this tree.')        
                }    
            }

            return 1+Math.max(naryNode.children.map( (node) => {
                this.height(node, naryNode);
            } ) );
        }
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
        if ( (obj===undefined) || (obj===null) ) {
            // Although there is a convention for removing a node in a binary tree, including the root node,
            // this is less clear for an n-ary tree.  In this implementation, we will mode the left-most 
            // child node into the position as the root node and make the other former root node children,
            // children of this new root node.  If the intent was to remove the entire tree, the clear method
            // could be utilized for that purpose.

            // First, check to see if the root node has no children, if so clear the entire tree
            if (this._root.children.length===0) {
                this.clear();
                return true;
            }
            else if (this._root.children.length>=1) {
                const previousRoot=this._root;  // Temp holder of previous root node reference
                this._root = previousRoot.children.shift(); // The new root is the first left-most child of the previous root node
                this._size -= 1; // The tree size is decreasing by one
                this._modCount++;
                // Add the remaining children of the previous root node as children of the new root node
                this._root.children.concat(previousRoot.children);      
                return true;    
            }
        }
        else if ( (obj!==undefined) && (obj!==null) ) {        
            removeNode = getNode(obj);
            if (removeNode===null) {
                throw new ReferenceError('The specified object reference is not present in this n-ary tree.');
            }
            if (removeNode===this._root) {
                this.remove(); // The remove node is the tree's root node, which is a special case.
                return true;
            }
            // First, check to see if the root node has no children, if so we just need to remove a reference to this child from it's parent node children array
            if (removeNode.children.length===0) {
                const treeIterator = this.levelOrderIterator(this._root);

                let found=false;
                for (let node of treeIterator) {
                    let index=node.children.indexOf(removeNode);
                    if (index!=-1) {
                        node.children.splice(index, 1);
                        found=true;
                        this._size -= 1; // The tree size is decreasing by one
                        this._modCount++;                        
                    }
                }                
                return true;
            }
            else if (removeNode.children.length>=1) {
                const treeIterator = this.levelOrderIterator(this._root);

                let found=false;
                for (let node of treeIterator) {
                    let index=node.children.indexOf(removeNode);
                    if (index!=-1) {
                        node.children.concat(removeNode.children);
                        node.children.splice(index, 1);
                        found=true;
                        this._size -= 1; // The tree size is decreasing by one
                        this._modCount++;                        
                    }
                }          

                return true;
            }            
        }
    }

    // Removes the complete subtree having the specified object in the subtree's root node
    removeSubtree(obj) {
        if ( (obj===undefined) || (obj===null) ) {
            throw new TypeErrot('A valid object must be specified when removing a sub-tree by object.')
        }

        const treeIterator = this.levelOrderIterator(this._root);

        let removeNode={};
        let found=false;
        for (let node of treeIterator) {
            if (node.value===obj) {
                removeNode=node;
                found=true;
            }
        }

        if (found===false) {
            throw new ReferenceError('The specified object was not found in this n-ary tree.');
        }

        // Check to see if the matching object was in the root node, which is a special case

        if (removeNode===this._root) {
            this.clear(); // The remove node is the tree's root node, which is a special case.
            return true;           
        }

        // Next, we need to find the parent node of this matching n-ary node
        const treeIterator = this.levelOrderIterator(this._root);

        let found=false;
        for (let node of treeIterator) {
            let index=node.children.indexOf(removeNode);
            if (index!=-1) {
                node.children.splice(index, 1);
                found=true;
                this._size -= 1; // The tree size is decreasing by one
                this._modCount++;                
            }
        }          

        return true;
    }

    // Removes the complete subtree where the naryTree node parameter is the root node of the sub-tree
    removeNode(naryNode) {
        if ( (naryNode===undefined) || (naryNode===null) ) {
            throw new TypeError('A valid n-arty tree node must be specified as the removeNode argument.')
        }

        const treeIterator = this.levelOrderIterator(this._root);

        let removeNode={};
        let found=false;
        for (let node of treeIterator) {
            if (node===naryNode) {
                removeNode=node;
                found=true;
            }
        }

        if (found===false) {
            throw new ReferenceError('The specified object was not found in this n-ary tree.');
        }

        if (removeNode===this._root) {
            this.clear(); // The remove node is the tree's root node, which is a special case.
            return true;           
        }

        // Next, we need to find the parent node of this matching n-ary node
        const treeIterator = this.levelOrderIterator(this._root);

        let found=false;
        for (let node of treeIterator) {
            let index=node.children.indexOf(removeNode);
            if (index!=-1) {
                node.children.splice(index, 1);
                found=true;
                this._size -= 1; // The tree size is decreasing by one
                this._modCount++;                
            }
        }          

        return true;

    }

    // If naryNode is not specified, returns in the current size of the n-ary tree as a node count
    // If naryNode is specified, returns in the current size of the n-ary tree rooted from the specified node as a node count
    size(naryNode) {
        if (naryNode===undefined) {
            return this._size;
        }

        const treeIterator = this.levelOrderIterator(this._root);

        let sizeNode={};
        let found=false;
        for (let node of treeIterator) {
            if (node===naryNode) {
                sizeNode=node;
                found=true;
            }
        }

        if (found===false) {
            throw new ReferenceError('The specified nary-node was not found in this n-ary tree.');
        }

        if (sizeNode===this._root) {
            return this._size;           
        }

        const treeIterator = this.levelOrderIterator(sizeNode);

        let size=0;
        for (let node of treeIterator) {
            size++;
        }
        return size;
        
    }

    // If naryNode is not specified, returns a string representation of the entire n-ary tree
    // If naryNode is specified, returns a string representation of the n-ary tree from the specified naryNode 
    toString(naryNode, relLevel=0) {
        let str="";
        let node = {};
        // if this method wasn't invoked with a n-ary node, start from the root node
        if ( (naryNode===undefined) || (naryNode===null) ) {
            node=this._root;
        }
        else {
            node = naryNode;
        }
        str=str+" ".repeat(relLevel*4);
        str=str+this.toString(node, relLevel)+"\n";
        for (let child of node.children) {
            str=str+this.toString(child, relLevel+1)+"\n";
        }
        return str;
    }

    // If naryNode is not specified, returns a JSON representation of the entire n-ary tree
    // If naryNode is specified, returns a JSON representation of the n-ary tree from the specified naryNode 
    toJSON(naryNode, relLevel=0) {

        let str = "";
        let node = {}

        if (naryNode===undefined || naryNode===null) {
            node = this._root;
        }
        else {
            node = naryNode;
        }

        str = str + "{\n";
        if (node===this._root) {
            str = str + `"root": ${node.value},\n`;
            str = str + `"children":  `;
        }
        else {
            str = str + `"root": ${node.value},\n`;
            str = str + `"children":  `;            
        }

        for (let child of node.children) {
            this.toJSON(child, relLevel+1);
        }        

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
for (let node of iter) {
    h++;
    console.log(h);
    console.log(node);
}
 
console.log("Done");

