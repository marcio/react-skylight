var React = require('react');
var styles = require('./styles');
var extend = require('util')._extend;

var SkyLight = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        showOverlay: React.PropTypes.bool,
        beforeOpen: React.PropTypes.func,
        afterOpen: React.PropTypes.func,
        beforeClose: React.PropTypes.func,
        afterClose: React.PropTypes.func,
        overlayStyles: React.PropTypes.object,
        dialogStyles: React.PropTypes.object,
        closeButtonStyle: React.PropTypes.object
    },
    getDefaultProps: function () {
        return {
            title: '',
            showOverlay: true,
            overlayStyles: styles.overlayStyles,
            dialogStyles: styles.dialogStyles,
            closeButtonStyle: styles.closeButtonStyle
        }
    },
    getInitialState: function () {
        return {
            isVisible: false
        };
    },
    show: function () {
        this.setState({isVisible: true});
    },
    hide: function () {
        this.setState({isVisible: false});
    },
    componentWillUpdate: function (nextProps, nextState) {
        if (nextState.isVisible && this.props.beforeOpen) {
            this.props.beforeOpen();
        }

        if (!nextState.isVisible && this.props.beforeClose) {
            this.props.beforeClose();
        }
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (!prevState.isVisible && this.props.afterOpen) {
            this.props.afterOpen();
        }

        if (prevState.isVisible && this.props.afterClose) {
            this.props.afterClose();
        }
    },
    render: function () {

        var overlay;

        var dialogStyles = extend(styles.dialogStyles, this.props.dialogStyles);
        var overlayStyles = extend(styles.overlayStyles, this.props.overlayStyles);
        var closeButtonStyle = extend(styles.closeButtonStyle = this.props.closeButtonStyle);

        if (this.state.isVisible) {
            overlayStyles.display = 'block';
            dialogStyles.display = 'block';
        } else {
            overlayStyles.display = 'none';
            dialogStyles.display = 'none';
        }

        if (this.props.showOverlay) {
            overlay = (<div style={overlayStyles}></div>);
        }

        return (
            <section className="skylight-wrapper">
                {overlay}
                <div style={dialogStyles}>
                    <a role="button" style={closeButtonStyle} onClick={this.hide}>&times;</a>
                    <h2>{this.props.title}</h2>
                    {this.props.children}
                </div>
            </section>
        )
    }
});

module.exports = SkyLight;
