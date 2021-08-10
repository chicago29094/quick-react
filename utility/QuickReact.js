
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

    parseMarkup(code) {
        if ( (code===undefined) || (code===null) || (typeof code !== 'string') ) {
            return this._tree;
        }

        let i=0;
        let j=0;
        let k=0;
        let regex='';
        let codeIndex=0;
        let startIndex=0;
        let endIndex=0;
        let start=0;
        let end=code.length;
        let inComponent=false;
        let inComponentName=false;
        let selfClosing=false;
        let inAttribute=false;
        let inAttributeName=false;
        let inAttributeValue=false;

        let component = "";
        let normalizedComponent = "";
        let currentComponentNode = {};
        let parentComponentNode = {};
        let childComponentNode = {};

        console.log(code);

        outer: while (codeIndex<end) {

            if (!inComponent) {
                startIndex=code.indexOf('<', codeIndex);
                if (startIndex===-1) {
                    throw new SyntaxError(`The markup code is missing an opening '<' character.  ${this._printRef(code, codeIndex, 80)}`);
                }
                endIndex=code.indexOf('>', codeIndex);
                if (endIndex===-1) {
                    throw new SyntaxError(`The markup code is missing a closing '>' character. ${this._printRef(code, startIndex, 80)} `);
                }
                if (code.charAt(endIndex-1)==='/') {
                    selfClosing=true;
                    endIndex=endIndex-1;
                }
                inComponent=true;
                console.log(`startIndex=${startIndex}  endIndex=${endIndex}`);

                component = code.slice(startIndex+1, endIndex);
                console.log(`Component=[${component}]`);

                // Remove spaces around comma separated lists so split lexical tokenization can work better
                regex = /\s+,\s+|\s+,|,\s+/g
                normalizedComponent = component.replaceAll(regex, ',');
                component=normalizedComponent;
                // Remove single and double quotes around component attributes to ease further lexing and  subsequent parsing
                regex = /\'|\"/g
                normalizedComponent = component.replaceAll(regex, '');
                component=normalizedComponent;
                // Inside components collapse multiple spaces into a single space
                regex = /\s+/g
                normalizedComponent = component.replaceAll(regex, ' ');
                component=normalizedComponent;
                // Trim leading and trailing spaces from the component
                normalizedComponent = component.trim();
                component=normalizedComponent;

                console.log(`Component=[${component}]`);

                const componentAttributes = component.split(' ');
                console.log('Component Attributes=', componentAttributes)
                i=0;
                for (let attribute of componentAttributes) {
                    console.log(`attribute[${i}]=${attribute}`);
                    i++;
                }
                if (selfClosing) codeIndex=endIndex+2;
                else codeIndex=endIndex+1;
                
                inComponent=false;
                selfClosing=false;
            }
            codeIndex++;
        }

        return this._tree;
    }

    _printRef(code, index, length) {
        return `Reference: ${code.slice(index, index+length)}`
    }

}


/*================================================================================================*/
// Export these library classes to other node modules

module.exports = { QuickReactElement, QuickReact };



