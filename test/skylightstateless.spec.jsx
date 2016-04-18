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
import SkylightStateless from '../src/skylightstateless';

describe('The SkylightStateless component', () => {
  it('will not render when it is not visible', () => {
    const rendered = renderIntoDocument(<SkylightStateless />);
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(0);
  });

  it('will render when it is visible', () => {
    const rendered = renderIntoDocument(<SkylightStateless isVisible />);
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(1);
  });

  it('will not render the overlay when the showOverlay prop is false', () => {
    const rendered = renderIntoDocument(<SkylightStateless isVisible showOverlay={false} />);
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-overlay');
    expect(found.length).to.equal(0);
  });

  it('will emit an event when the overlay is clicked', () => {
    let clicked = false;
    const rendered = renderIntoDocument(
      <SkylightStateless isVisible onOverlayClicked={() => clicked = true} />
    );
    const overlay = findRenderedDOMComponentWithClass(rendered, 'skylight-overlay');
    Simulate.click(overlay);
    expect(clicked).to.be.true;
  });

  it('will emit an event when the close button is clicked', () => {
    let clicked = false;
    const rendered = renderIntoDocument(
      <SkylightStateless isVisible onCloseClicked={() => clicked = true} />
    );
    const closeButton = findRenderedDOMComponentWithClass(rendered, 'skylight-close-button');
    Simulate.click(closeButton);
    expect(clicked).to.be.true;
  });

  it('will not blow up when no onCloseClicked prop is set', () => {
    const rendered = renderIntoDocument(<SkylightStateless isVisible />);
    const closeButton = findRenderedDOMComponentWithClass(rendered, 'skylight-close-button');
    Simulate.click(closeButton);
    // no error thrown
  });

  it('will not blow up when no onOverlayClicked prop is set', () => {
    const rendered = renderIntoDocument(<SkylightStateless isVisible />);
    const overlay = findRenderedDOMComponentWithClass(rendered, 'skylight-overlay');
    Simulate.click(overlay);
    // no error thrown
  });
});
