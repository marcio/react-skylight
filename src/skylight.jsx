var React = require('react');

var overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'block'
};

var dialogStyles = {
    width: '50%',
    height: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-200px',
    marginLeft: '-25%',
    backgroundColor: '#fff',
    borderRadius: '2px',
    zIndex: 100,
    padding: '10px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
};

var closeButtonStyle = {
    cursor: 'pointer',
    float: 'right',
    fontSize: '1.6em',
    margin: '-15px 0'
};

var SkyLight = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        showOverlay: React.PropTypes.bool,
        beforeOpen: React.PropTypes.func,
        afterOpen: React.PropTypes.func,
        beforeClose: React.PropTypes.func,
        afterClose: React.PropTypes.func,
        styleWidth: React.PropTypes.string,
        styleHeight: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            title: '',
            showOverlay: true
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

        if (this.state.isVisible) {
            overlayStyles.display = 'block';
            dialogStyles.display = 'block';
        } else {
            overlayStyles.display = 'none';
            dialogStyles.display = 'none';
        }

        if (this.props.showOverlay) {
            overlay = (<div className="skylight-dialog__overlay"  style={overlayStyles}></div>);
        }

        return (
            <section className="skylight-wrapper">
                {overlay}
                <div className="skylight-dialog" style={dialogStyles}>
                    <a role="button" className="skylight-dialog--close" style={closeButtonStyle} onClick={this.hide}>&times;</a>
                    <h2>{this.props.title}</h2>
                    {this.props.children}
                </div>
            </section>
        )
    }
});

module.exports = SkyLight;
