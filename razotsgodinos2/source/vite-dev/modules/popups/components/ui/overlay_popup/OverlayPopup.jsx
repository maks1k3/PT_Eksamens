import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import WithPopupContainerContext from "../../../WithPopupContainerContext";

import Icon from "ui/misc/icon";

import styles from "./OverlayPopup.module.less";

const propTypes = {
  classNames: PropTypes.object,
  name: PropTypes.string.isRequired, //popups name
  level: PropTypes.number, //popup level in hierarchy

  //close
  showCloseControl: PropTypes.bool, //x button to close popup
  onClose: PropTypes.func, //overrides default behaviour

  //ui
  renderPopup: PropTypes.func, //override popup rendering
  children: PropTypes.node, //children for render

  //animation
  openAnimation: PropTypes.string, //openAnimation className
  closeAnimation: PropTypes.string, //closeAnimation className

  //from WithPopupContainerContext
  popupContainerContext: PropTypes.object,
};

const defaultProps = {
  classNames: {},
  level: 0,
  showCloseControl: false,
  openAnimation: "",
  closeAnimation: "",
};

class OverlayPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCloseAnimation: false,
      hide: false,
    };
  }

  componentDidMount() {
    //<editor-fold defaultstate="collapsed" desc="componentDidMount">
    const { popupContainerContext } = this.props;

    if (!_.isNull(popupContainerContext)) {
      const { PopupContainer } = popupContainerContext;
      PopupContainer.register({ level: this.props.level, Popup: this });
    }
    //</editor-fold>
  }

  componentWillUnmount() {
    //<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
    const { popupContainerContext } = this.props;

    if (!_.isNull(popupContainerContext)) {
      const { PopupContainer } = popupContainerContext;
      PopupContainer.unregister({ level: this.props.level });
    }
    //</editor-fold>
  }

  onCloseClick = () => {
    //<editor-fold defaultstate="collapsed" desc="onCloseClick">
    const { name, level, onClose } = this.props;

    if (_.isFunction(onClose)) {
      onClose();
      return;
    }

    closePopup({ name, level });
    //</editor-fold>
  };

  closeAnimation = ({ key, name, level }, callback) => {
    //<editor-fold defaultstate="collapsed" desc="closeAnimation">
    this.closeAnimation = {
      key,
      name,
      level,
      callback,
    };

    this.setState({
      showCloseAnimation: true,
    });

    //</editor-fold>
  };

  onAnimationEnd = () => {
    //<editor-fold defaultstate="collapsed" desc="onAnimationEnd">
    const { showCloseAnimation } = this.state;

    if (showCloseAnimation) {
      this.setState({
        hide: true,
      });
      if (!_.isUndefined(this.closeAnimation)) {
        const { key, name, level, callback } = this.closeAnimation;
        callback({ key, name, level });
      }
    }
    //</editor-fold>
  };

  renderClose = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderClose">
    const { showCloseControl } = this.props;

    if (!showCloseControl) {
      return null;
    }

    return (
      <div title="Close" className={classNames["close-wrapper"]}>
        <Icon
          className={classNames["close"]}
          provider="mdi"
          name="window-close"
          onClick={this.onCloseClick}
        />
      </div>
    );
    //</editor-fold>
  };

  renderPopup = (zIndex, classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderPopup">
    const { renderPopup, openAnimation, closeAnimation, children } = this.props;

    const { showCloseAnimation } = this.state;

    const closeButton = this.renderClose(classNames);

    if (_.isFunction(renderPopup)) {
      return renderPopup({
        zIndex,
        classNames,
        children,
        closeButton,
        openAnimation,
        closeAnimation,
        showCloseAnimation,
        onAnimationEnd: this.onAnimationEnd,
        OverlayPopup: this,
      });
    }

    const className = _g.classNames(classNames["wrapper"], {
      [openAnimation]: !_g.isEmpty(openAnimation) && !showCloseAnimation,
      [closeAnimation]: !_g.isEmpty(closeAnimation) && showCloseAnimation,
    });

    return (
      <div
        className={className}
        style={{ zIndex: zIndex }}
        onAnimationEnd={this.onAnimationEnd}
      >
        {closeButton}
        {children}
      </div>
    );
    //</editor-fold>
  };

  render() {
    const { hide } = this.state;

    if (hide) {
      return null;
    }

    const { level } = this.props;
    let zIndex = 1000 + 100 * level;
    const classNames = _g.getClassNames(styles, this.props.classNames);

    return this.renderPopup(++zIndex, classNames);
  }
}

OverlayPopup.propTypes = propTypes;

OverlayPopup.defaultProps = defaultProps;

OverlayPopup = WithPopupContainerContext(OverlayPopup);

export default OverlayPopup;
