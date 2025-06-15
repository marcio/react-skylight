"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _skylightstateless = _interopRequireDefault(require("./skylightstateless"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const isOpening = (s1, s2) => !s1.isVisible && s2.isVisible;
const isClosing = (s1, s2) => s1.isVisible && !s2.isVisible;
class SkyLight extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
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
    this.setState({
      isVisible: true
    });
  }
  hide() {
    this.setState({
      isVisible: false
    });
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
    return /*#__PURE__*/_react.default.createElement(_skylightstateless.default, _extends({}, this.props, {
      isVisible: this.state.isVisible,
      onOverlayClicked: () => this._onOverlayClicked(),
      onCloseClicked: () => this.hide()
    }));
  }
}
exports.default = SkyLight;
SkyLight.displayName = 'SkyLight';
SkyLight.propTypes = {
  ..._skylightstateless.default.sharedPropTypes,
  afterClose: _propTypes.default.func,
  afterOpen: _propTypes.default.func,
  beforeClose: _propTypes.default.func,
  beforeOpen: _propTypes.default.func,
  hideOnOverlayClicked: _propTypes.default.bool
};
SkyLight.defaultProps = {
  ..._skylightstateless.default.defaultProps,
  hideOnOverlayClicked: false
};
