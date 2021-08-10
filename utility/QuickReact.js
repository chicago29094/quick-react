
const {NaryNode, NaryTree} = require('./NaryTree');

/*================================================================================================*/
// Quick-React elements are an object type where each element has an assigned type, name, and a 
// set of unique key/value attributes stored as a JavaScript Map data structure.
class QuickReactElement {

    constructor(type, name, attributes) {
        if ( (type===undefined) || (type===null) ) {
            throw TypeError('Quick-React Elements must be instantiated with a type and name.')
        }
        if ( (name===undefined) || (name===null) ) {
            throw TypeError('Quick-React Elements must be instantiated with a type and name.')
        }
        this._type=type;
        this._name=name;
        this._attributes=new Map();

        if ( (attributes!==undefined) ) {
            if (typeof attributes !== object) {
                throw TypeError('Quick-React Element attributes must be submitted as a shallow object containing key, value pairs.');
            }

            for (const [key, value] of Object.entries(attributes)) {
                this._attributes.set(key, value);
            }
        }
    }

    get type() {
        return this._type;
    }

    set type(typeValue) {
        this._type=typeValue;
    }

    get name() {
        return this._name;
    }

    set name(nameValue) {
        this._name=nameValue;
    }

    // Check to see if the Quick-React element has a specific attribute set
    hasAttribute(key) {
        return this._attributes.has(key);
    }

    getAttributeSize() {
        return  this._attributes.size;
    }

    // Get an attribute's value
    getAttribute(key) {
        return this._attributes.get(key);
    }

    // Delete an attribute
    deleteAttribute(key) {
        return this._attributes.delete(key);
    }

    // Set a key value pair
    setAttribute({key, value}) {
        return this._attributes.set(key, value);
    }

    // Returns all key/valye pairs as an array using the spread operator
    getAllAttributes() {
        return([...this._attributes]);
    }
}

/*================================================================================================*/
// The QuickReact class methods perform all the processing of parsing Quick-React markup into an 
// n-ary tree, which can then be output as React folder and file components for quick React project
// setup.

class QuickReact {

    // Instantiates an empty n-ary tree as a JavaScript object
    constructor() {
        this._tree=new NaryTree();
    }

    get tree() {
        return this._tree;
    }

    parseMarkup(input) {
        if ( (input===undefined) || (input===null) || (typeof input !== string) ) {
            return false;
        }

        let i=0;
        let j=0;
        let k=0;
        let index=0;
        let start=0;
        let end=input.length;
        let inComponent=false;
        let inComponentName=false;
        let inAttribute=false;
        let inAttributeName=false;
        let inAttributeValue=false;

        while (index<end) {

            if (!inComponents) {
                while (document.characterSet(index))
            }


        }

    }



}


/*================================================================================================*/
// Export these library classes to other node modules

module.exports = { QuickReactElement, QuickReact };



