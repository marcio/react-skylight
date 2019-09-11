import React from 'react';
import PropTypes from 'prop-types';
import SkylightStateless from './skylightstateless';

export default class SkyLight extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOperationInProgress: false,
      nextIsVisible: null,
      isVisible: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOperationInProgress, nextIsVisible } = this.state;

    if (isOperationInProgress && nextIsVisible === true) {
      this.props.beforeOpen && this.props.beforeOpen();
      this._completeShowOperation();
    }

    if (isOperationInProgress && nextIsVisible === false) {
      this.props.beforeClose && this.props.beforeClose();
      this._completeHideOperation();
    }

    if (!isOperationInProgress && prevState.nextIsVisible === true) {
      this.props.afterOpen && this.props.afterOpen();
    }

    if (!isOperationInProgress && prevState.nextIsVisible === false) {
      this.props.afterClose && this.props.afterClose();
    }
  }

  show() {
    this.setState({ isOperationInProgress: true, nextIsVisible: true });
  }

  hide() {
    this.setState({ isOperationInProgress: true, nextIsVisible: false });
  }

  _completeShowOperation() {
    this.setState({ isVisible: true, isOperationInProgress: false, nextIsVisible: null });
  }

  _completeHideOperation() {
    this.setState({ isVisible: false, isOperationInProgress: false, nextIsVisible: null });
  }

  _onOverlayClicked() {
    if (this.props.hideOnOverlayClicked) {
      this.hide();
    }

    if (this.props.onOverlayClicked) {
      this.props.onOverlayClicked();
    }
  }

  render() {
    return (
      <SkylightStateless
        {...this.props}
        isVisible={this.state.isVisible}
        onOverlayClicked={() => this._onOverlayClicked()}
        onCloseClicked={() => this.hide()}
      />
    );
  }
}

SkyLight.displayName = 'SkyLight';

SkyLight.propTypes = {
  ...SkylightStateless.sharedPropTypes,
  afterClose: PropTypes.func,
  afterOpen: PropTypes.func,
  beforeClose: PropTypes.func,
  beforeOpen: PropTypes.func,
  hideOnOverlayClicked: PropTypes.bool,
};

SkyLight.defaultProps = {
  ...SkylightStateless.defaultProps,
  hideOnOverlayClicked: false,
};
