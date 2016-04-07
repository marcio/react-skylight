'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isOpening = function isOpening(p1, p2) {
    return !p1.isVisible && p2.isVisible;
};
var isClosing = function isClosing(p1, p2) {
    return p1.isVisible && !p2.isVisible;
};

var SkyLight = function (_React$Component) {
    _inherits(SkyLight, _React$Component);

    function SkyLight(props) {
        _classCallCheck(this, SkyLight);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SkyLight).call(this, props));
    }

    _createClass(SkyLight, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (isOpening(this.props, nextProps) && this.props.beforeOpen) {
                this.props.beforeOpen();
            }

            if (isClosing(this.props, nextProps) && this.props.beforeClose) {
                this.props.beforeClose();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (isOpening(prevProps, this.props) && this.props.afterOpen) {
                this.props.afterOpen();
            }

            if (isClosing(prevProps, this.props) && this.props.afterClose) {
                this.props.afterClose();
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

            var dialogStyles = Object.assign({}, _styles2.default.dialogStyles, this.props.dialogStyles);
            var overlayStyles = Object.assign({}, _styles2.default.overlayStyles, this.props.overlayStyles);
            var closeButtonStyle = Object.assign({}, _styles2.default.closeButtonStyle, this.props.closeButtonStyle);
            var titleStyle = Object.assign({}, _styles2.default.title, this.props.titleStyle);

            var displayStyle = this.props.isVisible ? 'block' : 'none';
            overlayStyles.display = dialogStyles.display = displayStyle;

            var overlay = undefined;
            if (this.props.showOverlay) {
                overlay = _react2.default.createElement('div', { className: 'skylight-overlay', onClick: function onClick() {
                        return _this2.onOverlayClicked();
                    }, style: overlayStyles });
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
                        { onClick: function onClick() {
                                return _this2.onCloseClicked();
                            }, role: 'button', style: closeButtonStyle },
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

    return SkyLight;
}(_react2.default.Component);

SkyLight.displayName = 'SkyLight';
SkyLight.propTypes = {
    afterClose: _react2.default.PropTypes.func,
    afterOpen: _react2.default.PropTypes.func,
    beforeClose: _react2.default.PropTypes.func,
    beforeOpen: _react2.default.PropTypes.func,
    closeButtonStyle: _react2.default.PropTypes.object,
    dialogStyles: _react2.default.PropTypes.object,
    hideOnOverlayClicked: _react2.default.PropTypes.bool,
    isVisible: _react2.default.PropTypes.bool,
    onCloseClicked: _react2.default.PropTypes.func,
    onOverlayClicked: _react2.default.PropTypes.func,
    overlayStyles: _react2.default.PropTypes.object,
    showOverlay: _react2.default.PropTypes.bool,
    title: _react2.default.PropTypes.string,
    titleStyle: _react2.default.PropTypes.object
};

SkyLight.defaultProps = {
    title: '',
    showOverlay: true,
    overlayStyles: _styles2.default.overlayStyles,
    dialogStyles: _styles2.default.dialogStyles,
    closeButtonStyle: _styles2.default.closeButtonStyle,
    hideOnOverlayClicked: false
};

exports.default = SkyLight;