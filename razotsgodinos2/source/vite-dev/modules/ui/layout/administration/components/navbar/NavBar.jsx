import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import WithBrowserDevice from "hoc/browser/with_browser_device";

import Header from "ui/common/header";
import Link from "core/navigation/link";
import Image from "ui/media/image";
import Icon from "ui/misc/icon";

import styles from "./NavBar.module.less";

const propTypes = {
  homePageLink: PropTypes.string.isRequired,
  homePageLinkMode: PropTypes.oneOf(["history", "navigation", "auto"]),
  backgroundColor: PropTypes.string.isRequired,
  title: PropTypes.string,
  logo: PropTypes.string,
  right: PropTypes.node,

  //from hoc
  browserDevice: PropTypes.string,
};

const defaultProps = {};

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  /* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

  onDrawerControlClick = () => {
    //<editor-fold defaultstate="collapsed" desc="onDrawerControlClick">
    ee.trigger(events.drawer.open);
    //</editor-fold>
  };

  /* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

  renderLogo = () => {
    //<editor-fold defaultstate="collapsed" desc="renderLogo">
    const { logo } = this.props;

    if (_g.isEmpty(logo)) {
      return null;
    }

    return (
      <div className={styles["logo-wrapper"]}>
        <Image className={styles["logo"]} src={logo} />
      </div>
    );
    //</editor-fold>
  };

  renderTitle = () => {
    //<editor-fold defaultstate="collapsed" desc="renderTitle">
    const { title } = this.props;

    if (_g.isEmpty(title)) {
      return null;
    }

    return (
      <div className={styles["title-wrapper"]}>
        <span className={styles["title"]}>{title}</span>
      </div>
    );
    //</editor-fold>
  };

  renderDrawerControl = () => {
    //<editor-fold defaultstate="collapsed" desc="renderTitle">

    return (
      <div
        className={styles["drawer-control-wrapper"]}
        onClick={this.onDrawerControlClick}
      >
        <Icon className={styles["drawer-control"]} provider="fa" name="bars" />
      </div>
    );
    //</editor-fold>
  };

  renderLeft = () => {
    //<editor-fold defaultstate="collapsed" desc="renderLeft">
    const { browserDevice, homePageLink, homePageLinkMode } = this.props;

    if (browserDevice != "desktop") {
      return (
        <div
          className={`${styles["vertical-center"]} ${styles["padding-left"]}`}
        >
          {this.renderDrawerControl()}
        </div>
      );
    } else {
      return (
        <div
          className={`${styles["vertical-center"]} ${styles["padding-left"]}`}
        >
          <Link to={homePageLink} mode={homePageLinkMode}>
            <div className={styles["logo-and-title-wrapper"]}>
              {this.renderLogo()}
              {this.renderTitle()}
            </div>
          </Link>
        </div>
      );
    }
    //</editor-fold>
  };

  renderCenter = () => {
    //<editor-fold defaultstate="collapsed" desc="renderCenter">
    const { browserDevice, homePageLink, homePageLinkMode } = this.props;

    if (browserDevice != "desktop") {
      return (
        <div className={styles["vertical-center"]}>
          <Link to={homePageLink} mode={homePageLinkMode}>
            {this.renderTitle()}
          </Link>
        </div>
      );
    }
    return null;
    //</editor-fold>
  };

  renderRight = () => {
    //<editor-fold defaultstate="collapsed" desc="renderRight">
    const { browserDevice, right } = this.props;

    if (browserDevice === "desktop") {
      return right;
    }
    return null;
    //</editor-fold>
  };

  render() {
    const { backgroundColor, browserDevice } = this.props;

    return (
      <Header
        backgroundColor={backgroundColor}
        height={50}
        fixed={true}
        left={this.renderLeft()}
        center={this.renderCenter()}
        right={this.renderRight()}
        applyMarginRightWhenPopupIsOpened={browserDevice === "desktop"}
      />
    );
  }
}

NavBar.propTypes = propTypes;

NavBar.defaultProps = defaultProps;

NavBar = WithBrowserDevice(NavBar);

export default NavBar;
