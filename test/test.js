const assert = require('assert');
const should = require('chai').should();
const expect = require('chai').expect;
const {NaryNode, NaryTree} = require('../utility/NaryTree');

let tree = new NaryTree();

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

function rebuildTestTree() {

    tree.clear();
    tree.add(happyObject1);
    tree.add(happyObject2);
    tree.add(happyObject3);
    tree.add(happyObject4);
    tree.addAsLastChild(happyObject5, tree.getNode(happyObject2) );    

    tree.addAsLastChild(happyObject6, tree.getNode(happyObject3) );    
    tree.addAsLastChild(happyObject7, tree.getNode(happyObject3) );    
    tree.addAsLastChild(happyObject8, tree.getNode(happyObject3) );    
    
    tree.addAsLastChild(happyObject9, tree.getNode(happyObject4) );    
    tree.addAsLastChild(happyObject10, tree.getNode(happyObject4) );    

    tree.addAsLastChild(happyObject11, tree.getNode(happyObject7) );    
    tree.addAsLastChild(happyObject12, tree.getNode(happyObject7) );    

    tree.addAsLastChild(happyObject20, tree.getNode(happyObject11) );    
    tree.addAsLastChild(happyObject21, tree.getNode(happyObject11) );    

    tree.addAsLastChild(happyObject13, tree.getNode(happyObject12) );    

    tree.addAsLastChild(happyObject14, tree.getNode(happyObject10) );    
    tree.addAsLastChild(happyObject15, tree.getNode(happyObject10) );    
    tree.addAsLastChild(happyObject16, tree.getNode(happyObject10) );    
    tree.addAsLastChild(happyObject17, tree.getNode(happyObject10) );    

    tree.addAsLastChild(happyObject18, tree.getNode(happyObject15) );    
    tree.addAsLastChild(happyObject19, tree.getNode(happyObject18) );    
}


    /*============================================================================*/

    describe('Nary Tree', function() {

    describe('NaryNode', function() {
        it('instantiating a NaryNode should return a NaryNode object', function() {
              const newNode = new NaryNode({});
              expect(newNode).to.be.a('object');
              expect(newNode).to.be.an.instanceof(NaryNode);
        });
    });

    /*============================================================================*/

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


    describe('NaryTree - isEmpty() method', function() {
        it('isEmpty should return a boolean of true or false dependent on if the tree is empty', function() {
            const newTree = new NaryTree();
            const newTree2 = Object.assign( newTree, tree);
            expect(newTree2.size()).to.equal(14);
            expect(newTree2.isEmpty()).to.equal(false);
            newTree2.clear();
            expect(newTree2.isEmpty()).to.equal(true);
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

    describe('NaryTree - getNode(obj) get Node via object method', function() {
        it('get the first node containing the referenced object', function() {
            expect(tree.getNode()).to.equal(tree.root);
            expect(tree.getNode(happyObject5).value).to.equal(happyObject5);
            expect(tree.getNode(happyObject21)).to.equal(null);
            expect(tree.getNode(happyObject15).value).to.equal(happyObject15);
        });
    });

    /*============================================================================*/

    describe('NaryTree - getRootItem() get the object in the root node', function() {
        it('getRootItem() should return the object referenced in the root node', function() {
            const rootNode = tree.getNode(happyObject1);
            expect(tree.getRootItem()).to.equal(happyObject1);
        });
    });

    /*============================================================================*/

    describe('NaryTree - height(naryNode) get the height of the tree', function() {
        it('height(naryNode) should return the height of the tree starting from the specified naryNode', function() {
            const rootNode = tree.root;
            expect(tree.height()).to.equal(4);
            expect(tree.height(rootNode)).to.equal(4);
            expect(tree.height(tree.getNode(happyObject2))).to.equal(2);
            expect(tree.height(tree.getNode(happyObject3))).to.equal(2);
            expect(tree.height(tree.getNode(happyObject4))).to.equal(3);
            expect(tree.height(tree.getNode(happyObject14))).to.equal(1);
        });
    });

    /*============================================================================*/

    describe('NaryTree - levelOrderIterator', function() {
        it('a levelOrderIterator should iterate over a naryTree in level order', function() {
            const rootNode = tree.root;
            const array=[];

            let parentNode=tree.getNode(happyObject15); 
            tree.addAsFirstChild(happyObject18, parentNode);

            parentNode=tree.getNode(happyObject18); 
            tree.addAsFirstChild(happyObject19, parentNode);

            const treeIterator = tree.levelOrderIterator(rootNode);
            for (let node of treeIterator) {
                array.push(node.value.nodeNum);
            }
            expect(array).to.be.an('array');
            expect(array).to.deep.equal([1,2,3,4,5,6,7,8,9,10,14,15,16,17,18,19]);
        });
    });

    /*============================================================================*/

    describe('NaryTree - preOrderIterator', function() {
        it('a preOrderIterator should iterate over a naryTree in pre-order', function() {
            const rootNode = tree.root;
            const array=[];

            const treeIterator = tree.preOrderIterator(rootNode);
            for (let node of treeIterator) {
                array.push(node.value.nodeNum);
            }
            expect(array).to.be.an('array');
            expect(array).to.deep.equal([1,2,5,3,6,7,8,4,9,10,14,15,18,19,16,17]);
        });
    });

    /*============================================================================*/

    describe('NaryTree - toString', function() {
        it('should print a readable string representation of the n-ary tree when called', function() {
            const rootNode = tree.root;

            console.log(tree.toString());            
        });
    });

    /*============================================================================*/

    describe('NaryTree - toJSON', function() {
        it('should print a JSON representation of the n-ary tree when called', function() {
            const rootNode = tree.root;

            console.log(tree.toJSON());            
        });
    });

    /*============================================================================*/

    describe('NaryTree - remove(obj, parent)', function() {

        it('should remove the root node if no object is specified', function() {

            const rootNode = tree.root;

            // Add some additional nodes to fill out the test tree in preparation for removal methods
            let parentNode=tree.getNode(happyObject7); 
            tree.addAsFirstChild(happyObject12, parentNode);

            parentNode=tree.getNode(happyObject12); 
            tree.addAsFirstChild(happyObject13, parentNode);

            parentNode=tree.getNode(happyObject7); 
            tree.addAsFirstChild(happyObject11, parentNode);

            parentNode=tree.getNode(happyObject11); 
            tree.addAsFirstChild(happyObject20, parentNode);

            parentNode=tree.getNode(happyObject11); 
            tree.addAsFirstChild(happyObject21, parentNode);

            //console.log(tree.toString());     

            // Remove the root node
            const expectedNewRootNode=tree.getNode(happyObject2);
            tree.remove();
            expect(tree.root).to.be.equal(expectedNewRootNode);
     
            //console.log(tree.toString());     

        });
    });

    /*============================================================================*/

    describe('NaryTree - remove(obj, parent)', function() {
        it('should remove a leaf node', function() {
      
            //console.log(tree.toString());     

            // Remove a leaf node 
            tree.remove(happyObject5);
            expect(tree.contains(happyObject5)).to.be.false;
     
            //console.log(tree.toString());     

        });
    });

    /*============================================================================*/

    describe('NaryTree - remove(obj, parent)', function() {
        it('should remove an interior node with 1 child', function() {

            //console.log(tree.toString());     

            // Remove an interior node with one child 
            tree.remove(happyObject12);
            expect(tree.contains(happyObject12)).to.be.false;
     
            //console.log(tree.toString());     

        });
    });

    /*============================================================================*/

    describe('NaryTree - remove(obj, parent)', function() {
        it('should remove an interior node with many children', function() {

            //console.log(tree.toString());     
            
            // Remove an interior node with many children
            tree.remove(happyObject10);
            expect(tree.contains(happyObject10)).to.be.false;
            
            //console.log(tree.toString());     
        });
    });
    
    /*============================================================================*/
    
    describe('NaryTree - remove(obj, parent)', function() {
        it('should remove an interior node under a specified parent', function() {
            
            // Add an existing object to a second location not underneath the targeted parent node
            let parentNode=tree.getNode(happyObject2); 
            tree.addAsFirstChild(happyObject16, parentNode);

            parentNode=tree.getNode(happyObject6); 
            tree.addAsFirstChild(happyObject16, parentNode);

            //console.log(tree.toString());     

            // Remove the target object underneath the specified node
            parentNode=tree.getNode(happyObject4); 
            tree.remove(happyObject16, parentNode);
            expect(tree.contains(happyObject16)).to.be.true;

            parentNode=tree.getNode(happyObject6);
            expect(tree.contains(happyObject16, parentNode)).to.be.true;
     
            parentNode=tree.getNode(happyObject4);
            expect(tree.contains(happyObject16, parentNode)).to.be.false;

            //console.log(tree.toString());     

        });
    });

    /*============================================================================*/

    describe('NaryTree - removeSubtree(obj, parent)', function() {

        it('should remove the subtree rooted in the node that references the parameter object', function() {

            rebuildTestTree(); 

            // Remove the matching subtree
            tree.removeSubtree(happyObject7);
            expect(tree.contains(happyObject7)).to.be.false;
            expect(tree.contains(happyObject11)).to.be.false;
            expect(tree.contains(happyObject21)).to.be.false;
            expect(tree.contains(happyObject20)).to.be.false;
     
            //console.log(tree.toString());     

        });
    });

    /*============================================================================*/

    describe('NaryTree - removeSubtree(obj, parent)', function() {
        it('should remove the subtree rooted in the node that references the parameter object', function() {

            rebuildTestTree(); 

            parentNode=tree.getNode(happyObject6); 
            tree.addAsFirstChild(happyObject16, parentNode);

            //console.log(tree.toString());   

            // Remove the matching subtree

            tree.removeSubtree(happyObject16, parentNode );
            expect(tree.contains(happyObject6)).to.be.true;
            expect(tree.contains(happyObject16)).to.be.true;
            parentNode=tree.getNode(happyObject6); 
            expect(tree.contains(happyObject16, parentNode)).to.be.false;
     
            //console.log(tree.toString());     

        });
    });

    /*============================================================================*/

    describe('NaryTree - removeNode(naryNode)', function() {

        it('should remove the node passed as a parameter and adjust descendants if necessary', function() {

            rebuildTestTree(); 

            //console.log("Here000000:", tree.toString());   

            let node = tree.getNode(happyObject10);
            tree.removeNode(node);
            expect(tree.contains(happyObject10)).to.be.false;
     
            //console.log(tree.toString());     

            node = tree.getNode(happyObject6);
            tree.removeNode(node);
            expect(tree.contains(happyObject6)).to.be.false;

            //console.log(tree.toString());     

        });
    });

    /*============================================================================*/


});

