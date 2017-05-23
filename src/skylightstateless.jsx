import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import assign from './utils/assign';

export default class SkyLightStateless extends React.Component {

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
    overlayStyles.display = dialogStyles.display = 'block';

    let overlay;
    if (this.props.showOverlay) {
      overlay = (
        <div className="skylight-overlay"
          onClick={() => this.onOverlayClicked()}
          style={overlayStyles}
        />
      );
    }

    return isVisible ? (
        <section className="skylight-wrapper">
            {overlay}
            <div className="skylight-dialog" style={dialogStyles}>
              <a role="button" className="skylight-close-button"
                onClick={() => this.onCloseClicked()}
                style={closeButtonStyle}
              >
                &times;
               </a>
              <h2 style={titleStyle}>{this.props.title}</h2>
              {this.props.children}
            </div>
        </section>
    ) : <div />;
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
  title: PropTypes.string,
  titleStyle: PropTypes.object,
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
};
