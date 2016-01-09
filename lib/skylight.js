'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkyLight = (function (_React$Component) {
    _inherits(SkyLight, _React$Component);

    function SkyLight(props) {
        _classCallCheck(this, SkyLight);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SkyLight).call(this, props));

        _this.state = { isVisible: false };
        return _this;
    }

    _createClass(SkyLight, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (nextState.isVisible && !this.state.isVisible && this.props.beforeOpen) {
                this.props.beforeOpen();
            }

            if (!nextState.isVisible && this.state.isVisible && this.props.beforeClose) {
                this.props.beforeClose();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (!prevState.isVisible && this.state.isVisible && this.props.afterOpen) {
                this.props.afterOpen();
            }

            if (prevState.isVisible && !this.state.isVisible && this.props.afterClose) {
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
        key: 'onOverlayClicked',
        value: function onOverlayClicked() {
            if (this.props.hideOnOverlayClicked) {
                this.hide();
                if (this.props.onOverlayClicked) {
                    this.props.onOverlayClicked();
                }
            }

            if (this.props.onOverlayClicked) {
                this.props.onOverlayClicked();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var overlay;

            var dialogStyles = Object.assign({}, _styles2.default.dialogStyles, this.props.dialogStyles);
            var overlayStyles = Object.assign({}, _styles2.default.overlayStyles, this.props.overlayStyles);
            var closeButtonStyle = Object.assign({}, _styles2.default.closeButtonStyle, this.props.closeButtonStyle);
            var titleStyle = Object.assign({}, _styles2.default.title, this.props.titleStyle);

            if (this.state.isVisible) {
                overlayStyles.display = 'block';
                dialogStyles.display = 'block';
            } else {
                overlayStyles.display = 'none';
                dialogStyles.display = 'none';
            }

            if (this.props.showOverlay) {
                overlay = _react2.default.createElement('div', { onClick: function onClick() {
                        return _this2.onOverlayClicked();
                    }, style: overlayStyles });
            }

            return _react2.default.createElement(
                'section',
                { className: 'skylight-wrapper' },
                overlay,
                _react2.default.createElement(
                    'div',
                    { style: dialogStyles },
                    _react2.default.createElement(
                        'a',
                        { onClick: function onClick() {
                                return _this2.hide();
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
})(_react2.default.Component);

SkyLight.displayName = 'SkyLight';

SkyLight.propTypes = {
    afterClose: _react2.default.PropTypes.func,
    afterOpen: _react2.default.PropTypes.func,
    beforeClose: _react2.default.PropTypes.func,
    beforeOpen: _react2.default.PropTypes.func,
    closeButtonStyle: _react2.default.PropTypes.object,
    dialogStyles: _react2.default.PropTypes.object,
    hideOnOverlayClicked: _react2.default.PropTypes.bool,
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