/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React from 'react';
import { expect } from 'chai';
import Skylight from '../src/skylight';
import SkylightInteractor from './SkylightInteractor';

describe('The Skylight component', () => {
  it('will not render initially', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    expect(rendered.isOpen()).to.be.false;
  });

  it('will render on show()', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    rendered.show();
    expect(rendered.isOpen()).to.be.true;
  });

  it('will hide on hide()', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    rendered.show();
    rendered.hide();
    expect(rendered.isOpen()).to.be.false;
  });

  it('will emit beforeOpen and afterOpen events when opening', () => {
    let beforeTriggered = false;
    let afterTriggered = false;
    const onBefore = () => beforeTriggered = true;
    const onAfter = () => {
      expect(beforeTriggered).to.be.true;
      afterTriggered = true;
    };
    const rendered = new SkylightInteractor(
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
    const rendered = new SkylightInteractor(
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
    const rendered = new SkylightInteractor(
      <Skylight onOverlayClicked={() => clicked = true} />
    );
    rendered.show();
    rendered.clickOnOverlay();
    expect(clicked).to.be.true;
    expect(rendered.isOpen()).to.be.true;
  });

  it('will close when the overlay is clicked when hideOnOverlayClicked prop is true', () => {
    const rendered = new SkylightInteractor(
      <Skylight hideOnOverlayClicked />
    );
    rendered.show();
    rendered.clickOnOverlay();
    expect(rendered.isOpen()).to.be.false;
  });

  it('will hide when the close button is clicked', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    rendered.show();
    rendered.clickOnClose();
    expect(rendered.isOpen()).to.be.false;
  });
});
