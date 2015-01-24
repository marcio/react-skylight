var SkyLight = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    showOverlay: React.PropTypes.bool,
    beforeOpen: React.PropTypes.func,
    afterOpen: React.PropTypes.func,
    beforeClose: React.PropTypes.func,
    afterClose: React.PropTypes.func,
    visible: React.PropTypes.bool
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
    var displayStyle = this.state.isVisible ? {display: 'block'} : {display: 'none'};

    if (this.props.showOverlay) {
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


var App = React.createClass({
  showFirstDialog: function(){
    this.refs.fisrtDialog.show();
  },
  showSecondDialog: function(){
    this.refs.secondDialog.show();
  },
  render:function(){
    return (
      <div>
        <p className="center">
          <button onClick={this.showSecondDialog}>Modal without callbacks</button>
          <button onClick={this.showFirstDialog}>Modal with callbacks</button>
        </p>
        <SkyLight ref="fisrtDialog" title="Hello!, I'm a modal with callbacks!"
                  beforeOpen={this._executeBeforeFirstModalOpen}
                  afterOpen={this._executeAfterFirstModalOpen}
                  beforeClose={this._executeBeforeFirstModalClose}
                  afterClose={this._executeAfterFirstModalClose}
        >
          I've callbacks!
        </SkyLight>
        <SkyLight ref="secondDialog" title="Hi, I'm a simple modal">
          Hello, I dont have any callback.
        </SkyLight>
      </div>
    )
  },
  _executeBeforeFirstModalOpen: function(){
    alert('Executed before open');
  },
  _executeAfterFirstModalOpen: function(){
    alert('Executed after open');
  },
  _executeBeforeFirstModalClose: function(){
    alert('Executed before close');
  },
  _executeAfterFirstModalClose: function(){
    alert('Executed after close');
  }
});

React.render(<App/>, document.getElementById("content"));
