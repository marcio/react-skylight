import React from 'react';
import Skylight from '../src/skylight';
import SkylightInteractor from './skylightinteractor';

describe('The Skylight component', () => {
  it('will not render initially', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    expect(rendered.isOpen()).toBe(false);
  });

  it('will render on show()', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    rendered.show();
    expect(rendered.isOpen()).toBe(true);
  });

  it('will hide on hide()', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    rendered.show();
    rendered.hide();
    expect(rendered.isOpen()).toBe(false);
  });

  it('will emit beforeOpen and afterOpen events when opening', () => {
    let beforeTriggered = false;
    let afterTriggered = false;
    const onBefore = () => beforeTriggered = true;
    const onAfter = () => {
      expect(beforeTriggered).toBe(true);
      afterTriggered = true;
    };
    const rendered = new SkylightInteractor(
      <Skylight beforeOpen={onBefore} afterOpen={onAfter} />
    );
    expect(beforeTriggered).toBe(false);
    expect(afterTriggered).toBe(false);
    rendered.show();
    expect(beforeTriggered).toBe(true);
    expect(afterTriggered).toBe(true);
  });

  it('will emit beforeClose and afterClose events when closing', () => {
    let beforeTriggered = false;
    let afterTriggered = false;
    const onBefore = () => beforeTriggered = true;
    const onAfter = () => {
      expect(beforeTriggered).toBe(true);
      afterTriggered = true;
    };
    const rendered = new SkylightInteractor(
      <Skylight beforeClose={onBefore} afterClose={onAfter} />
    );
    rendered.show();
    expect(beforeTriggered).toBe(false);
    expect(afterTriggered).toBe(false);
    rendered.hide();
    expect(beforeTriggered).toBe(true);
    expect(afterTriggered).toBe(true);
  });

  it('will emit an onOverlayClicked event', () => {
    let clicked = false;
    const rendered = new SkylightInteractor(
      <Skylight onOverlayClicked={() => clicked = true} />
    );
    rendered.show();
    rendered.clickOnOverlay();
    expect(clicked).toBe(true);
    expect(rendered.isOpen()).toBe(true);
  });

  it('will close when the overlay is clicked when hideOnOverlayClicked prop is true', () => {
    const rendered = new SkylightInteractor(
      <Skylight hideOnOverlayClicked />
    );
    rendered.show();
    rendered.clickOnOverlay();
    expect(rendered.isOpen()).toBe(false);
  });

  it('will hide when the close button is clicked', () => {
    const rendered = new SkylightInteractor(<Skylight />);
    rendered.show();
    rendered.clickOnClose();
    expect(rendered.isOpen()).toBe(false);
  });
});
