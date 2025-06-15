"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = _interopRequireDefault(require("./styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SkyLightStateless extends _react.default.Component {
  constructor(props) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
    this.portalNode = document.createElement('div');
    this.titleId = `skylight-title-${Math.random().toString(36).substr(2, 9)}`;
  }
  componentDidMount() {
    document.body.appendChild(this.portalNode);
    document.addEventListener('keydown', this.handleEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
    document.body.removeChild(this.portalNode);
  }
  handleEsc(evt) {
    if (evt.key === 'Escape' && this.props.closeOnEsc && this.props.isVisible) {
      if (this.props.onCloseClicked) {
        this.props.onCloseClicked();
      }
    }
  }
  onOverlayClicked() {
    if (this.props.onOverlayClicked) {
      this.props.onOverlayClicked();
    }
  }
  onCloseClicked() {
    if (this.props.onCloseClicked) {
      this.props.onCloseClicked();
    }
  }
  render() {
    const mergeStyles = key => ({
      ..._styles.default[key],
      ...this.props[key]
    });
    const {
      isVisible
    } = this.props;
    const dialogStyles = mergeStyles('dialogStyles');
    const overlayStyles = mergeStyles('overlayStyles');
    const closeButtonStyle = mergeStyles('closeButtonStyle');
    const titleStyle = mergeStyles('titleStyle');
    let finalStyle;
    if (isVisible) {
      finalStyle = {
        ...dialogStyles,
        ..._styles.default.animationOpen
      };
      overlayStyles.display = 'block';
    } else {
      finalStyle = {
        ...dialogStyles,
        ..._styles.default.animationBase
      };
      overlayStyles.display = 'none';
    }
    finalStyle.transitionDuration = `${this.props.transitionDuration}ms`;
    overlayStyles.transitionDuration = `${this.props.transitionDuration}ms`;
    let overlay;
    if (this.props.showOverlay) {
      overlay = /*#__PURE__*/_react.default.createElement("div", {
        className: "skylight-overlay",
        onClick: () => this.onOverlayClicked(),
        style: overlayStyles
      });
    }
    let title;
    if (/*#__PURE__*/_react.default.isValidElement(this.props.title)) {
      title = this.props.title;
    } else {
      title = this.props.title ? /*#__PURE__*/_react.default.createElement("h2", {
        id: this.titleId,
        style: titleStyle
      }, this.props.title) : null;
    }
    const content = /*#__PURE__*/_react.default.createElement("section", {
      className: `skylight-wrapper ${this.props.className}`
    }, overlay, /*#__PURE__*/_react.default.createElement("div", {
      role: "dialog",
      "aria-labelledby": this.props.title ? this.titleId : undefined,
      className: "skylight-dialog",
      style: finalStyle
    }, /*#__PURE__*/_react.default.createElement("a", {
      role: "button",
      className: "skylight-close-button",
      onClick: () => this.onCloseClicked(),
      style: closeButtonStyle
    }, this.props.closeButton || '\u00D7'), title, this.props.children));
    return /*#__PURE__*/_reactDom.default.createPortal(content, this.portalNode);
  }
}
exports.default = SkyLightStateless;
SkyLightStateless.displayName = 'SkyLightStateless';
SkyLightStateless.sharedPropTypes = {
  closeButtonStyle: _propTypes.default.object,
  dialogStyles: _propTypes.default.object,
  onCloseClicked: _propTypes.default.func,
  onOverlayClicked: _propTypes.default.func,
  overlayStyles: _propTypes.default.object,
  showOverlay: _propTypes.default.bool,
  title: _propTypes.default.any,
  transitionDuration: _propTypes.default.number,
  titleStyle: _propTypes.default.object,
  closeOnEsc: _propTypes.default.bool,
  className: _propTypes.default.string,
  closeButton: _propTypes.default.any
};
SkyLightStateless.propTypes = {
  ...SkyLightStateless.sharedPropTypes,
  isVisible: _propTypes.default.bool
};
SkyLightStateless.defaultProps = {
  title: '',
  showOverlay: true,
  overlayStyles: _styles.default.overlayStyles,
  dialogStyles: _styles.default.dialogStyles,
  closeButtonStyle: _styles.default.closeButtonStyle,
  transitionDuration: 200,
  closeOnEsc: true,
  className: ''
};