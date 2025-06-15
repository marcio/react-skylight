import React from 'react';
import SkylightStateless from '../src/skylightstateless';
import SkylightInteractor from './skylightinteractor';

describe('The SkylightStateless component', () => {
  it('will not render when it is not visible', () => {
    const rendered = new SkylightInteractor(<SkylightStateless />);
    expect(rendered.isOpen()).toBe(false);
  });

  it('will render when it is visible', () => {
    const rendered = new SkylightInteractor(<SkylightStateless isVisible />);
    expect(rendered.isOpen()).toBe(true);
  });

  it('will not render the overlay when the showOverlay prop is false', () => {
    const rendered = new SkylightInteractor(
      <SkylightStateless isVisible showOverlay={false} />
    );
    expect(rendered.isOverlayVisible()).toBe(false);
  });

  it('will emit an event when the overlay is clicked', () => {
    let clicked = false;
    const rendered = new SkylightInteractor(
      <SkylightStateless isVisible onOverlayClicked={() => clicked = true} />
    );
    rendered.clickOnOverlay();
    expect(clicked).toBe(true);
  });

  it('will emit an event when the close button is clicked', () => {
    let clicked = false;
    const rendered = new SkylightInteractor(
      <SkylightStateless isVisible onCloseClicked={() => clicked = true} />
    );
    rendered.clickOnClose();
    expect(clicked).toBe(true);
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
