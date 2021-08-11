
const {NaryNode, NaryTree} = require('./NaryTree');
const quickReactTemplates = require('./QuickReactTemplates');
const fs = require('fs');
const path = require('path');
var AdmZip = require('adm-zip');

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

    // Safely Check to see if the Quick-React element has a specific attribute key set to a specific value
    safeHasAttribute(obj) {
        const [key, value] = Object.entries(obj)[0];

        if (this._attributes.has(key)) {
            if (this._attributes.get(key)===value) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
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
    setAttribute( obj ) {
        const [key,value] = Object.entries(obj)[0];
        return this._attributes.set(key, value);
    }

    // Returns all key/valye pairs as an array using the spread operator
    getAllAttributes() {
        return([...this._attributes]);
    }

    toString() {
        return `${this._name} ${this._attributes}`;
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

        // console.log(code);

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
                    openComponent=false;
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
                    if (tokenIndex===0) {({})
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
                            else if (openComponent) currentQuickReactElement.subtype='opentag';
                            else if (closeComponent) currentQuickReactElement.subtype='closetag';
                            
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

                        if (attribute==='router')                    currentQuickReactElement.setAttribute( {'router': true} );
                        if (attribute==='router=true')               currentQuickReactElement.setAttribute( {'router': true} );

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
                        if ( (attribute===('useLocation')) || (attribute===('useLocation=true')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},useLocation`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': 'useLocation'} );
                            }
                        }
                        if ( (attribute===('useHistory')) || (attribute===('useHistory=true')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},useHistory`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': 'useHistory'} );
                            }
                        }                                                
                        if ( (attribute===('useParams')) || (attribute===('useParams=true')) ) {
                            if (currentQuickReactElement.hasAttribute('hooks')) {
                                const combinedValue=`${currentQuickReactElement.getAttribute('hooks')},useParams`;
                                currentQuickReactElement.setAttribute( {'hooks': combinedValue} );
                            }
                            else {
                                currentQuickReactElement.setAttribute( {'hooks': 'useParams'} );
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

                    // console.log(`attribute[${tokenIndex}]=${attribute}`);
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
                this._tree.add(quickreactElementArray[i]);
                quickReactElementStack.push(quickreactElementArray[i]);
                hasConfig=true;
            }
        }
        if (!hasConfig) {
            currentQuickReactElement=new QuickReactElement('', '');
            currentQuickReactElement.name='Config';
            currentQuickReactElement.type='config';    
            this._tree.add(currentQuickReactElement);       
            quickReactElementStack.push(quickreactElementArray[i]);
        }

        // All markup files must include an overall <App> tag and </App> tag.
        let hasApp=false;
        for (let i=0; i<quickreactElementArray.length; i++) {
            if ( (quickreactElementArray[i].name==="App") && (quickreactElementArray[i].subtype==="opentag") ) {
                hasApp=true;
                this._tree.addAsFirstChild(quickreactElementArray[i], this._tree.root);
                quickReactElementStack.push(quickreactElementArray[i])                
            }
        }
        if (!hasApp) {
            throw new SyntaxError(`The markup code must include an opening <App> component tag and closing </App> tag.`);
        }


        // for (let i=0; i<quickreactElementArray.length; i++) {
        //     console.log(`${quickreactElementArray[i].name} ${quickreactElementArray[i].type} ${quickreactElementArray[i].subtype} `);
        // }

        // Every tag that isn't self closing must include a closing tag somewhere in the markup
        for (let i=0; i<quickreactElementArray.length; i++) {

            if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].subtype==="opentag") ) {
                // We have located an opentag, now let's check for its matching closing tag
                let hasClosingTag=false;
                for (let j=0; j<quickreactElementArray.length; j++) {
                    if (quickreactElementArray[j].name===`/${quickreactElementArray[i].name}`) {
                        if ( (quickreactElementArray[j].type==="component") && (quickreactElementArray[j].subtype==="closetag") ) {
                            hasClosingTag=true;
                        }
                    }
                }
                if (!hasClosingTag) {
                    throw new SyntaxError(`All components in the Quick-React markup, which are not self-closing, must include a matching closing tag.  Please include a closing tag: </${quickreactElementArray[i].name}> for the ${quickreactElementArray[i].name} component.`);
                }
            }
        }



        // Next we will fill in our n-ary tree data structure 
        for (let i=0; i<quickreactElementArray.length; i++) {

            //console.log(`${i} ${quickreactElementArray[i].name} ${quickreactElementArray[i].type} ${quickreactElementArray[i].subtype}`);

            if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].subtype==="opentag") ) {
                parentQuickReactElement=quickReactElementStack.pop();
                parentComponentNode=this._tree.getNode(parentQuickReactElement);
                quickReactElementStack.push(parentQuickReactElement);
                quickReactElementStack.push(quickreactElementArray[i]);
                this._tree.addAsLastChild(quickreactElementArray[i], parentComponentNode);
            }
            else if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].subtype==="selfclosingtag") ) {
                parentQuickReactElement=quickReactElementStack.pop();
                parentComponentNode=this._tree.getNode(parentQuickReactElement);
                quickReactElementStack.push(parentQuickReactElement);
                this._tree.addAsLastChild(quickreactElementArray[i], parentComponentNode);
            }
            else if ( (quickreactElementArray[i].type==="component") && (quickreactElementArray[i].subtype==="closetag") ) {
                parentQuickReactElement=quickReactElementStack.pop();
                if (`/${parentQuickReactElement.name}`!==quickreactElementArray[i].name) {
                    throw new SyntaxError(`Opening and closing tags for different components can not overlap.  Please check the placement of the following tags: <${parentQuickReactElement.name}> <${quickreactElementArray[i].name}>.`);
                }            
            }
        }

        return this._tree;
    }

    _printRef(code, index, length) {
        return `Reference: ${code.slice(index, index+length)}`
    }


    generateProjectFiles(userID, projectID, tree) {


        if ( (userID===undefined) || (userID===null) ) {
            return;
        }
        if ( (projectID===undefined) || (projectID===null) ) {
            return;
        }
        if ( (tree===undefined) || !(tree instanceof NaryTree) ) {
            return;
        }

        // First, check for important global configuration settings, like whether to use bootstrap
        let quickReactElement = {};
        let useBootstrap=false;
        quickReactElement = tree.getByObjectPropery( {'_name':'Config'} );
        if (quickReactElement.hasAttribute('react-bootstrap')) {
            useBootstrap=quickReactElement.getAttribute('react-bootstrap');
        }


        const userDirectory = path.join(__dirname, '..', '..', 'project', userID);
        const zipDirectory = path.join(__dirname, '..', '..', 'project', userID, 'ziparchives');
        const zipFilepath = path.join(__dirname, '..', '..', 'project', userID, 'ziparchives', `${projectID}.zip`);
        const projectDirectory = path.join(__dirname, '..', '..', 'project', userID, projectID)        
        const componentsDirectory = path.join(__dirname, '..', '..', 'project', userID, projectID, "components")
        const imagesDirectory = path.join(__dirname, '..', '..', 'project', userID, projectID, "images")
        const assetsDirectory = path.join(__dirname, '..', '..', 'project', userID, projectID, "assets")

        try {
            if (!fs.existsSync(userDirectory)) {
                fs.mkdirSync(userDirectory);
            }
            if (!fs.existsSync(zipDirectory)) {
                fs.mkdirSync(zipDirectory);
            }            
            if (!fs.existsSync(projectDirectory)) {
                fs.mkdirSync(projectDirectory);
            }
            if (!fs.existsSync(componentsDirectory)) {
                fs.mkdirSync(componentsDirectory);
            }
            if (!fs.existsSync(imagesDirectory)) {
                fs.mkdirSync(imagesDirectory);
            }
            if (!fs.existsSync(assetsDirectory)) {
                fs.mkdirSync(assetsDirectory);
            }

        } catch (error) {
            console.log(error);
        }

        // Next, we will iterate through the entire n-ary tree, representing our Quick-React project and create folders, files, and settings component-by-component

        const treeIterator = tree.levelOrderIterator(rootNode);

        for (let node of treeIterator) {

            const quickReactElement = node.value;
            let document = "";

            // Process the config node as index.js
            if ( quickReactElement.name==='Config') {
                // Use the config node as an opportunity to create an index_qr.js file
                document = "";
                document = document + output_index(useBootstrap, quickReactElement, node);     
                
                let indexFilepath = path.join(projectDirectory, 'index_qr.js');

                try {
                    const data = fs.writeFileSync(indexFilepath, document);
                    //file written successfully
                  } catch (error) {
                    console.error(error)
                  }
            }
            else if ( quickReactElement.name==='App') {
                document = "";
                document = document + output_app(useBootstrap, quickReactElement, node);                 

                let appFilepath = path.join(projectDirectory, 'App_qr.js')

                try {
                    const data = fs.writeFileSync(appFilepath, document);
                    //file written successfully
                  } catch (error) {
                    console.error(error)
                  }
            }
            else if ( quickReactElement.type==='component') {
                document = "";
                document = document + output_component(useBootstrap, quickReactElement, node);      

                let componentDirectory = path.join(projectDirectory, 'components', `${quickReactElement.name}`);
                
                try {
                    if (!fs.existsSync(componentDirectory)) {
                        fs.mkdirSync(componentDirectory);
                    }        
                } catch (error) {
                    console.log(error);
                }
        
                let componentFilepath = path.join(projectDirectory, 'components', `${quickReactElement.name}`, 'index.js');

                try {
                    const data = fs.writeFileSync(componentFilepath, document);
                    //file written successfully
                  } catch (error) {
                    console.error(error)
                  }                

            }
        }

        // Create a ZIP archive of the project directories and files
        const file = new AdmZip();
        file.addLocalFolder(projectDirectory, 'project');
        try {
            file.writeZip(zipFilepath);
        }
        catch(error) {
            console.log(error);
        }
    }

}

