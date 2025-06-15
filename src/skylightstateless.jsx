import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles';

export default class SkyLightStateless extends React.Component {

  constructor(props) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
    this.portalNode = document.createElement('div');
    this.titleId = `skylight-title-${Math.random().toString(36).substr(2, 9)}`;
  }

  componentDidMount() {
    document.body.appendChild(this.portalNode);
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
    document.body.removeChild(this.portalNode);
  }

  handleEsc(evt) {
    if (evt.key === 'Escape' && this.props.closeOnEsc && this.props.isVisible) {
      if (this.props.onCloseClicked) {
        this.props.onCloseClicked();
      }
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
    const mergeStyles = key => ({ ...styles[key], ...this.props[key] });
    const { isVisible } = this.props;
    const dialogStyles = mergeStyles('dialogStyles');
    const overlayStyles = mergeStyles('overlayStyles');
    const closeButtonStyle = mergeStyles('closeButtonStyle');
    const titleStyle = mergeStyles('titleStyle');
    
    let finalStyle;
    if (isVisible) {
      finalStyle = { ...dialogStyles, ...styles.animationOpen };
      overlayStyles.display = 'block';
    } else {
      finalStyle = { ...dialogStyles, ...styles.animationBase };
      overlayStyles.display = 'none';
    }
    
    finalStyle.transitionDuration = `${this.props.transitionDuration}ms`;
    overlayStyles.transitionDuration = `${this.props.transitionDuration}ms`;

    let overlay;
    if (this.props.showOverlay) {
      overlay = (
        <div
          className="skylight-overlay"
          onClick={() => this.onOverlayClicked()}
          style={overlayStyles}
        />
      );
    }

    let title;
    if (React.isValidElement(this.props.title)) {
      title = this.props.title;
    } else {
      title = this.props.title ? (
        <h2 id={this.titleId} style={titleStyle}>{this.props.title}</h2>
      ) : null;
    }

    const content = (
      <section className={`skylight-wrapper ${this.props.className}`}>
        {overlay}
        <div
          role="dialog"
          aria-labelledby={this.props.title ? this.titleId : undefined}
          className="skylight-dialog"
          style={finalStyle}
        >
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

    return ReactDOM.createPortal(content, this.portalNode);
    
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
