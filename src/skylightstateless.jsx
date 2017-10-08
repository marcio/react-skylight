import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import assign from './utils/assign';

export default class SkyLightStateless extends React.Component {

  componentWillMount() {
    document.addEventListener("keydown", this._handlerEsc.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handlerEsc.bind(this));
  }

  _handlerEsc(evt) {
    var isEscape = false;
    if ("key" in evt) {
      isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
      isEscape = (evt.keyCode == 27);
    }
    if (isEscape && this.props.closeOnEsc && this.props.isVisible) {
      this.props.onCloseClicked();
    }
  }

  onOverlayClicked() {
    if (this.props.onOverlayClicked) {
      this.props.onOverlayClicked();
    }
  }

  onCloseClicked() {
    if (this.props.onCloseClicked) {
      this.props.onCloseClicked();
    }
  }

  render() {
    const mergeStyles = key => assign({}, styles[key], this.props[key]);
    const { isVisible } = this.props;
    const dialogStyles = mergeStyles('dialogStyles');
    const overlayStyles = mergeStyles('overlayStyles');
    const closeButtonStyle = mergeStyles('closeButtonStyle');
    const titleStyle = mergeStyles('titleStyle');
    
    let finalStyle;
    if(isVisible) {
      finalStyle = assign({}, dialogStyles, styles.animationOpen);
      overlayStyles.display = 'block';
    } else {
      finalStyle = assign({}, dialogStyles, styles.animationBase);
      overlayStyles.display = 'none';
    }
    
    finalStyle.transitionDuration = `${this.props.transitionDuration}ms`;
    overlayStyles.transitionDuration = `${this.props.transitionDuration}ms`;

    let overlay;
    if (this.props.showOverlay) {
      overlay = (
        <div className="skylight-overlay"
          onClick={() => this.onOverlayClicked()}
          style={overlayStyles}
        />
      );
    }

    let title;
    if(React.isValidElement(this.props.title)){
      title = this.props.title;
    } else {
      title = this.props.title ? <h2 style={titleStyle}>{this.props.title}</h2> : null;
    }

    return (
      <section className={`skylight-wrapper ${this.props.className}`}>
        {overlay}
        <div className="skylight-dialog" style={finalStyle}>
          <a 
            role="button" 
            className="skylight-close-button"
            onClick={() => this.onCloseClicked()}
            style={closeButtonStyle}
          >
            {this.props.closeButton || '\u00D7'}
          </a>
          {title}
            {this.props.children}
        </div>
      </section>
    );
    
  }
}

SkyLightStateless.displayName = 'SkyLightStateless';

SkyLightStateless.sharedPropTypes = {
  closeButtonStyle: PropTypes.object,
  dialogStyles: PropTypes.object,
  onCloseClicked: PropTypes.func,
  onOverlayClicked: PropTypes.func,
  overlayStyles: PropTypes.object,
  showOverlay: PropTypes.bool,
  title: PropTypes.any,
  transitionDuration: PropTypes.number,
  titleStyle: PropTypes.object,
  closeOnEsc: PropTypes.bool,
  className: PropTypes.string,
  closeButton: PropTypes.any,
};

SkyLightStateless.propTypes = {
  ...SkyLightStateless.sharedPropTypes,
  isVisible: PropTypes.bool,
};

SkyLightStateless.defaultProps = {
  title: '',
  showOverlay: true,
  overlayStyles: styles.overlayStyles,
  dialogStyles: styles.dialogStyles,
  closeButtonStyle: styles.closeButtonStyle,
  transitionDuration: 200,
  closeOnEsc: true,
  className: '',
};
