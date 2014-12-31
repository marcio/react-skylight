var React = require('react');

var SkyLight = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        width: React.PropTypes.string,
        height: React.PropTypes.string,
        showOverlay: React.PropTypes.bool,
        beforeShowCallback: React.PropTypes.func,
        onShowCallback: React.PropTypes.func
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

    render: function(){

        var overlay;
        if(this.state.props.showOverlay) {
            overlay = (<div className="sl-overlay"></div>);
        }

        return (
            <section className="skylight">
                {overlay}
                <div className="sl-modal">
                    <div className="sl-modal-close">&times;</div>
                    <h2 className="sl-modal-header">{this.props.title}</h2>
                    <div className="sl-modal-content">
                        {this.props.children}
                    </div>
                    <div className="sl-modal-footer"></div>
                </div>
            </section>
        )
    }
});

module.exports = SkyLight;
