/**
 * Created by Gasparotto on 06/01/15.
 */
jest.dontMock('../skylight.jsx');

describe('SkyLight', function() {

    var React;
    var SkyLight;
    var TestUtils;

    beforeEach(function(){
        React = require('react/addons');
        SkyLight = require('../skylight.jsx');
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


    it('Overlay cant be rendered if showOverlay is false', function() {
        var skylight = TestUtils.renderIntoDocument(
            <SkyLight showOverlay={false}></SkyLight>
        );
        var className = 'skylight-dialog__overlay';
        var overlay = TestUtils.scryRenderedDOMComponentsWithClass(skylight, className);
        expect(overlay.length).toEqual(0);
    });


    it('Should be set display:block when isVisible it was changed to true', function() {

        var skylight = TestUtils.renderIntoDocument(
            <SkyLight></SkyLight>
        );

        var instance = TestUtils.findRenderedComponentWithType(skylight, <SkyLight />);
        var modalStyle = TestUtils.findRenderedDOMComponentWithClass(skylight, 'skylight-dialog');
        expect(modalStyle.getDOMNode().style.display).toEqual('none');
        instance.setState({isVisible: true});
        expect(modalStyle.getDOMNode().style.display).toEqual('block');
        instance.setState({isVisible: false});
        expect(modalStyle.getDOMNode().style.display).toEqual('none');
    });


});