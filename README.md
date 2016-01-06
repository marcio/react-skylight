react-skylight
==============

React-SkyLight is a simple react component for modals and dialogs, Powerful, lightweight, and unopinionated in design.


Installation
------------

```sh
npm install react-skylight
```

Features
--------

- Very simple modal/dialog
- Unopinionated in or design, (CSS is not included, only a template is suggested (see more below).
- Callback before open
- Callback after open
- Callback before close
- Callback after close


How to use
--------------------

```js

//Require react-skylight
var SkyLight = require('react-skylight');

var App = React.createClass({
  showDialogWithCallBacks: function(){
    this.refs.dialogWithCallBacks.show();
  },
  showSimpleDialog: function(){
    this.refs.simpleDialog.show();
  },
  render:function(){
    return (
      <div>
        <p>
          <button onClick={this.showSimpleDialog}>Modal without callbacks</button>
          <button onClick={this.showDialogWithCallBacks}>Modal with callbacks</button>
        </p>
        <SkyLight ref="dialogWithCallBacks" title="Hello!, I'm a modal with callbacks!"
                  beforeOpen={this._executeBeforeFirstModalOpen}
                  afterOpen={this._executeAfterFirstModalOpen}
                  beforeClose={this._executeBeforeFirstModalClose}
                  afterClose={this._executeAfterFirstModalClose}>I have callbacks!</SkyLight>
        <SkyLight ref="simpleDialog" title="Hi, I'm a simple modal">
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

ReactDOM.render(<App/>, document.getElementById("content"));

```



Options
-------------------

####title: (String)
A title for your modal.
``` html
<SkyLight ref="myModal" title="TITLE FOR MODAL">Modal Content</SkyLight>
```
####showOverlay: (Boolean)
Show modal with an overlay (true) or without an overlay (false).

``` html
<SkyLight ref="myModal" title="TITLE FOR MODAL" showOverlay={true}>Modal With Overlay</SkyLight>

<SkyLight ref="myModal" title="TITLE FOR MODAL" showOverlay={false}>Modal Without Overlay</SkyLight>
```

####beforeOpen, afterOpen, beforeClose and afterClose: (Function)
A callback functions to execute before and after open and before and after close a modal. You can use just the one you want.
``` html
<SkyLight ref="myModal" title="TITLE FOR MODAL"
            beforeOpen={myFunctionToExecuteBeforeOpen}
            afterOpen={myFunctionToExecuteAfterOpen}
            beforeClose={myFunctionToExecuteBeforeClose}
            afterClose={myFunctionToExecuteAfterClose}>Modal Content</SkyLight>
```

##New in 0.2.0 version

Overlay, dialog and closeButton styles now accept an object that represent your styles.

If you not declare any style, skyLight will apply the default styles, but if you send an object with one or more properties, your object will override the default property.

####overlayStyles: (Object)
An object that represent the styles of overlay:
```js
//Default overlay SkyLight styles:
overlayStyles: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.3)'
}
```

####dialogStyles: (Object)
An object that represent the styles of dialog.
```js
//Default dialog SkyLight styles:
dialogStyles: {
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
}
```

####closeButtonStyle: (Object)
An object that represent the styles of close button
```js
//Default close button SkyLight styles:
closeButtonStyle: {
    cursor: 'pointer',
    float: 'right',
    fontSize: '1.6em',
    margin: '-15px 0'
}
```

### An Example with new styles, overriding dialog background color to red


```js

var dialogStyles = {
    backgroundColor: '#f03'
};

<SkyLight ref="myModal" title="TITLE FOR MODAL" dialogStyles={dialogStyles}>Modal Content</SkyLight>
```


CSS
--------------------

External css is no more needed!

##Enjoy!



## Release History

 * 2015-02-03   v0.1.4   Changed skylight.js to skylight.jsx and adjust of namespace
