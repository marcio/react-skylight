var React = require('react');

var SkyLight = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        showOverlay: React.PropTypes.bool,
        onShow: React.PropTypes.func,
        onClose: React.PropTypes.func,
        visible: React.PropTypes.bool
    },


    getDefaultProps: function() {
        return {
            title: '',
            showOverlay: true
        }
    },

    getInitialState: function(){
      return {
          isVisible: false
      };
    },

    show: function() {
        this.setState({ isVisible: true });
        if(this.props.onShow) {
            this.props.onShow();
        }
    },

    hide: function() {
        this.setState({ isVisible: false });
        if(this.props.onClose) {
            this.props.onClose();
        }
    },

    render: function(){

        var overlay;
        var displayStyle = this.state.isVisible ? {display: 'block'} : {display: 'none'};

        if(this.props.showOverlay) {
            overlay = (<div className="skylight-dialog__overlay" style={displayStyle}></div>);
        }

        return (
            <section className="skylight-wrapper">
                {overlay}
                <div className="skylight-dialog" style={displayStyle}>
                    <a role="button" className="skylight-dialog--close" onClick={this.hide}>&times;</a>
                    <h2>{this.props.title}</h2>
                    {this.props.children}
                </div>
            </section>
        )
    }
});

module.exports = SkyLight;
