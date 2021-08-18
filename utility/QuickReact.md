## Classes

<dl>
<dt><a href="#QuickReactElement">QuickReactElement</a></dt>
<dd><p>Quick-React elements are an object type where each element has an assigned type, name, and a 
set of unique key/value attributes stored as a JavaScript Map data structure.</p>
</dd>
<dt><a href="#QuickReact">QuickReact</a></dt>
<dd><p>The QuickReact class methods perform all the processing of parsing Quick-React markup into an 
n-ary tree, which can then be output as React folder and file components for quick React project setup</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#output_index">output_index(useBootstrap, quickReact, NaryTree, QuickReactElement, NaryNode)</a> ⇒ <code>undefined</code></dt>
<dd><p>Output the index.js file as index_qr.js for this React project</p>
</dd>
<dt><a href="#output_app">output_app(useBootstrap, quickReact, NaryTree, QuickReactElement, NaryNode)</a> ⇒ <code>undefined</code></dt>
<dd><p>Output the App.js file as App_qr.js for this React project</p>
</dd>
<dt><a href="#output_component">output_component(useBootstrap, quickReact, NaryTree, QuickReactElement, NaryNode)</a> ⇒ <code>undefined</code></dt>
<dd><p>Output individual component files for the React project</p>
</dd>
</dl>

<a name="QuickReactElement"></a>

## QuickReactElement
Quick-React elements are an object type where each element has an assigned type, name, and a 
set of unique key/value attributes stored as a JavaScript Map data structure.

**Kind**: global class  

