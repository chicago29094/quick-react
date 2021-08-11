const assert = require('assert');
const should = require('chai').should();
const expect = require('chai').expect;
const {NaryNode, NaryTree} = require('../utility/NaryTree');
const {QuickReactElement, QuickReact} = require('../utility/QuickReact');


/*============================================================================*/

describe('QuickReact Class Library', function() {

const markup = 
`
<Config react-bootstrap />
<App>
    <Children hooks=useEffect, useContext />
    <Header>
        <Navigation />
    </Header>
    <Main form input='text*3, textarea, checkbox*4, password'>
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
            expect(tree.size()).to.be.equal(7);
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
            expect(tree.size()).to.be.equal(7);
        });
    });

    /*============================================================================*/


});

