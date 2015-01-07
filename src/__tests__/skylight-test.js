/**
 * Created by Gasparotto on 06/01/15.
 */
jest.dontMock('../skylight');

describe('SkyLight', function() {

    var React;
    var SkyLight;
    var TestUtils;

    beforeEach(function(){
        React = require('react/addons');
        SkyLight = require('../skylight');
        TestUtils = React.addons.TestUtils;
    });

    it('Show a title in h2 tag', function() {

        var titleTest = "My title test";
        var skylight = TestUtils.renderIntoDocument(
            <SkyLight title={titleTest} />
        );

        var h2Title = TestUtils.findRenderedDOMComponentWithTag(skylight, 'h2');
        expect(h2Title.getDOMNode().textContent).toEqual(titleTest);
    });

    it('Show a content', function() {

        var text = 'Hi Modal :D';
        var className = 'test';
        var root = React.createElement('div', { className: className }, text);

        var skylight = TestUtils.renderIntoDocument(
            <SkyLight>{root}</SkyLight>
        );

        var content = TestUtils.findRenderedDOMComponentWithClass(skylight, className);
        expect(content.getDOMNode().textContent).toEqual(text);

    });


});