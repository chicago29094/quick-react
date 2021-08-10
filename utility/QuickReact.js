
const {NaryNode, NaryTree} = require('./NaryTree');

/*================================================================================================*/
// Quick-React elements are an object type where each element has an assigned type, name, and a 
// set of unique key/value attributes stored as a JavaScript Map data structure.
class QuickReactElement {

    constructor(name, type, attributes) {
        if ( (name===undefined) || (name===null) ) {
            throw TypeError('Quick-React Elements must be instantiated with a name and type.')
        }
        if ( (type===undefined) || (type===null) ) {
            throw TypeError('Quick-React Elements must be instantiated with a name and type.')
        }
        this._name=name;
        this._type=type;
        this._subtype="";
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

    get subtype() {
        return this._subtype;
    }

    set subtype(subtypeValue) {
        this._subtype=subtypeValue;
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
        let regex='';
        let codeIndex=0;
        let startIndex=0;
        let endIndex=0;
        let tokenIndex=0;
        let end=code.length;
        let inComponent=false;
        let selfClosing=false;
        let configComponent=false;
        let openComponent=false;
        let closeComponent=false;

        let component = "";
        let normalizedComponent = "";

        let currentComponentNode = {};
        let parentComponentNode = {};
        let childComponentNode = {};

        let currentQuickReactElement = {};
        let parentQuickReactElement = {};
        let childQuickReactElement = {};

        let quickReactElementStack = [];
        const quickreactElementArray = [];

        console.log(code);

        // First we will lex the markup and parse it into quick-react object elements
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

                // Is this a close tag for a component opening tag/closing tag pair?
                if (code.charAt(startIndex+1)==='/') {
                    closeComponent=true;
                }
                // If it isn't a closing tag it is an opening tag.
                else {
                    closeComponent=false;
                    openComponent=true;
                }
                // Is this a single self-closing component tag?
                if (code.charAt(endIndex-1)==='/') {
                    selfClosing=true;
                    endIndex=endIndex-1;
                } 
                // This is not a self-closing component tag.
                else {
                    selfClosing=false;
                }
                inComponent=true;

                // Select the name and attributes for the is component from the input string
                component = code.slice(startIndex+1, endIndex);

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

                const componentAttributes = component.split(' ');
                
                tokenIndex=0;
                currentQuickReactElement=new QuickReactElement('', '');

                for (let attribute of componentAttributes) {
                    if (tokenIndex===0) {
                        if (attribute==='Config') {
                            currentQuickReactElement.name='Config';
                            currentQuickReactElement.type='config';
                            configComponent=true;
                        }
                        else {
                            configComponent=false;
                            currentQuickReactElement.name=attribute;
                            currentQuickReactElement.type='component';

                            if (selfClosing) currentQuickReactElement.subtype='selfclosingtag';
                            if (openComponent) currentQuickReactElement.subtype='opentag';
                            if (closeComponent) currentQuickReactElement.subtype='closetag';
                        }
                    }
                    else {
                        // Now we will parse the individual attributes in the component tag and try to establish key/value pairs

                        if (attribute==='bootstrap')                currentQuickReactElement.setAttribute( {'react-bootstrap': true} );
                        if (attribute==='bootstrap=true')           currentQuickReactElement.setAttribute( {'react-bootstrap': true} );
                        if (attribute==='reactbootstrap')           currentQuickReactElement.setAttribute( {'react-bootstrap': true} );
                        if (attribute==='reactbootstrap=true')      currentQuickReactElement.setAttribute( {'react-bootstrap': true} );
                        if (attribute==='react-bootstrap')          currentQuickReactElement.setAttribute( {'react-bootstrap': true} );
                        if (attribute==='react-bootstrap=true')     currentQuickReactElement.setAttribute( {'react-bootstrap': true} );
                        
                        if (attribute==='fetch')                    currentQuickReactElement.setAttribute( {'fetch': true} );
                        if (attribute==='fetch=true')               currentQuickReactElement.setAttribute( {'fetch': true} );
                        if (attribute==='fetch=GET')                currentQuickReactElement.setAttribute( {'fetch': "GET"} );
                        if (attribute==='fetch=POST')               currentQuickReactElement.setAttribute( {'fetch': "POST"} );
                        if (attribute==='fetch=PUT')                currentQuickReactElement.setAttribute( {'fetch': "PUT"} );
                        if (attribute==='fetch=DELETE')             currentQuickReactElement.setAttribute( {'fetch': "DELETE"} );
                        if (attribute==='fetch=PATCH')              currentQuickReactElement.setAttribute( {'fetch': "PATCH"} );
                        if (attribute==='fetch=get')                currentQuickReactElement.setAttribute( {'fetch': "GET"} );
                        if (attribute==='fetch=post')               currentQuickReactElement.setAttribute( {'fetch': "POST"} );
                        if (attribute==='fetch=put')                currentQuickReactElement.setAttribute( {'fetch': "PUT"} );
                        if (attribute==='fetch=delete')             currentQuickReactElement.setAttribute( {'fetch': "DELETE"} );
                        if (attribute==='fetch=patch')              currentQuickReactElement.setAttribute( {'fetch': "PATCH"} );

                        if (attribute==='link')                     currentQuickReactElement.setAttribute( {'link': true} );
                        if (attribute==='link=true')                currentQuickReactElement.setAttribute( {'link': true} );

                        if (attribute==='switch')                   currentQuickReactElement.setAttribute( {'switch': true} );
                        if (attribute==='switch=true')              currentQuickReactElement.setAttribute( {'switch': true} );

                        if (attribute==='route')                    currentQuickReactElement.setAttribute( {'route': true} );
                        if (attribute==='route=true')               currentQuickReactElement.setAttribute( {'route': true} );

                        if (attribute==='map')                      currentQuickReactElement.setAttribute( {'map': true} );
                        if (attribute==='map=true')                 currentQuickReactElement.setAttribute( {'map': true} );

                        if (attribute==='form')                     currentQuickReactElement.setAttribute( {'form': true} );
                        if (attribute==='form=true')                currentQuickReactElement.setAttribute( {'form': true} );

                        if (attribute.startsWith('forminput=')) {
                            if (currentQuickReactElement.hasAttribute('forminputs')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('forminputs')},${attribute.slice(10)}`;
                                currentQuickReactElement.setAttribute( {'forminputs': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'forminputs': attribute.slice(10) } );
                            }
                        }
                        if (attribute.startsWith('forminputs=')) {
                            if (currentQuickReactElement.hasAttribute('forminputs')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('forminputs')},${attribute.slice(11)}`;
                                currentQuickReactElement.setAttribute( {'forminputs': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'forminputs': attribute.slice(11) } );
                            }
                        }

                        if (attribute.startsWith('forminput=')) {
                            if (currentQuickReactElement.hasAttribute('forminputs')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('forminputs')},${attribute.slice(5)}`;
                                currentQuickReactElement.setAttribute( {'forminputs': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'forminputs': attribute.slice(5) } );
                            }
                        }
                        if (attribute.startsWith('hooks=')) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},${attribute.slice(6)}`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': attribute.slice(6) } );
                            }
                        }
                        if ( (attribute===('useEffect')) || (attribute===('useEffect=true')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},useEffect`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': 'useEffect'} );
                            }
                        }
                        if ( (attribute===('useState')) || (attribute===('useState=true')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},useState`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': 'useState'} );
                            }
                        }
                        if ( (attribute===('useReducer')) || (attribute===('useReducer=true')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},useReducer`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': 'useReducer'} );
                            }
                        }
                        if ( (attribute===('useContext')) || (attribute===('useContext=true')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},useContext`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': 'useContext'} );
                            }
                        }

