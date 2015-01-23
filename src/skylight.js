var React = require('react');

var SkyLight = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        showOverlay: React.PropTypes.bool,
        beforeShow: React.PropTypes.func,
        afterShow: React.PropTypes.func,
        beforeClose: React.PropTypes.func,
        afterClose: React.PropTypes.func,
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

        if(this.props.beforeShow) {
            this.props.beforeShow();
        }

        this.setState({ isVisible: true });

        if(this.props.afterShow) {
            this.props.afterShow();
        }
    },

    hide: function() {

        if(this.props.beforeClose) {
            this.props.beforeClose();
        }

        this.setState({ isVisible: false });

        if(this.props.afterClose) {
            this.props.afterClose();
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
