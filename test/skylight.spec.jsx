import React from 'react';
import { expect } from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import Skylight from '../src/skylight';

describe('The Skylight component', () => {
  it('will not render initially', () => {
    const rendered = renderIntoDocument(<Skylight />);
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(0);
  });

  it('will render it is shown', () => {
    const rendered = renderIntoDocument(<Skylight isVisible />);
    rendered.show();
    const found = scryRenderedDOMComponentsWithClass(rendered, 'skylight-wrapper');
    expect(found.length).to.equal(1);
  });
});
