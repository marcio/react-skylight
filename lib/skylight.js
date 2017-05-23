'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _skylightstateless = require('./skylightstateless');

var _skylightstateless2 = _interopRequireDefault(_skylightstateless);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isOpening = function isOpening(s1, s2) {
  return !s1.isVisible && s2.isVisible;
};
var isClosing = function isClosing(s1, s2) {
  return s1.isVisible && !s2.isVisible;
};

var SkyLight = function (_React$Component) {
  _inherits(SkyLight, _React$Component);

  function SkyLight(props) {
    _classCallCheck(this, SkyLight);

    var _this = _possibleConstructorReturn(this, (SkyLight.__proto__ || Object.getPrototypeOf(SkyLight)).call(this, props));

    _this.state = { isVisible: false };
    return _this;
  }

  _createClass(SkyLight, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (isOpening(this.state, nextState) && this.props.beforeOpen) {
        this.props.beforeOpen();
      }

      if (isClosing(this.state, nextState) && this.props.beforeClose) {
        this.props.beforeClose();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (isOpening(prevState, this.state) && this.props.afterOpen) {
        this.props.afterOpen();
      }

      if (isClosing(prevState, this.state) && this.props.afterClose) {
        this.props.afterClose();
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.setState({ isVisible: true });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({ isVisible: false });
    }
  }, {
    key: '_onOverlayClicked',
    value: function _onOverlayClicked() {
      if (this.props.hideOnOverlayClicked) {
        this.hide();
      }

      if (this.props.onOverlayClicked) {
        this.props.onOverlayClicked();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_skylightstateless2.default, _extends({}, this.props, {
        isVisible: this.state.isVisible,
        onOverlayClicked: function onOverlayClicked() {
          return _this2._onOverlayClicked();
        },
        onCloseClicked: function onCloseClicked() {
          return _this2.hide();
        }
      }));
    }
  }]);

  return SkyLight;
}(_react2.default.Component);

exports.default = SkyLight;


SkyLight.displayName = 'SkyLight';

SkyLight.propTypes = _extends({}, _skylightstateless2.default.sharedPropTypes, {
  afterClose: _propTypes2.default.func,
  afterOpen: _propTypes2.default.func,
  beforeClose: _propTypes2.default.func,
  beforeOpen: _propTypes2.default.func,
  hideOnOverlayClicked: _propTypes2.default.bool
});

SkyLight.defaultProps = _extends({}, _skylightstateless2.default.defaultProps, {
  hideOnOverlayClicked: false
});