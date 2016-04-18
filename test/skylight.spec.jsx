/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React from 'react';
import { expect } from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import Skylight from '../src/skylight';

describe('The Skylight component', () => {
  it('will not render initially', () => {
    const rendered = renderIntoDocument(<Skylight />);
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(0);
  });

  it('will render on show()', () => {
    const rendered = renderIntoDocument(<Skylight />);
    rendered.show();
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(1);
  });

  it('will hide on hide()', () => {
    const rendered = renderIntoDocument(<Skylight />);
    rendered.show();
    rendered.hide();
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(0);
  });

  it('will emit beforeOpen and afterOpen events when opening', () => {
    let beforeTriggered = false;
    let afterTriggered = false;
    const onBefore = () => beforeTriggered = true;
    const onAfter = () => {
      expect(beforeTriggered).to.be.true;
      afterTriggered = true;
    };
    const rendered = renderIntoDocument(
      <Skylight beforeOpen={onBefore} afterOpen={onAfter} />
    );
    expect(beforeTriggered).to.be.false;
    expect(afterTriggered).to.be.false;
    rendered.show();
    expect(beforeTriggered).to.be.true;
    expect(afterTriggered).to.be.true;
  });

  it('will emit beforeClose and afterClose events when closing', () => {
    let beforeTriggered = false;
    let afterTriggered = false;
    const onBefore = () => beforeTriggered = true;
    const onAfter = () => {
      expect(beforeTriggered).to.be.true;
      afterTriggered = true;
    };
    const rendered = renderIntoDocument(
      <Skylight beforeClose={onBefore} afterClose={onAfter} />
    );
    rendered.show();
    expect(beforeTriggered).to.be.false;
    expect(afterTriggered).to.be.false;
    rendered.hide();
    expect(beforeTriggered).to.be.true;
    expect(afterTriggered).to.be.true;
  });

  it('will emit an onOverlayClicked event', () => {
    let clicked = false;
    const rendered = renderIntoDocument(
      <Skylight onOverlayClicked={() => clicked = true} />
    );
    rendered.show();
    const overlay = findRenderedDOMComponentWithClass(rendered, 'skylight-overlay');
    Simulate.click(overlay);
    expect(clicked).to.be.true;

    // Still open
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(1);
  });

  it('will close when the overlay is clicked when hideOnOverlayClicked prop is true', () => {
    const rendered = renderIntoDocument(
      <Skylight hideOnOverlayClicked />
    );
    rendered.show();
    const overlay = findRenderedDOMComponentWithClass(rendered, 'skylight-overlay');
    Simulate.click(overlay);

    // Component closes
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(0);
  });

  it('will hide when the close button is clicked', () => {
    const rendered = renderIntoDocument(
      <Skylight />
    );
    rendered.show();
    const closeButton = findRenderedDOMComponentWithClass(rendered, 'skylight-close-button');
    Simulate.click(closeButton);

    // Component closes
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(0);
  });
});
