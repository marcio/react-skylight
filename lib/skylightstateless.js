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

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _assign = require('./utils/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkyLightStateless = function (_React$Component) {
  _inherits(SkyLightStateless, _React$Component);

  function SkyLightStateless() {
    _classCallCheck(this, SkyLightStateless);

    return _possibleConstructorReturn(this, (SkyLightStateless.__proto__ || Object.getPrototypeOf(SkyLightStateless)).apply(this, arguments));
  }

  _createClass(SkyLightStateless, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener("keydown", this._handlerEsc.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener("keydown", this._handlerEsc.bind(this));
    }
  }, {
    key: '_handlerEsc',
    value: function _handlerEsc(evt) {
      var isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key == "Escape" || evt.key == "Esc";
      } else {
        isEscape = evt.keyCode == 27;
      }
      if (isEscape && this.props.closeOnEsc && this.props.isVisible) {
        this.props.onCloseClicked();
      }
    }
  }, {
    key: 'onOverlayClicked',
    value: function onOverlayClicked() {
      if (this.props.onOverlayClicked) {
        this.props.onOverlayClicked();
      }
    }
  }, {
    key: 'onCloseClicked',
    value: function onCloseClicked() {
      if (this.props.onCloseClicked) {
        this.props.onCloseClicked();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var mergeStyles = function mergeStyles(key) {
        return (0, _assign2.default)({}, _styles2.default[key], _this2.props[key]);
      };
      var isVisible = this.props.isVisible;

      var dialogStyles = mergeStyles('dialogStyles');
      var overlayStyles = mergeStyles('overlayStyles');
      var closeButtonStyle = mergeStyles('closeButtonStyle');
      var titleStyle = mergeStyles('titleStyle');

      var finalStyle = void 0;
      if (isVisible) {
        finalStyle = (0, _assign2.default)({}, dialogStyles, _styles2.default.animationOpen);
        overlayStyles.display = 'block';
      } else {
        finalStyle = (0, _assign2.default)({}, dialogStyles, _styles2.default.animationBase);
        overlayStyles.display = 'none';
      }

      finalStyle.transitionDuration = this.props.transitionDuration + 'ms';
      overlayStyles.transitionDuration = this.props.transitionDuration + 'ms';

      var overlay = void 0;
      if (this.props.showOverlay) {
        overlay = _react2.default.createElement('div', { className: 'skylight-overlay',
          onClick: function onClick() {
            return _this2.onOverlayClicked();
          },
          style: overlayStyles
        });
      }

      var title = void 0;
      if (_react2.default.isValidElement(this.props.title)) {
        title = this.props.title;
      } else {
        title = this.props.title ? _react2.default.createElement(
          'h2',
          { style: titleStyle },
          this.props.title
        ) : null;
      }

      return _react2.default.createElement(
        'section',
        { className: 'skylight-wrapper ' + this.props.className },
        overlay,
        _react2.default.createElement(
          'div',
          { className: 'skylight-dialog', style: finalStyle },
          _react2.default.createElement(
            'a',
            {
              role: 'button',
              className: 'skylight-close-button',
              onClick: function onClick() {
                return _this2.onCloseClicked();
              },
              style: closeButtonStyle
            },
            this.props.closeButton || '\xD7'
          ),
          title,
          this.props.children
        )
      );
    }
  }]);

  return SkyLightStateless;
}(_react2.default.Component);

exports.default = SkyLightStateless;


SkyLightStateless.displayName = 'SkyLightStateless';

SkyLightStateless.sharedPropTypes = {
  closeButtonStyle: _propTypes2.default.object,
  dialogStyles: _propTypes2.default.object,
  onCloseClicked: _propTypes2.default.func,
  onOverlayClicked: _propTypes2.default.func,
  overlayStyles: _propTypes2.default.object,
  showOverlay: _propTypes2.default.bool,
  title: _propTypes2.default.any,
  transitionDuration: _propTypes2.default.number,
  titleStyle: _propTypes2.default.object,
  closeOnEsc: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  closeButton: _propTypes2.default.any
};

SkyLightStateless.propTypes = _extends({}, SkyLightStateless.sharedPropTypes, {
  isVisible: _propTypes2.default.bool
});

SkyLightStateless.defaultProps = {
  title: '',
  showOverlay: true,
  overlayStyles: _styles2.default.overlayStyles,
  dialogStyles: _styles2.default.dialogStyles,
  closeButtonStyle: _styles2.default.closeButtonStyle,
  transitionDuration: 200,
  closeOnEsc: true,
  className: ''
};