/*================================================================================================*/

function output_index(useBootstrap, quickReactElement, node) {

let output = "";

output = output + 
`import React from 'react';
import ReactDOM from 'react-dom';
`;

if (quickReactElement.safeHasAttribute( {'router': true} )) {
output = output + 
`import { BrowserRouter as Router } from 'react-router-dom';
`;
}

if (useBootstrap) {
import 'bootstrap/dist/css/bootstrap.min.css';
}

output = output + 
`import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
`;

if (quickReactElement.safeHasAttribute( {'router': true} )) {
output = output + 
`ReactDOM.render(
<Router>
    <React.StrictMode>
        <App />
    </React.StrictMode>
</Router>,
document.getElementById('root')
);

reportWebVitals();
`;
}
else {
output = output + 
`ReactDOM.render(
<Router>
    <React.StrictMode>
        <App />
    </React.StrictMode>
</Router>,
document.getElementById('root')
);

reportWebVitals();
`;
}

return output;

}

/*================================================================================================*/

function output_app(useBootstrap, quickReactElement, node) {

let output = "";

output = output + `import React from 'react';\n`;

let hooks=quickReactElement.getAttribute('hooks');
if (hooks!==undefined) {
    let hookTokenList="";
    let comma="";
    if (hooks.indexOf('useEffect')!=-1)     { hookTokenList=hookTokenList+comma+'useEffect'; comma=", "; }
    if (hooks.indexOf('useState')!=-1)      { hookTokenList=hookTokenList+comma+'useState'; comma=", "; }
    if (hooks.indexOf('useContext')!=-1)    { hookTokenList=hookTokenList+comma+'useContext'; comma=", "; }
    if (hooks.indexOf('useReducer')!=-1)    { hookTokenList=hookTokenList+comma+'useReducer'; comma=", "; }

    output = output + `import { ${hooksTokenList} } from 'react';\n`;
}

let reactSwitch=quickReactElement.getAttribute('switch');
let reactRoute=quickReactElement.getAttribute('route');
let reactLink=quickReactElement.getAttribute('link');

if ( (hooks!==undefined) || (reactSwitch!==undefined) || (reactRouter!==undefined) || (reactLink!==undefined) ) { 
    let tokenList="";
    let comma="";
    if (hooks.indexOf('useLocation')!=-1)     { tokenList=tokenList+comma+'useLocation'; comma=", "; }
    if (hooks.indexOf('useHistory')!=-1)      { tokenList=tokenList+comma+'useHistory'; comma=", "; }
    if (hooks.indexOf('useParams')!=-1)      { tokenList=tokenList+comma+'useParams'; comma=", "; }

    if ((reactSwitch!==undefined) && (reactSwitch===true))     { tokenList=tokenList+comma+'Switch'; comma=", "; }
    if ((reactRoute!==undefined) && (reactRoute===true))     { tokenList=tokenList+comma+'Route'; comma=", "; }
    if ((reactLink!==undefined) && (reactLink===true))     { tokenList=tokenList+comma+'Link'; comma=", "; }

    output = output + `import { ${tokenList} } from "react-router-dom";\n`;
}

if (userBootstrap) {
    import { Container, Row, Col } from 'react-bootstrap';
}

let childrenNodes = node.children;
if (childrenNodes.length>0) {
    for (let child of childrenNodes) {
        output = output + `import { ${child.value.name} } from './components/${child.value.name}';\n`;
    }
}
output = output + `import './App.css';\n`;
output = output + `\n`;
output = output + `/*==========================================================================================*/\n`;

if (hooks.indexOf('useReducer')!=-1) {
    output = output + `export const SampleContext = React.createContext(); \n`;
    output = output + `export const SampleDispatchContext = React.createContext();\n`;
    output = output + `\n`;
}

output = output + `
export const App = (props) => {

`;

if (hooks.indexOf('useLocation')!=-1)
output = output + ` const location = useLocation();\n`;

if (hooks.indexOf('useHistory')!=-1)
output = output + ` const history = useHistory();\n`;

if (hooks.indexOf('useParams')!=-1)
output = output + ` const params = useParams();\n`;

if (hooks.indexOf('useReducer')!=-1) {

output = output + `
  // This useReducer hook can call local functions to handle the requested actions if necessary
  function sampleReducer(state, action) {

    switch (action.type) {
      case 'Case1':
        return newState;
      case 'Case2':
        return newState;
      case 'Case3':
          return newState;        
      default:
        return newState;
    }
  }
  
  const [sampleState, dispatch] = useReducer(sampleReducer, initialState);

`;

if (hooks.indexOf('useState')!=-1) {
    output = output + ' const [formValues, setFormValues] = useState(initialFormValues);\n'
    output = output + ' const [formError, setFormError] = useState(false);\n'
    output = output + ' \n'
}

if (hooks.indexOf('useEffect')!=-1) {
output = output + 
`
    /*==========================================================================================*/

  useEffect( () => {    
      async function _handleGenericAsync() {
        try {

        } catch(error) {
          console.error(error);
        }
      }
    _handleGenericAsync();
  }
  ,[]);

  /*==========================================================================================*/
`;
}

output=output + 
`
  return (
 
    <div className="App">
`;

if (hooks.indexOf('useReducer')!=-1) {
output = output + `    <SampleContext.Provider value={sampleState} > \n`;
output = output + `    <SampleDispatchContext.Provider value={dispatch} > \n`;
output = output + `\n`;
}

let childrenNodes = node.children;
if (childrenNodes.length>0) {
    for (let child of childrenNodes) {
        output = output + `<${child.value.name} />\n`;
    }
}

if ((reactSwitch!==undefined) && (reactSwitch===true)) {
    output = output + `        <Switch>\n`;
}
if ((reactRoute!==undefined) && (reactRoute===true)) {
output = output + `
            <Route path="/login" exact>
              <SampleComponent />
            </Route>
            <Route path="/logout/:id" component={SampleComponent} exact />
            <Route path="/somepath" render={routeProps => (<Component {...routeProps} />)} />
            <Route path="/home" render={() => <div>Home</div>} />
`;
}
if ((reactSwitch!==undefined) && (reactSwitch===true)) {
    output = output + `       </Switch>\n`;
}

if ((reactLink!==undefined) && (reactLink===true)) {
    output = output + `        <Link to="/">Home</Link>\n`;
}

if (hooks.indexOf('useReducer')!=-1) {
    output = output + `\n`;
    output = output + `    </SampleDispatchContext.Provider>\n`;
    output = output + `    </SampleContext.Provider>\n`;
}

output=output + 
`
    </div>
  );
`;

}

export default App;


}



