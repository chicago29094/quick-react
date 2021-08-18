## Classes

<dl>
<dt><a href="#NaryNode">NaryNode</a></dt>
<dd><p>n-ary Nodes have an item value, which can be any data type, although preferably an object, and 
an array of reference pointers to the node&#39;s children</p>
</dd>
<dt><a href="#NaryTree">NaryTree</a></dt>
<dd><p>This is an implementation of an iterable n-ary tree data structure and associated methods.
An n-ary tree is a tree data structure where any node may have an arbitrary number of 
child nodes. This can potentially used as a trie, but it is not designed for that purpose.</p>
</dd>
</dl>

<a name="NaryNode"></a>

## NaryNode
n-ary Nodes have an item value, which can be any data type, although preferably an object, and 
an array of reference pointers to the node's children

**Kind**: global class  

* [NaryNode](#NaryNode)
    * [new NaryNode(childObj)](#new_NaryNode_new)
    * [.children](#NaryNode+children) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.value](#NaryNode+value) ⇒ <code>Object</code>
    * [.children](#NaryNode+children)
    * [.value](#NaryNode+value)

<a name="new_NaryNode_new"></a>

### new NaryNode(childObj)

| Param | Type | Description |
| --- | --- | --- |
| childObj | <code>Object</code> | any object type - The object to be inserted at the new n-ary node |

<a name="NaryNode+children"></a>

### naryNode.children ⇒ <code>Array.&lt;Object&gt;</code>
Retrieve the children of this node

**Kind**: instance property of [<code>NaryNode</code>](#NaryNode)  
**Returns**: <code>Array.&lt;Object&gt;</code> - children - an array of child nodes  
<a name="NaryNode+value"></a>

### naryNode.value ⇒ <code>Object</code>
Retrieve the object stored in this node

**Kind**: instance property of [<code>NaryNode</code>](#NaryNode)  
**Returns**: <code>Object</code> - value object - the object stored in this node  
<a name="NaryNode+children"></a>

### naryNode.children
Replace the children array associated with this node

**Kind**: instance property of [<code>NaryNode</code>](#NaryNode)  

| Param | Type | Description |
| --- | --- | --- |
| newArray | <code>Array.&lt;array&gt;</code> | a new array of child object references |

<a name="NaryNode+value"></a>

### naryNode.value
Replace the object stored in this node

**Kind**: instance property of [<code>NaryNode</code>](#NaryNode)  

| Param | Type | Description |
| --- | --- | --- |
| newValue | <code>Object</code> | any object type - the new object to store in this node |

<a name="NaryTree"></a>

## NaryTree
This is an implementation of an iterable n-ary tree data structure and associated methods.
An n-ary tree is a tree data structure where any node may have an arbitrary number of 
child nodes. This can potentially used as a trie, but it is not designed for that purpose.

**Kind**: global class  

* [NaryTree](#NaryTree)
    * [new NaryTree()](#new_NaryTree_new)
    * [.root](#NaryTree+root) ⇒ <code>Object</code>
    * [.add(childObj)](#NaryTree+add) ⇒ <code>boolean</code>
    * [.addAsFirstChild(childObj, parent)](#NaryTree+addAsFirstChild) ⇒ <code>boolean</code>
    * [.addAsLastChild(childObj, parent)](#NaryTree+addAsLastChild) ⇒ <code>boolean</code>
    * [.addAtPosition(childObj, parent, position)](#NaryTree+addAtPosition) ⇒ <code>boolean</code>
    * [.clear()](#NaryTree+clear) ⇒ <code>boolean</code>
    * [.contains(obj, parentNode)](#NaryTree+contains) ⇒ <code>boolean</code>
    * [.get(obj)](#NaryTree+get) ⇒ <code>boolean</code>
    * [.getNode(obj)](#NaryTree+getNode) ⇒ <code>Object</code>
    * [.getByObjectProperty(obj)](#NaryTree+getByObjectProperty) ⇒ <code>Object</code>
    * [.getNodeByObjectProperty(obj)](#NaryTree+getNodeByObjectProperty) ⇒ <code>Object</code>
    * [.getRootItem()](#NaryTree+getRootItem) ⇒ <code>Object</code>
    * [.height(NaryNode)](#NaryTree+height) ⇒ <code>number</code>
    * [.isEmpty()](#NaryTree+isEmpty) ⇒ <code>boolean</code>
    * [.iterator(node)](#NaryTree+iterator)
    * [.levelOrderIterator(node)](#NaryTree+levelOrderIterator)
    * [.preOrderIterator(node, [node])](#NaryTree+preOrderIterator)
    * [.remove(obj, parent)](#NaryTree+remove) ⇒ <code>boolean</code>
    * [.removeNode(naryNode)](#NaryTree+removeNode) ⇒ <code>boolean</code>
    * [.removeSubtree(obj, parentNode)](#NaryTree+removeSubtree) ⇒ <code>boolean</code>
    * [.removeNodeSubtree(naryNode)](#NaryTree+removeNodeSubtree) ⇒ <code>boolean</code>
    * [.size(naryNode)](#NaryTree+size) ⇒ <code>number</code>
    * [.toString([naryNode], [relLevel])](#NaryTree+toString) ⇒ <code>string</code>
    * [.toJSON([naryNode], [relLevel])](#NaryTree+toJSON) ⇒ <code>string</code>

<a name="new_NaryTree_new"></a>

### new NaryTree()
Instantiates an empty n-ary tree as a JavaScript object

<a name="NaryTree+root"></a>

### naryTree.root ⇒ <code>Object</code>
Return the root node of this n-ary tree

**Kind**: instance property of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>Object</code> - NaryNode node object - returns a reference to the root node  
<a name="NaryTree+add"></a>

### naryTree.add(childObj) ⇒ <code>boolean</code>
Adds the parameter child object as root or the root node's next child

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value - success of operation  

| Param | Type | Description |
| --- | --- | --- |
| childObj | <code>Object</code> | object value - an object to store in the node |

<a name="NaryTree+addAsFirstChild"></a>

### naryTree.addAsFirstChild(childObj, parent) ⇒ <code>boolean</code>
Adds child as the the first child of the parent node in the n-ary tree

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value - success of operation  

| Param | Type | Description |
| --- | --- | --- |
| childObj | <code>Object</code> | object value - an object to store in the node |
| parent | <code>Object</code> | NaryNode node object - the parent n-ary node |

<a name="NaryTree+addAsLastChild"></a>

### naryTree.addAsLastChild(childObj, parent) ⇒ <code>boolean</code>
Adds child as the the last child of the parent node in the n-ary tree
Returns a boolean value

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| childObj | <code>Object</code> | object value - an object to store in the node |
| parent | <code>Object</code> | NaryNode node object - the parent n-ary node |

<a name="NaryTree+addAtPosition"></a>

### naryTree.addAtPosition(childObj, parent, position) ⇒ <code>boolean</code>
Adds child as the the position child of the parent node in the n-ary tree using level-order traversal
Returns a boolean value

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| childObj | <code>Object</code> | object value - an object to store in the node |
| parent | <code>Object</code> | NaryNode node object - the parent n-ary node |
| position | <code>number</code> | integer - the position number where the child should be included in the children array for this node |

<a name="NaryTree+clear"></a>

### naryTree.clear() ⇒ <code>boolean</code>
Make this n-ary tree empty

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  
<a name="NaryTree+contains"></a>

### naryTree.contains(obj, parentNode) ⇒ <code>boolean</code>
Indicates whether an existing object, passed as an argument, exists in this n-ary tree
If parentNode is specified contains only looks within the subtree rooted in the parentNode
If obj is itself an n-ary Node a search-by-node is performed instead of a search for a matching object
Returns a boolean value

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | an object stored in any node |
| parentNode | <code>Object</code> | NaryNode object - the parent n-ary node |

<a name="NaryTree+get"></a>

### naryTree.get(obj) ⇒ <code>boolean</code>
In no object parameter is specified, return the root node object
In an object is specified, get returns the first occurrence of the specified object using a level-order tree traversal iterator.

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object - an object stored in a node somewhere in this tree |

<a name="NaryTree+getNode"></a>

### naryTree.getNode(obj) ⇒ <code>Object</code>
getNode returns the n-ary tree node reference for the first occurrence of the specified object passed as an argument to the method.

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>Object</code> - NaryNode node object - a reference to first node found containing a reference to the specified object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | an object store in a node |

<a name="NaryTree+getByObjectProperty"></a>

### naryTree.getByObjectProperty(obj) ⇒ <code>Object</code>
In no object parameter is specified, return the root node object
In an object is specified, get returns the first occurrence of the specified object using a level-order tree traversal iterator.

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>Object</code> - node value object - returns the first object found containing the specified property and property value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | {key:value} object - a property key and value object |

<a name="NaryTree+getNodeByObjectProperty"></a>

### naryTree.getNodeByObjectProperty(obj) ⇒ <code>Object</code>
getNode returns the n-ary tree node reference for the first occurrence of the specified object passed as an argument to the method.

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>Object</code> - NaryNode node object - returns the first node found containing an object with the specified property and property value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | {key:value} object - a property key and value object |

<a name="NaryTree+getRootItem"></a>

### naryTree.getRootItem() ⇒ <code>Object</code>
returns the object in the root node of the tree

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>Object</code> - root node value object - a reference to the object stored in the root node of the tree  
<a name="NaryTree+height"></a>

### naryTree.height(NaryNode) ⇒ <code>number</code>
if naryNode is not specified, height returns the height of the naryTree from the root to the leaf nodes
if naryNode is specified, height return the height of the naryTree from the naryNode to the leaf nodes

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>number</code> - height integer - the height of the tree in levels from the reference node to the deepest leaf node  

| Param | Type | Description |
| --- | --- | --- |
| NaryNode | <code>Object</code> | node object - an n-ary node present in this tree |

<a name="NaryTree+isEmpty"></a>

### naryTree.isEmpty() ⇒ <code>boolean</code>
Returns a boolean value reflecting whether the n-ary tree is empty or not

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value - is the tree empty?  
<a name="NaryTree+iterator"></a>

### naryTree.iterator(node)
returns a level-order iterator for this n-ary tree

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | NaryNode object - the parent n-ary node of the tree or contained subtree |

<a name="NaryTree+levelOrderIterator"></a>

### naryTree.levelOrderIterator(node)
returns a level-order iterator for this n-ary tree

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | NaryNode object - the parent n-ary node of the tree or contained subtree |

<a name="NaryTree+preOrderIterator"></a>

### naryTree.preOrderIterator(node, [node])
returns a pre-order iterator for this n-ary tree

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Object</code> |  | NaryNoe object - the parent n-ary node |
| [node] | <code>number</code> | <code>this._modCount</code> | number - the modCount value is used to track whether the tree has been modified during the iteration, which is an error condition |

<a name="NaryTree+remove"></a>

### naryTree.remove(obj, parent) ⇒ <code>boolean</code>
If obj is not specified, remove removes the first item in the n-ary tree
If obj is specified, remove removes the first occurrence of the specified object
If object and parent are specified, remove removes the first occurrence of the specified object which is a descendant of the parent obj

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | an object stored in any node |
| parent | <code>Object</code> | NaryNode parent object - the parent n-ary node |

<a name="NaryTree+removeNode"></a>

### naryTree.removeNode(naryNode) ⇒ <code>boolean</code>
Removed the n-ary Node passed as a parameter.  If no value is passed, the root node is used.

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| naryNode | <code>Object</code> | node object - the n-ary node to remove |

<a name="NaryTree+removeSubtree"></a>

### naryTree.removeSubtree(obj, parentNode) ⇒ <code>boolean</code>
Removes the complete subtree having the specified object in the subtree's root node
If parent node is specified the object must be underneath the parent node

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object - an object stored in any node |
| parentNode | <code>Object</code> | NaryNode parent node - the parent n-ary node |

<a name="NaryTree+removeNodeSubtree"></a>

### naryTree.removeNodeSubtree(naryNode) ⇒ <code>boolean</code>
Removes the complete subtree where the naryTree node parameter is the root node of the sub-tree

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>boolean</code> - boolean value  

| Param | Type | Description |
| --- | --- | --- |
| naryNode | <code>Object</code> | node object - an n-ary node positioned at the root of the subtree to remove |

<a name="NaryTree+size"></a>

### naryTree.size(naryNode) ⇒ <code>number</code>
If naryNode is not specified, returns in the current size of the n-ary tree as a node count
If naryNode is specified, returns in the current size of the n-ary tree rooted from the specified node as a node count

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>number</code> - integer value - a count of the nodes comprising the tree rooted at the specified node parameter  

| Param | Type | Description |
| --- | --- | --- |
| naryNode | <code>Object</code> | parent node - the parent n-ary node |

<a name="NaryTree+toString"></a>

### naryTree.toString([naryNode], [relLevel]) ⇒ <code>string</code>
If naryNode is not specified, returns a string representation of the entire n-ary tree
If naryNode is specified, returns a string representation of the n-ary tree from the specified naryNode

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>string</code> - a string representation of the nodes in this n-ary tree instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [naryNode] | <code>Object</code> | <code>this._root</code> | NaryNode object - an optional parameter specifying the root node of the tree or subtree to be printed as a string representation |
| [relLevel] | <code>number</code> | <code>1</code> | number - a number used internally to track the correct level indention through recursive calls |

<a name="NaryTree+toJSON"></a>

### naryTree.toJSON([naryNode], [relLevel]) ⇒ <code>string</code>
If naryNode is not specified, returns a JSON representation of the entire n-ary tree
If naryNode is specified, returns a JSON representation of the n-ary tree from the specified naryNode

**Kind**: instance method of [<code>NaryTree</code>](#NaryTree)  
**Returns**: <code>string</code> - a JSON encoded string representation of the nodes in this n-ary tree instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [naryNode] | <code>Object</code> | <code>this._root</code> | NaryNode object - an optional parameter specifying the root node of the tree or subtree to be converted to a JSON encoded representation |
| [relLevel] | <code>number</code> | <code>1</code> | number - a number used internally to track the correct level indention through recursive calls |

