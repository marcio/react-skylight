/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-dom/test-utils';

/**
 * A test wrapper for skylight components that performs DOM interaction.
 */
export default class SkylightInteractor {
  constructor(jsx) {
    this._component = renderIntoDocument(jsx);
  }

  show() {
    this._component.show();
  }

  hide() {
    this._component.hide();
  }

  isOverlayVisible() {
    const found = scryRenderedDOMComponentsWithClass(this._component, 'skylight-overlay');
    return found.length === 1;
  }

  clickOnOverlay() {
    const overlay = findRenderedDOMComponentWithClass(this._component, 'skylight-overlay');
    Simulate.click(overlay);
  }

  clickOnClose() {
    const closeButton = findRenderedDOMComponentWithClass(this._component, 'skylight-close-button');
    Simulate.click(closeButton);
  }

  isOpen() {
    if (typeof this._component.state !== 'undefined' && this._component.state && typeof this._component.state.isVisible !== 'undefined') {
      return this._component.state.isVisible;
    }
    return !!this._component.props.isVisible;
  }
}