/*================================================================================================*/

function output_component(useBootstrap, quickReactElement, node) {

    let output = "";
    
    output = output + `import React from 'react';\n`;
    
    let hooks=quickReactElement.getAttribute('hooks');
    if (hooks!==undefined) {
        let hookTokenList="";
        let comma="";
        if (hooks.indexOf('useEffect')!=-1)     { hookTokenList=hookTokenList+comma+'useEffect'; comma=", "; }
        if (hooks.indexOf('useState')!=-1)      { hookTokenList=hookTokenList+comma+'useState'; comma=", "; }
        if (hooks.indexOf('useContext')!=-1)    { hookTokenList=hookTokenList+comma+'useContext'; comma=", "; }
        if (hooks.indexOf('useReducer')!=-1)    { hookTokenList=hookTokenList+comma+'useReducer'; comma=", "; }
    
        output = output + `import { ${hooksTokenList} } from 'react';\n`;

        if (hooks.indexOf('useContext')!=-1) {
            output = output + `//If you are using context exported from another parent component\n`;
            output = output + `//import { SampleContext } from '../../App';\n`;
            output = output + `//import { SampleDispatchContext } from '../../App';\n`;
        }
    }
    
    let reactSwitch=quickReactElement.getAttribute('switch');
    let reactRoute=quickReactElement.getAttribute('route');
    let reactLink=quickReactElement.getAttribute('link');
    
    if ( (hooks!==undefined) || (reactSwitch!==undefined) || (reactRouter!==undefined) || (reactLink!==undefined) ) { 
        let tokenList="";
        let comma="";
        if (hooks.indexOf('useLocation')!=-1)     { tokenList=tokenList+comma+'useLocation'; comma=", "; }
        if (hooks.indexOf('useHistory')!=-1)      { tokenList=tokenList+comma+'useHistory'; comma=", "; }
        if (hooks.indexOf('useParams')!=-1)      { tokenList=tokenList+comma+'useParams'; comma=", "; }
    
        if ((reactSwitch!==undefined) && (reactSwitch===true))     { tokenList=tokenList+comma+'Switch'; comma=", "; }
        if ((reactRoute!==undefined) && (reactRoute===true))     { tokenList=tokenList+comma+'Route'; comma=", "; }
        if ((reactLink!==undefined) && (reactLink===true))     { tokenList=tokenList+comma+'Link'; comma=", "; }
    
        output = output + `import { ${tokenList} } from "react-router-dom";\n`;
    }
    
    if (userBootstrap) {
        import { Container, Row, Col } from 'react-bootstrap';
    }
    
    let childrenNodes = node.children;
    if (childrenNodes.length>0) {
        for (let child of childrenNodes) {
            output = output + `import { ${child.value.name} } from './components/${child.value.name}';\n`;
        }
    }
    output = output + `import './App.css';\n`;
    output = output + `\n`;
    output = output + `/*==========================================================================================*/\n`;
    
    if (hooks.indexOf('useReducer')!=-1) {
        output = output + `export const SampleContext = React.createContext(); \n`;
        output = output + `export const SampleDispatchContext = React.createContext();\n`;
        output = output + `\n`;
    }
    
    let useForm=quickReactElement.getAttribute('form');
    let useMap=quickReactElement.getAttribute('map');

    output = output + `
    export const ${quickReactElement.name} = (props) => {
    
    `;
    
    if (hooks.indexOf('useContext')!=-1) {
        output = output + `//If you are using context exported from another parent component\n`;
        output = output + `//const session = useContext(SampleContext);\n`;
        output = output + `//const dispatch = useContext(SampleDispatchContext);\n`;
        output = output + `\n`;
    }

    if (hooks.indexOf('useLocation')!=-1)
    output = output + ` const location = useLocation();\n`;
    
    if (hooks.indexOf('useHistory')!=-1)
    output = output + ` const history = useHistory();\n`;
    
    if (hooks.indexOf('useParams')!=-1)
    output = output + ` const history = useParams();\n`;

    if (hooks.indexOf('useReducer')!=-1) {
    
    output = output + `
      // This useReducer hook can call local functions to handle the requested actions if necessary
      function sampleReducer(state, action) {
    
        switch (action.type) {
          case 'Case1':
            return newState;
          case 'Case2':
            return newState;
          case 'Case3':
              return newState;        
          default:
            return newState;
        }
      }
      
      const [sampleState, dispatch] = useReducer(sampleReducer, initialState);
    
    `;
    

    if (hooks.indexOf('useState')!=-1) {
        output = output + ' const [formValues, setFormValues] = useState(initialFormValues);\n'
        output = output + ' const [formError, setFormError] = useState(false);\n'
        output = output + ' \n'
    }
    
    if ( (useForm!==undefined) && (useForm===true) ) {
    output = output + 
    `
        // A typical handleChange controlled form handler
        const _handleChange = (event) => {
            setFormValues((prevState) => {
              // console.log(prevState)
          
              return {
                ...prevState,
                [event.target.id]: event.target.value,
              };
            });
          };

          // A typical onBlur field change validation handler
          const _handleVerifyForm = (event) => {
              if (formValues.password !== formValues.confirm_password) {
                  setFormError(true);
              } else {
                  setFormError(false);
              }     
          }

          // example handle user registration request via API post
          
          const _handleRegistration = async (event) => {

              event.preventDefault();          
              const API_URI='http://localhost:4000/register';
          
              try {
                  const response = await fetch(API_URI, {
                      "method": 'POST',
                      "body": JSON.stringify(formValues),
                      "headers": {
                          "Content-Type": 'application/json'
                      }
                  });
          
                  const data = await response.json();                  
                  if ( (response.status===200) || (response.status===201) ) {
                      setFormValues(initialFormValues);
                  }
                  else {
                    console.error('Registration Failed');
                  }                  
              } catch(error) {
                console.error(error);
              }
          
            } 
                    
    `;
    }

    if (hooks.indexOf('useEffect')!=-1) {
    output = output + 
    `
        /*==========================================================================================*/
    
      useEffect( () => {    
          async function _handleGenericAsync() {
            try {
    
            } catch(error) {
              console.error(error);
            }
          }
        _handleGenericAsync();
      }
      ,[]);
    
      /*==========================================================================================*/
    `;
    }
    
    output=output + 
    `
      return (
     
        <div className="App">
    `;
    
    if (hooks.indexOf('useReducer')!=-1) {
    output = output + `    <SampleContext.Provider value={sampleState} > \n`;
    output = output + `    <SampleDispatchContext.Provider value={dispatch} > \n`;
    output = output + `\n`;
    }
    
    let childrenNodes = node.children;
    if (childrenNodes.length>0) {
        for (let child of childrenNodes) {
            output = output + `<${child.value.name} />\n`;
        }
    }
    

    if ( (useForm!==undefined) && (useForm===true) && (useBootstrap) ) {
        output = output + 
        `
        <>
        <Form onSubmit={_handleRegistration}>

        <Form.Group className="mb-3" controlId="email">
        <Form.Label>*Email address</Form.Label>
        <Form.Control type="email" onChange={_handleChange} value={formValues.email} placeholder="name@example.com" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>*First Name</Form.Label>
        <Form.Control type="text" onChange={_handleChange} value={formValues.first_name} placeholder="First Name Required" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>*Last Name</Form.Label>
        <Form.Control type="last_name" onChange={_handleChange} value={formValues.last_name} placeholder="Last Name Required" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
        <Form.Label>*Select Password</Form.Label>
        <Form.Control type="password" onChange={_handleChange} value={formValues.password} placeholder="Password Required" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirm_password">
        <Form.Label>*Confirm Password</Form.Label>
        <Form.Control type="password" onChange={_handleChange} onBlur={_handleVerifyForm} value={formValues.confirm_password} placeholder="Confirm Password Required" required />
        </Form.Group>
        {formError && <Alert variant='danger'>Passwords must match!</Alert>}

        <Button variant="primary" type="submit" disabled={formError}>
        Submit Registration Form
        </Button>

        </Form>

        </>

        `;
    }

    if ( (useForm!==undefined) && (useForm===true) && (!useBootstrap) ) {
        output = output + 
        `
        <form onSubmit={_handleUserLogin}>
            <div>
                <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        id='username'
                        value={formValues.username}
                        onChange={_handleChange}
                        required
                    />  
            </div>
            <div>
                <label htmlFor='password'>Password: </label>
                    <input
                        type='password'
                        id='password'
                        value={formValues.password}
                        onChange={_handleChange}
                        required
                    />
            </div>
            <input type='submit' value='Member Login' />
        </form>

        `;
    }

    if ( (useMap!==undefined) && (usemap===true) ) {
        output = output + 
        `   // Sample array mapping to JSX output
            {
                listing.map( (item, index) => {
                        return (
                            <div key={index}>
                                <li>{item.name}</li>
                            </div>
                        )
                    });
            }

        `;
    }

    if ((reactSwitch!==undefined) && (reactSwitch===true)) {
        output = output + `        <Switch>\n`;
    }
    if ((reactRoute!==undefined) && (reactRoute===true)) {
    output = output + `
                <Route path="/login" exact>
                  <SampleComponent />
                </Route>
                <Route path="/logout/:id" component={SampleComponent} exact />
                <Route path="/somepath" render={routeProps => (<Component {...routeProps} />)} />
                <Route path="/home" render={() => <div>Home</div>} />
    `;
    }
    if ((reactSwitch!==undefined) && (reactSwitch===true)) {
        output = output + `       </Switch>\n`;
    }
    
    if ((reactLink!==undefined) && (reactLink===true)) {
        output = output + `        <Link to="/">Home</Link>\n`;
    }
    
    if (hooks.indexOf('useReducer')!=-1) {
        output = output + `\n`;
        output = output + `    </SampleDispatchContext.Provider>\n`;
        output = output + `    </SampleContext.Provider>\n`;
    }
    
    output=output + 
    `
        </div>
      );
      
    }
    
    export default ${quickReactElement.name};
    
    `;
    
    }
    
    /*================================================================================================*/
    

/*================================================================================================*/
// Export these library classes to other node modules

module.exports = { QuickReactElement, QuickReact };



