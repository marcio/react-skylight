react-skylight
==============

A react component for modals and dialogs

## WIP.... This project still in development, use only if you know what you're doing or if you want help in development.


Installation
------------

```sh
npm install react-skylight
```


Features
--------

- Very simple modal/dialog
- Unopinionated in or design, (CSS is not included, only a template is suggested (see more below).
- Callback on show
- Callback on hide




How to use
--------------------

```js

var SkyLight = require('react-skylight').SkyLight;

var Veiculos = React.createClass({
    showFirstDialog: function(){
        this.refs.fisrtDialog.show();
    },
    showSecondDialog: function(){
        this.refs.secondDialog.show();
    },
    render:function(){
        return (
            <div>
                <a role="button" onClick={this.showFirstDialog}>Open First</a>
                <br />
                <a role="button" onClick={this.showSecondDialog}>Open Second</a>
                <SkyLight ref="fisrtDialog" title="My first dialog">
                    Content for first dialog here.
                </SkyLight>
                <SkyLight ref="secondDialog" title="My second dialog">
                    Content for second dialog here.
                </SkyLight>
            </div>
        )
    }
});
```



CSS suggested
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

TODO
--------------------

Tests

Better Documentation

More callbacks options

More CSS Themes

Site with examples

...
