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

React.render(<App/>, document.getElementById("content"));

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



CSS (suggested)
--------------------

```css
.skylight-dialog {
    width: 50%;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -25%;
    background-color: #fff;
    border-radius: 2px;
    z-index: 100;
    padding: 10px;
    box-shadow: 0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28);
}

.skylight-dialog--close {
    cursor: pointer;
    float: right;
    font-size: 1.6em;
}

.skylight-dialog__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0,0,0,0.3);
}
```

##Enjoy!



## Release History

 * 2015-02-03   v0.1.4   Changed skylight.js to skylight.jsx and adjust of namespace