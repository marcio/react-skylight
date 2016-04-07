import React from 'react';
import styles from './styles';

const isOpening = (p1, p2) => !p1.isVisible && p2.isVisible;
const isClosing = (p1, p2) => p1.isVisible && !p2.isVisible;

class SkyLight extends React.Component {
  constructor(props){
      super(props);
  }

  componentWillUpdate(nextProps, nextState) {
      if (isOpening(this.props, nextProps) && this.props.beforeOpen) {
          this.props.beforeOpen();
      }

      if (isClosing(this.props, nextProps) && this.props.beforeClose) {
          this.props.beforeClose();
      }
  }

  componentDidUpdate(prevProps, prevState) {
      if (isOpening(prevProps, this.props) && this.props.afterOpen) {
          this.props.afterOpen();
      }

      if (isClosing(prevProps, this.props) && this.props.afterClose) {
          this.props.afterClose();
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
    const dialogStyles = Object.assign({}, styles.dialogStyles, this.props.dialogStyles);
    const overlayStyles = Object.assign({}, styles.overlayStyles, this.props.overlayStyles);
    const closeButtonStyle = Object.assign({}, styles.closeButtonStyle, this.props.closeButtonStyle);
    const titleStyle = Object.assign({}, styles.title, this.props.titleStyle);

    const displayStyle = this.props.isVisible ? 'block' : 'none';
    overlayStyles.display = dialogStyles.display = displayStyle;

    let overlay;
    if (this.props.showOverlay) {
        overlay = (<div className="skylight-overlay" onClick={() => this.onOverlayClicked()} style={overlayStyles}></div>);
    }

    return (
        <section className="skylight-wrapper">
            {overlay}
            <div className="skylight-dialog" style={dialogStyles}>
              <a onClick={() => this.onCloseClicked()} role="button" style={closeButtonStyle} >&times;</a>
              <h2 style={titleStyle}>{this.props.title}</h2>
              {this.props.children}
            </div>
        </section>
    );
  }
}

SkyLight.displayName = 'SkyLight';
SkyLight.propTypes = {
    afterClose: React.PropTypes.func,
    afterOpen: React.PropTypes.func,
    beforeClose: React.PropTypes.func,
    beforeOpen: React.PropTypes.func,
    closeButtonStyle: React.PropTypes.object,
    dialogStyles: React.PropTypes.object,
    hideOnOverlayClicked: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    onCloseClicked: React.PropTypes.func,
    onOverlayClicked: React.PropTypes.func,
    overlayStyles: React.PropTypes.object,
    showOverlay: React.PropTypes.bool,
    title: React.PropTypes.string,
    titleStyle: React.PropTypes.object
};

SkyLight.defaultProps = {
    title: '',
    showOverlay: true,
    overlayStyles: styles.overlayStyles,
    dialogStyles: styles.dialogStyles,
    closeButtonStyle: styles.closeButtonStyle,
    hideOnOverlayClicked: false
};

export default SkyLight;
