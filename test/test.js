const assert = require('assert');
const should = require('chai').should();
const expect = require('chai').expect;
const {NaryNode, NaryTree} = require('../utility/NaryTree');

describe('Nary Tree', function() {

    describe('NaryNode', function() {
        it('instantiating a NaryNode should return a NaryNode object', function() {
              const newNode = new NaryNode({});
              expect(newNode).to.be.a('object');
              expect(newNode).to.be.an.instanceof(NaryNode);
        });
    });


    /*============================================================================*/

    const tree = new NaryTree();

    describe('NaryTree - Instantiation', function() {
        it('instantiating a NaryTree should return a NaryTree object', function() {
              expect(tree).to.be.a('object');
              expect(tree).to.be.an.instanceof(NaryTree);
        });
        it('a newly instantiated NaryTree should have a size of zero', function() {
            expect(tree.size()).to.equal(0);
        });
    });

    /*============================================================================*/

    const happyObject1 = { name: "happy", type: "dog", nodeNum: 1 };
    const happyObject2 = { name: "happy", type: "dog", nodeNum: 2 };
    const happyObject3 = { name: "happy", type: "dog", nodeNum: 3 };
    const happyObject4 = { name: "happy", type: "dog", nodeNum: 4 };
    const happyObject5 = { name: "happy", type: "dog", nodeNum: 5 };
    const happyObject6 = { name: "happy", type: "dog", nodeNum: 6 };
    const happyObject7 = { name: "happy", type: "dog", nodeNum: 7 };
    const happyObject8 = { name: "happy", type: "dog", nodeNum: 8 };
    const happyObject9 = { name: "happy", type: "dog", nodeNum: 9 };
    const happyObject10 = { name: "happy", type: "dog", nodeNum: 10 };
    const happyObject11 = { name: "happy", type: "dog", nodeNum: 11 };
    const happyObject12 = { name: "happy", type: "dog", nodeNum: 12 };
    const happyObject13 = { name: "happy", type: "dog", nodeNum: 13 };
    const happyObject14 = { name: "happy", type: "dog", nodeNum: 14 };
    const happyObject15 = { name: "happy", type: "dog", nodeNum: 15 };
    const happyObject16 = { name: "happy", type: "dog", nodeNum: 16 };
    const happyObject17 = { name: "happy", type: "dog", nodeNum: 17 };
    const happyObject18 = { name: "happy", type: "dog", nodeNum: 18 };
    const happyObject19 = { name: "happy", type: "dog", nodeNum: 19 };
    const happyObject20 = { name: "happy", type: "dog", nodeNum: 20 };
    const happyObject21 = { name: "happy", type: "dog", nodeNum: 21 };
 
    describe('NaryTree - add(childObj) method', function() {
        it('a newly instantiated NaryTree should have a size of zero', function() {
            expect(tree.size()).to.equal(0);
        });
        it('an empty tree should have a height of zero', function() {
            expect(tree.height()).to.equal(0);
        });        
        it('adding an object to an empty tree should add the object to the root node', function() {
            tree.add(happyObject1);
            expect(tree.root.value).to.equal(happyObject1);
        });
        it('a tree with one node should have a size of 1', function() {
            expect(tree.size()).to.equal(1);
        });
        it('a tree with one node should have a height of 1', function() {
            expect(tree.height()).to.equal(1);
        });

        it('adding a second object to the tree should add the object to a new node as a child of the root node', function() {
            tree.add(happyObject2);
            expect(tree.root.children[0].value).to.equal(happyObject2);
        });

        it('adding a third object to the tree should add the object to a new node as a child of the root node', function() {
            tree.add(happyObject3);
            expect(tree.root.children[1].value).to.equal(happyObject3);
        });

        it('adding a fourth object to the tree should add the object to a new node as a child of the root node', function() {
            tree.add(happyObject4);
            expect(tree.root.children[2].value).to.equal(happyObject4);
            expect(tree.root.children[2].value.nodeNum).to.equal(4);
        });

        it('a tree with four nodes should have a size of 4', function() {
            expect(tree.size()).to.equal(4);
        });
    });

    /*============================================================================*/

    describe('NaryTree - addAsFirstChild(childObj, parent) method', function() {
        it('adding a child object to a parent node with no children should add one node in the parent\'s children array in the first array index position', function() {
            const parentNode=tree.getNode(happyObject2); 
            tree.addAsFirstChild(happyObject5, parentNode);
            expect(parentNode.children[0].value).to.equal(happyObject5);
        });

        it('adding a child object to a parent node with no children should add one node in the parent\'s children array in the first array index position', function() {
            const parentNode=tree.getNode(happyObject3); 
            tree.addAsFirstChild(happyObject8, parentNode);
            expect(parentNode.children[0].value).to.equal(happyObject8);
        });

        it('adding a child object to a parent node with children should add one node in the parent\'s children array in the first array index position and shift the other children', function() {
            const parentNode=tree.getNode(happyObject3); 
            tree.addAsFirstChild(happyObject7, parentNode);
            expect(parentNode.children[0].value).to.equal(happyObject7);
            expect(parentNode.children[1].value).to.equal(happyObject8);
        });

        it('adding a child object to a parent node with children should add one node in the parent\'s children array in the first array index position and shift the other children', function() {
            const parentNode=tree.getNode(happyObject3); 
            tree.addAsFirstChild(happyObject6, parentNode);
            expect(parentNode.children[0].value).to.equal(happyObject6);
            expect(parentNode.children[1].value).to.equal(happyObject7);
            expect(parentNode.children[2].value).to.equal(happyObject8);
        });

        it('a tree with 8 nodes should have a size of 8', function() {
            expect(tree.size()).to.equal(8);
        });

        it('a tree with 3 levels should have a height of 3', function() {
            expect(tree.height()).to.equal(3);
        });
    });

   /*============================================================================*/

   describe('NaryTree - addAsLastChild(childObj, parent) method', function() {
    it('adding a child object to a parent node with no children should add one node in the parent\'s children array in the first array index position', function() {
        const parentNode=tree.getNode(happyObject4); 
        tree.addAsLastChild(happyObject9, parentNode);
        expect(parentNode.children[0].value).to.equal(happyObject9);
    });

    it('adding a child object to a parent node with children should add one node in the parent\'s children array in the last array index position ', function() {
        const parentNode=tree.getNode(happyObject4); 
        tree.addAsLastChild(happyObject10, parentNode);
        expect(parentNode.children[0].value).to.equal(happyObject9);
        expect(parentNode.children[1].value).to.equal(happyObject10);
    });

    it('a tree with 10 nodes should have a size of 10', function() {
        expect(tree.size()).to.equal(10);
    });

    it('a tree with 3 levels should have a height of 3', function() {
        expect(tree.height()).to.equal(3);
    });
});

/*============================================================================*/

    describe('NaryTree - addAtPosition(childObj, parent, position) method', function() {
        it('adding a child object to a parent node with no children should add one node in the parent\'s children array in the first array index position', function() {
            const parentNode=tree.getNode(happyObject10); 
            tree.addAtPosition(happyObject14, parentNode, 0);
            expect(parentNode.children[0].value).to.equal(happyObject14);
        });

        it('adding a child object to a parent node with no children should add one node in the parent\'s children array in the first array index position', function() {
            const parentNode=tree.getNode(happyObject10); 
            tree.addAtPosition(happyObject16, parentNode, 1);
            expect(parentNode.children[0].value).to.equal(happyObject14);
            expect(parentNode.children[1].value).to.equal(happyObject16);
        });

        it('adding a child object to a parent node with children should add one node in the parent\'s children array in the first array index position and shift the other children', function() {
            const parentNode=tree.getNode(happyObject10); 
            tree.addAtPosition(happyObject15, parentNode, 1);
            expect(parentNode.children[0].value).to.equal(happyObject14);
            expect(parentNode.children[1].value).to.equal(happyObject15);
            expect(parentNode.children[2].value).to.equal(happyObject16);
        });

        it('adding a child object to a parent node with children should add one node in the parent\'s children array in the first array index position and shift the other children', function() {
            const parentNode=tree.getNode(happyObject10); 
            tree.addAtPosition(happyObject17, parentNode, 3);
            expect(parentNode.children[0].value).to.equal(happyObject14);
            expect(parentNode.children[1].value).to.equal(happyObject15);
            expect(parentNode.children[2].value).to.equal(happyObject16);
            expect(parentNode.children[3].value).to.equal(happyObject17);
        });

        it('a tree with 14 nodes should have a size of 14', function() {
            expect(tree.size()).to.equal(14);
        });

        it('a tree with 4 levels should have a height of 4', function() {
            expect(tree.height()).to.equal(4);
        });
    });

/*============================================================================*/

    describe('NaryTree - clear() method', function() {
        it('clear should clear all nodes from a tree and reset the tree\'s size to zero', function() {
            const newTree = new NaryTree();
            const newTree2 = Object.assign( newTree, tree);
            expect(newTree2.size()).to.equal(14);
            newTree2.clear();
            expect(newTree2.size()).to.equal(0);
            expect(tree.size()).to.equal(14);
        });
    });

/*============================================================================*/

describe('NaryTree - contains(obj) method', function() {
    it('should return true if a tree contains an object passed as an argument otherwise false', function() {
        expect(tree.contains(happyObject1)).to.equal(true);
        expect(tree.contains(happyObject7)).to.equal(true);
        expect(tree.contains(happyObject9)).to.equal(true);
        expect(tree.contains(happyObject20)).to.equal(false);
        expect(tree.contains(happyObject21)).to.equal(false);
    });
});

/*============================================================================*/

describe('NaryTree - get root() getter method', function() {
    it('get root() should return the root node', function() {
        const rootNode = tree.getNode(happyObject1);
        expect(tree.root).to.equal(rootNode);
    });
});

/*============================================================================*/

describe('NaryTree - get(obj) get object method', function() {
    it('get the first occurrence of the object', function() {
        const rootNode = tree.getNode(happyObject1);
        expect(tree.get(happyObject1)).to.equal(rootNode.value);
        expect(tree.get(happyObject5)).to.equal(happyObject5);
        expect(tree.get(happyObject21)).to.equal(null);
        expect(tree.get()).to.equal(happyObject1);
        expect(tree.get(happyObject15)).to.equal(happyObject15);
    });
});

/*============================================================================*/

});

/*

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
*/

