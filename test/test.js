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

    const tree = new NaryTree();

    describe('NaryTree', function() {
        it('instantiating a NaryTree should return a NaryTree object', function() {
              expect(tree).to.be.a('object');
              expect(tree).to.be.an.instanceof(NaryTree);
        });
        it('a newly instantiated NaryTree should have a size of zero', function() {
            expect(tree.size()).to.equal(0);
        });
    });

    let happyNode = { name: "happy", type: "dog", nodeNum: 1 };

    describe('NaryTree - add nodes', function() {
        it('a newly instantiated NaryTree should have a size of zero', function() {
            expect(tree.size()).to.equal(0);
        });
        it('adding a node to an empty tree should add the node to the root node', function() {
            tree.add(happyNode);
            expect(tree.root).to.equal(happyNode);
        });
        it('a tree with one node should have a size of 1', function() {
            expect(tree.size()).to.equal(1);
        });

        happyNode = { name: "happy", type: "dog", nodeNum: 2 };
        it('adding a second node to the tree should add the new node as a child of the root node', function() {
            tree.add(happyNode);
            expect(tree.root.children[0]).to.equal(happyNode);
        });

        happyNode = { name: "happy", type: "dog", nodeNum: 3 };
        it('adding a third node to the tree should add the new node as a child of the root node', function() {
            tree.add(happyNode);
            expect(tree.root.children[1]).to.equal(happyNode);
        });

        happyNode = { name: "happy", type: "dog", nodeNum: 4 };
        it('adding a fourth node to the tree should add the new node as a child of the root node', function() {
            tree.add(happyNode);
            expect(tree.root.children[2]).to.equal(happyNode);
            expect(tree.root.children[2].nodeNum).to.equal(4);
        });

        it('a tree with four nodes should have a size of 4', function() {
            expect(tree.size()).to.equal(4);
        });


    });

    

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