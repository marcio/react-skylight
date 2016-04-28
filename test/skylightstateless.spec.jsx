/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React from 'react';
import { expect } from 'chai';
import SkylightStateless from '../src/skylightstateless';
import SkylightInteractor from './SkylightInteractor';

describe('The SkylightStateless component', () => {
  it('will not render when it is not visible', () => {
    const rendered = new SkylightInteractor(<SkylightStateless />);
    expect(rendered.isOpen()).to.be.false;
  });

  it('will render when it is visible', () => {
    const rendered = new SkylightInteractor(<SkylightStateless isVisible />);
    expect(rendered.isOpen()).to.be.true;
  });

  it('will not render the overlay when the showOverlay prop is false', () => {
    const rendered = new SkylightInteractor(
      <SkylightStateless isVisible showOverlay={false} />
    );
    expect(rendered.isOverlayVisible()).to.be.false;
  });

  it('will emit an event when the overlay is clicked', () => {
    let clicked = false;
    const rendered = new SkylightInteractor(
      <SkylightStateless isVisible onOverlayClicked={() => clicked = true} />
    );
    rendered.clickOnOverlay();
    expect(clicked).to.be.true;
  });

  it('will emit an event when the close button is clicked', () => {
    let clicked = false;
    const rendered = new SkylightInteractor(
      <SkylightStateless isVisible onCloseClicked={() => clicked = true} />
    );
    rendered.clickOnClose();
    expect(clicked).to.be.true;
  });

  it('will not blow up when no onCloseClicked prop is set', () => {
    const rendered = new SkylightInteractor(<SkylightStateless isVisible />);
    rendered.clickOnClose();
    // no error thrown
  });

  it('will not blow up when no onOverlayClicked prop is set', () => {
    const rendered = new SkylightInteractor(<SkylightStateless isVisible />);
    rendered.clickOnOverlay();
    // no error thrown
  });
});