* [QuickReactElement](#QuickReactElement)
    * [new QuickReactElement(name, type, attributes)](#new_QuickReactElement_new)
    * [.type()](#QuickReactElement+type) ⇒
    * [.type(typeValue)](#QuickReactElement+type)
    * [.subtype()](#QuickReactElement+subtype) ⇒ <code>string</code>
    * [.subtype(subtypeValue)](#QuickReactElement+subtype)
    * [.name()](#QuickReactElement+name) ⇒ <code>string</code>
    * [.name(nameValue)](#QuickReactElement+name)
    * [.hasAttribute(key)](#QuickReactElement+hasAttribute) ⇒ <code>boolean</code>
    * [.safeHasAttribute(obj)](#QuickReactElement+safeHasAttribute) ⇒ <code>boolean</code>
    * [.getAttributeSize()](#QuickReactElement+getAttributeSize) ⇒ <code>number</code>
    * [.getAttribute(key)](#QuickReactElement+getAttribute) ⇒ <code>string</code>
    * [.deleteAttribute(key)](#QuickReactElement+deleteAttribute) ⇒ <code>boolean</code>
    * [.setAttribute({key:value})](#QuickReactElement+setAttribute) ⇒ <code>Object</code>
    * [.getAllAttributes()](#QuickReactElement+getAllAttributes) ⇒ <code>Array.&lt;array&gt;</code>
    * [.toString()](#QuickReactElement+toString) ⇒ <code>string</code>

<a name="new_QuickReactElement_new"></a>

### new QuickReactElement(name, type, attributes)
The QuickReactElement class object constructor method


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | a name for this element |
| type | <code>string</code> | a type to categorize this element |
| attributes | <code>Object</code> | object - a shallow object containing [key, value] pairs |

<a name="QuickReactElement+type"></a>

### quickReactElement.type() ⇒
Get this element's designated type.

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: - this element's designated type  
<a name="QuickReactElement+type"></a>

### quickReactElement.type(typeValue)
Set this element's type value

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  

| Param | Type | Description |
| --- | --- | --- |
| typeValue | <code>string</code> | string - the element's type value |

<a name="QuickReactElement+subtype"></a>

### quickReactElement.subtype() ⇒ <code>string</code>
Get this element's subtype value

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>string</code> - this element's designated subtype  
<a name="QuickReactElement+subtype"></a>

### quickReactElement.subtype(subtypeValue)
Set this element's subtype value

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  

| Param | Type | Description |
| --- | --- | --- |
| subtypeValue | <code>string</code> | string - the element's subtype value |

<a name="QuickReactElement+name"></a>

### quickReactElement.name() ⇒ <code>string</code>
Get the element's name.

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>string</code> - this element's name  
<a name="QuickReactElement+name"></a>

### quickReactElement.name(nameValue)
Set this element's name.

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  

| Param | Type | Description |
| --- | --- | --- |
| nameValue | <code>string</code> | string - the element's name |

<a name="QuickReactElement+hasAttribute"></a>

### quickReactElement.hasAttribute(key) ⇒ <code>boolean</code>
Check to see if the Quick-React element has a specific attribute set

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>boolean</code> - does this Quick-React element have this attribute?  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | string - check to see whether this element has an attribute with the specified property key |

<a name="QuickReactElement+safeHasAttribute"></a>

### quickReactElement.safeHasAttribute(obj) ⇒ <code>boolean</code>
Safely Check to see if the Quick-React element has a specific attribute key set to a specific value
This method does not return undefined for undefined properties, it always returns a boolean true or false value

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>boolean</code> - does this Quick-React element have this attribute key and value?  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>obj</code> | object - check to see whether this element has an attribute with the specified property key and value, submitted as a shallow object |

<a name="QuickReactElement+getAttributeSize"></a>

### quickReactElement.getAttributeSize() ⇒ <code>number</code>
Returns the number of attributes this element has

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>number</code> - the number of attributes this element has  
<a name="QuickReactElement+getAttribute"></a>

### quickReactElement.getAttribute(key) ⇒ <code>string</code>
Get an attribute's value specified by the key parameter

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>string</code> - value string - the value associated with the specified key  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | string - the string representing the attribute property to search for |

<a name="QuickReactElement+deleteAttribute"></a>

### quickReactElement.deleteAttribute(key) ⇒ <code>boolean</code>
Delete an attribute specified by the key parameter

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>boolean</code> - true or false return value depending on whether the delete request was successfully processed  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | string - the string representing the attribute property to delete |

<a name="QuickReactElement+setAttribute"></a>

### quickReactElement.setAttribute({key:value}) ⇒ <code>Object</code>
Set a key value pair as an attribute of this element

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>Object</code> - map object - attribute map object is returned  

| Param | Type | Description |
| --- | --- | --- |
| {key:value} | <code>Object</code> | object to be set as a new attribute of this element or to replace an existing attribute with the same key |

<a name="QuickReactElement+getAllAttributes"></a>

### quickReactElement.getAllAttributes() ⇒ <code>Array.&lt;array&gt;</code>
Returns all key/value pairs as an array using the spread operator

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>Array.&lt;array&gt;</code> - returns all key/value pairs as an array using the spread operator  
<a name="QuickReactElement+toString"></a>

### quickReactElement.toString() ⇒ <code>string</code>
Returns the name of this element

**Kind**: instance method of [<code>QuickReactElement</code>](#QuickReactElement)  
**Returns**: <code>string</code> - returns the name of this element  
<a name="QuickReact"></a>

## QuickReact
The QuickReact class methods perform all the processing of parsing Quick-React markup into an 
n-ary tree, which can then be output as React folder and file components for quick React project setup

**Kind**: global class  

* [QuickReact](#QuickReact)
    * [new QuickReact()](#new_QuickReact_new)
    * [.tree](#QuickReact+tree) ⇒ <code>Object</code>
    * [.parseMarkup(code)](#QuickReact+parseMarkup) ⇒ <code>Object</code>
    * [._printRef(code, index, length)](#QuickReact+_printRef) ⇒ <code>string</code>
    * [._multiplier(attribute)](#QuickReact+_multiplier) ⇒ <code>number</code>
    * [._findMultiplier(quickReactElement, searchAttribute, specifiedNameArray, defaultName, matchIndex)](#QuickReact+_findMultiplier) ⇒ <code>number</code>
    * [.generateProjectFiles(userID, projectID, NaryTree)](#QuickReact+generateProjectFiles) ⇒ <code>undefined</code>

<a name="new_QuickReact_new"></a>

### new QuickReact()
Instantiates a QuickReact object and an empty n-ary tree as a JavaScript object

<a name="QuickReact+tree"></a>

### quickReact.tree ⇒ <code>Object</code>
Retrieve a reference to this NaryTree

**Kind**: instance property of [<code>QuickReact</code>](#QuickReact)  
**Returns**: <code>Object</code> - NaryTree object associated with this QuickReact object  
<a name="QuickReact+parseMarkup"></a>

### quickReact.parseMarkup(code) ⇒ <code>Object</code>
The parseMarkup method takes submitted Quick-React JSX markup code and produces an n-Ary tree structure representing the components, their nested
structure, and each element's attributes.

**Kind**: instance method of [<code>QuickReact</code>](#QuickReact)  
**Returns**: <code>Object</code> - returns a populated NaryTree object representing the lexed and parsed output of the supplied Quick-React markup code  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | string - Quick-Start markup code in text JSX format |

<a name="QuickReact+_printRef"></a>

### quickReact.\_printRef(code, index, length) ⇒ <code>string</code>
This function prints a strings from the current code index to a specified length to provide the developer/user
with a reference as to where their code may have a syntax error.

**Kind**: instance method of [<code>QuickReact</code>](#QuickReact)  
**Returns**: <code>string</code> - message - a message regarding the error or problem found in the supplied code  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | the Quick-React markup code |
| index | <code>number</code> | the character position in the code where an error was found |
| length | <code>number</code> | the length is characters of surrounding context text to display in the response message |

<a name="QuickReact+_multiplier"></a>

### quickReact.\_multiplier(attribute) ⇒ <code>number</code>
The _multiplier function checks the passed attribute and determines whether a multiplier 
expression is used in the attribute, denoted by an '*', to request a repeat of the item a specified number of times.
Multiplier values can be a single integer digit or two integer digits long.

**Kind**: instance method of [<code>QuickReact</code>](#QuickReact)  
**Returns**: <code>number</code> - returns the multiplier value found in the attribute or 1 as a default  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>string</code> | string - the attribute key to search for |

<a name="QuickReact+_findMultiplier"></a>

### quickReact.\_findMultiplier(quickReactElement, searchAttribute, specifiedNameArray, defaultName, matchIndex) ⇒ <code>number</code>
This is the same as the _multiplier function except that it looks through all of the component's attributes for
the first matching attribute, compared via key name, and then checks to see if a multiplier expression is used.

**Kind**: instance method of [<code>QuickReact</code>](#QuickReact)  
**Returns**: <code>number</code> - returns the multiplier value found or zero if the attribute wasn't found, or one if the attribute was found but no multiplier was specified  

| Param | Type | Description |
| --- | --- | --- |
| quickReactElement | <code>Object</code> | component - a Quick-React object element to search |
| searchAttribute | <code>string</code> | the attribute to search for in the element |
| specifiedNameArray | <code>Array.&lt;array&gt;</code> | an array used to hold values of requested field/variable names in the markup |
| defaultName | <code>string</code> | a default name to use for a field/variable if specified names are used in the markup |
| matchIndex | <code>number</code> | add support for use of an attribute more than one time in a single component |

<a name="QuickReact+generateProjectFiles"></a>

### quickReact.generateProjectFiles(userID, projectID, NaryTree) ⇒ <code>undefined</code>
A function to generate React directories and files based on the n-Ary tree representation of the Quick-React markup

**Kind**: instance method of [<code>QuickReact</code>](#QuickReact)  
**Returns**: <code>undefined</code> - Stores the directories and files for the project and generates a zip file with all of the content archived into a single downloadable document.  

| Param | Type | Description |
| --- | --- | --- |
| userID | <code>string</code> | The registered Quick-React user's unique id, as assigned by MongoDB. |
| projectID | <code>string</code> | The registered Quick-React user's unique project ID, as assigned by MongoDB |
| NaryTree | <code>Object</code> | tree - The tree of parsed values representing the structure of this Quick-React project |

<a name="output_index"></a>

## output\_index(useBootstrap, quickReact, NaryTree, QuickReactElement, NaryNode) ⇒ <code>undefined</code>
Output the index.js file as index_qr.js for this React project

**Kind**: global function  
**Returns**: <code>undefined</code> - Outputs the index.js file as index_qr.js for this React project  

| Param | Type | Description |
| --- | --- | --- |
| useBootstrap | <code>boolean</code> | boolean - boolean flag indicating whether react-bootstrap should be used |
| quickReact | <code>Object</code> | object - the instance of the Quick-React project object |
| NaryTree | <code>Object</code> | tree object - the parse tree of object and values for this project |
| QuickReactElement | <code>Object</code> | object - a specific quickReactElement |
| NaryNode | <code>Object</code> | node object - a specific node in the project tree |

<a name="output_app"></a>

## output\_app(useBootstrap, quickReact, NaryTree, QuickReactElement, NaryNode) ⇒ <code>undefined</code>
Output the App.js file as App_qr.js for this React project

**Kind**: global function  
**Returns**: <code>undefined</code> - - Outputs the App.js file as App_qr.js for this React project  

| Param | Type | Description |
| --- | --- | --- |
| useBootstrap | <code>boolean</code> | boolean - boolean flag indicating whether react-bootstrap should be used |
| quickReact | <code>Object</code> | object - the instance of the Quick-React project object |
| NaryTree | <code>Object</code> | tree object - the parse tree of object and values for this project |
| QuickReactElement | <code>Object</code> | object - a specific quickReactElement |
| NaryNode | <code>Object</code> | node object - a specific node in the project tree |

<a name="output_component"></a>

## output\_component(useBootstrap, quickReact, NaryTree, QuickReactElement, NaryNode) ⇒ <code>undefined</code>
Output individual component files for the React project

**Kind**: global function  
**Returns**: <code>undefined</code> - Outputs a specific component file for this React project  

| Param | Type | Description |
| --- | --- | --- |
| useBootstrap | <code>boolean</code> | boolean - boolean flag indicating whether react-bootstrap should be used |
| quickReact | <code>Object</code> | object - the instance of the Quick-React project object |
| NaryTree | <code>Object</code> | tree object - the parse tree of object and values for this project |
| QuickReactElement | <code>Object</code> | object  - a specific quickReactElement |
| NaryNode | <code>Object</code> | node object - a specific node in the project tree |

