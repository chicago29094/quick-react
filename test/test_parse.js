/**
 * Mocha/Chai tests for Quick-React class and parsing library
 */
const assert = require('assert');
const should = require('chai').should();
const expect = require('chai').expect;
const {NaryNode, NaryTree} = require('../utility/NaryTree');
const {QuickReactElement, QuickReact, } = require('../utility/QuickReact');


/*============================================================================*/

describe('QuickReact Class Library', function() {

const markup = 
`
<Config react-bootstrap />
<App>
    <Children hooks='useEffect,useContext*44,useState*3' />
    <Header>
        <Navigation />
    </Header>
    <Main form forminputs='text*3, textarea[ginger, baker], checkbox*4, password'>
        <Resume form userReducer useContext />
    </Main>
    <Footer />
</App>

`;

    /*============================================================================*/

    describe('QuickReact Parsing', function() {
        it('instantiating QuickReact should return a QuickReact object', function() {
              const quickReact = new QuickReact();
              expect(quickReact).to.be.a('object');
              expect(quickReact).to.be.an.instanceof(QuickReact);
        });
    });

    /*============================================================================*/

    describe('QuickReact Parsing', function() {
        it('parseMarkup size with test markup should be 8 ', function() {
            const quickReact = new QuickReact();
            const tree = quickReact.parseMarkup(markup);

            console.log(tree.toString() );

            expect(tree).to.be.a('object');
            expect(tree).to.be.an.instanceof(NaryTree);
            expect(tree.size()).to.be.equal(8);
        });
    });

    /*============================================================================*/

    describe('QuickReact File Generation and ZIP Archiving', function() {
        it('parseMarkup size with test markup should be 8 ', function() {
            const quickReact = new QuickReact();
            const tree = quickReact.parseMarkup(markup);
            quickReact.generateProjectFiles('123456', '5551212', tree);

            expect(tree).to.be.a('object');
            expect(tree).to.be.an.instanceof(NaryTree);
            expect(tree.size()).to.be.equal(8);
        });
    });

    /*============================================================================*/

    describe('QuickReact Test Multiplier Syntax', function() {
        it('Find a matching attribute and the multiplier factor', function() {
            const quickReact = new QuickReact();
            const tree = quickReact.parseMarkup(markup);
            //quickReact.generateProjectFiles('123456', '5551212', tree);

            let returnValue=0;
            
            component = tree.getByObjectProperty( {'name': 'Children'} );

            returnValue = quickReact._findMultiplier(component, 'eeeeee');
            expect(returnValue).to.be.equal(0);

            returnValue = quickReact._findMultiplier(component, 'useEffect');
            expect(returnValue).to.be.equal(1);

            returnValue = quickReact._findMultiplier(component, 'useContext');
            expect(returnValue).to.be.equal(44);

            returnValue = quickReact._findMultiplier(component, 'useState');
            expect(returnValue).to.be.equal(3);

            component = tree.getByObjectProperty( {'name': 'Main'} );

            returnValue = quickReact._findMultiplier(component, 'text');
            expect(returnValue).to.be.equal(3);

            returnValue = quickReact._findMultiplier(component, 'textarea');
            expect(returnValue).to.be.equal(2);

            returnValue = quickReact._findMultiplier(component, 'checkbox');
            expect(returnValue).to.be.equal(4);

            returnValue = quickReact._findMultiplier(component, 'password');
            expect(returnValue).to.be.equal(1);

        });
    });

    /*============================================================================*/




});

