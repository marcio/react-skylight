import React from 'react';
import PropTypes from 'prop-types';
import SkylightStateless from './skylightstateless';

const isOpening = (s1, s2) => !s1.isVisible && s2.isVisible;
const isClosing = (s1, s2) => s1.isVisible && !s2.isVisible;

export default class SkyLight extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  componentWillUpdate(nextProps, nextState) {
    if (isOpening(this.state, nextState) && this.props.beforeOpen) {
      this.props.beforeOpen();
    }

    if (isClosing(this.state, nextState) && this.props.beforeClose) {
      this.props.beforeClose();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (isOpening(prevState, this.state) && this.props.afterOpen) {
      this.props.afterOpen();
    }

    if (isClosing(prevState, this.state) && this.props.afterClose) {
      this.props.afterClose();
    }
  }

  show() {
    this.setState({ isVisible: true });
  }

  hide() {
    this.setState({ isVisible: false });
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
    return (<SkylightStateless
      {...this.props}
      isVisible={this.state.isVisible}
      onOverlayClicked={() => this._onOverlayClicked()}
      onCloseClicked={() => this.hide()}
    />);
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