                        if ( (attribute.startsWith('useEffect*')) || 
                             (attribute.startsWith('useState*')) || 
                             (attribute.startsWith('useReducer*')) || 
                             (attribute.startsWith('useContext*')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},${attribute}`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': attribute} );
                            }
                        }

                    }

                    console.log(`attribute[${tokenIndex}]=${attribute}`);
                    tokenIndex++;
                }

                quickreactElementArray.push(currentQuickReactElement);

                if (selfClosing) codeIndex=endIndex+2;
                else codeIndex=endIndex+1;
                
                inComponent=false;
                selfClosing=false;
            }
            codeIndex++;
        }

        // Now that we have all of the quick-react elements in an array, we will construct our n-ary tree based on the nested structure of the component tags
 
        // A "Config" configuration Quick-React element object will be stored in our root node
        let hasConfig=false;
        for (let i=0; i<quickreactElementArray.length; i++) {
            if (quickreactElementArray[i].type==="config") {
                this.tree.add(quickreactElementArray[i]);
                hasConfig=true;
            }
        }
        if (!hasConfig) {
            currentQuickReactElement=new QuickReactElement('', '');
            currentQuickReactElement.name='Config';
            currentQuickReactElement.type='config';    
            this.tree.add(currentQuickReactElement);       
        }

        // All markup files must include an overall <App> tag and </App> tag.
        let hasApp=false;
        for (let i=0; i<quickreactElementArray.length; i++) {
            if ( (quickreactElementArray[i].name==="App") && (quickreactElementArray[i].subtype==="opentag") ) {
                hasApp=true;
                this.tree.addAsFirstChild(quickreactElementArray[i], this.tree.root);
            }
        }
        if (!hasApp) {
            throw new SyntaxError(`The markup code must include an opening <App> component tag and closing </App> tag.`);
        }

        // Every tag that isn't self closing must include a closing tag somewhere in the markup
        for (let i=0; i<quickreactElementArray.length; i++) {

            if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].subtype==="opentag") ) {
                let hasClosingTag=false;
                // We have located an opentag, now let's check for its matching closing tag
                for (let j=0; j<quickreactElementArray.length; j++) {
                    if (quickreactElementArray[j].name===quickreactElementArray[i].name) {
                        if ( (quickreactElementArray[j].type==="component") && (quickreactElementArray[j].subtype==="closetag") ) {
                            hasClosingTag=true;
                        }
                    }
                }
                if (!hasClosingTag) {
                    throw new SyntaxError(`All components in the Quick-React markup, which are not self-closing, must include a matching closing tag.  Please include a closing tag: </${quickreactElementArray[j].name}> for the ${quickreactElementArray[j].name} component.`);
                }
            }
        }

        // Next we will fill in our n-ary tree data structure 
        for (let i=0; i<quickreactElementArray.length; i++) {
            if (quickreactElementArray[i].name==="Config") {
                quickReactElementStack.push(quickreactElementArray[i]);
                continue;
            }
            else if (quickreactElementArray[i].name==="App") {
                quickReactElementStack.push(quickreactElementArray[i]);
                continue;
            }
            else if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].type==="opentag") ) {
                parentQuickReactElement=quickReactElementStack.pop();
                parentComponentNode=this.tree.getNode(parentQuickReactElement);
                quickReactElementStack.push(parentQuickReactElement);
                quickReactElementStack.push(quickreactElementArray[i]);
                this.tree.addAsLastChild(quickreactElementArray[i], parentComponentNode);
            }
            else if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].type==="selfclosingtag") ) {
                parentQuickReactElement=quickReactElementStack.pop();
                parentComponentNode=this.tree.getNode(parentQuickReactElement);
                quickReactElementStack.push(parentQuickReactElement);
                quickReactElementStack.push(quickreactElementArray[i]);
                this.tree.addAsLastChild(quickreactElementArray[i], parentComponentNode);
            }
            else if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].type==="closetag") ) {
                parentQuickReactElement=quickReactElementStack.pop();
                if (parentQuickReactElement.name!==quickreactElementArray[i].name) {
                    throw new SyntaxError(`Opening an closing tags for different components can not overlap.  Please check the placement of the following closing tag: </${quickreactElementArray[j].name}>.`);
                }            
            }
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



