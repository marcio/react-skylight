'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkylightStateless = function (_React$Component) {
    _inherits(SkylightStateless, _React$Component);

    function SkylightStateless() {
        _classCallCheck(this, SkylightStateless);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SkylightStateless).apply(this, arguments));
    }

    _createClass(SkylightStateless, [{
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
            var dialogStyles = Object.assign({}, _styles2.default.dialogStyles, this.props.dialogStyles);
            var overlayStyles = Object.assign({}, _styles2.default.overlayStyles, this.props.overlayStyles);
            var closeButtonStyle = Object.assign({}, _styles2.default.closeButtonStyle, this.props.closeButtonStyle);
            var titleStyle = Object.assign({}, _styles2.default.title, this.props.titleStyle);

            var displayStyle = this.props.isVisible ? 'block' : 'none';
            overlayStyles.display = dialogStyles.display = displayStyle;

            var overlay = undefined;
            if (this.props.showOverlay) {
                overlay = _react2.default.createElement('div', { className: 'skylight-overlay', onClick: this.onOverlayClicked.bind(this), style: overlayStyles });
            }

            return _react2.default.createElement(
                'section',
                { className: 'skylight-wrapper' },
                overlay,
                _react2.default.createElement(
                    'div',
                    { className: 'skylight-dialog', style: dialogStyles },
                    _react2.default.createElement(
                        'a',
                        { onClick: this.onCloseClicked.bind(this), role: 'button', style: closeButtonStyle },
                        '×'
                    ),
                    _react2.default.createElement(
                        'h2',
                        { style: titleStyle },
                        this.props.title
                    ),
                    this.props.children
                )
            );
        }
    }]);

    return SkylightStateless;
}(_react2.default.Component);

SkylightStateless.displayName = 'SkyLightStateless';

SkylightStateless.sharedPropTypes = {
    closeButtonStyle: _react2.default.PropTypes.object,
    dialogStyles: _react2.default.PropTypes.object,
    onCloseClicked: _react2.default.PropTypes.func,
    onOverlayClicked: _react2.default.PropTypes.func,
    overlayStyles: _react2.default.PropTypes.object,
    showOverlay: _react2.default.PropTypes.bool,
    title: _react2.default.PropTypes.string,
    titleStyle: _react2.default.PropTypes.object
};

SkylightStateless.propTypes = _extends({}, SkyLightStateless.sharedPropTypes, {
    isVisible: _react2.default.PropTypes.bool
});

SkylightStateless.defaultProps = {
    title: '',
    showOverlay: true,
    overlayStyles: _styles2.default.overlayStyles,
    dialogStyles: _styles2.default.dialogStyles,
    closeButtonStyle: _styles2.default.closeButtonStyle
};

exports.default = SkyLight;