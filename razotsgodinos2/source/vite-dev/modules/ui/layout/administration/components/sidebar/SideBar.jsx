import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import ScrollView from "ui/common/scrollview";

import styles from "./SideBar.module.less";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      height: this.getSidebarHeight(),
    };
  }

  componentDidMount() {
    //<editor-fold defaultstate="collapsed" desc="componentDidMount">
    this.mounted = true;
    ee.on(events.browserWindow.resize, this.onResize);
    //</editor-fold>
  }

  componentWillUnmount() {
    //<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
    this.mounted = false;
    ee.off(events.browserWindow.resize, this.onResize);
    //</editor-fold>
  }

  onResize = () => {
    //<editor-fold defaultstate="collapsed" desc="onResize">
    this.updateHeight();
    //</editor-fold>
  };

  getSidebarHeight = () => {
    //<editor-fold defaultstate="collapsed" desc="getSidebarHeight">
    let view_port_height = browser_window.getDimensions().viewport.height;
    let padding = 40;
    let nav_bar = 50;
    return view_port_height - padding - nav_bar;
    //</editor-fold>
  };

  updateHeight = () => {
    //<editor-fold defaultstate="collapsed" desc="updateHeight">
    if (!this.mounted) {
      return;
    }

    this.setState({
      height: this.getSidebarHeight(),
    });
    //</editor-fold>
  };

  render() {
    const { children } = this.props;
    const { height } = this.state;

    return (
      <div className={styles["wrapper"]}>
        <ScrollView autoHide={true} width={260} height={height} isolated={true}>
          <div className={styles["content"]}>{children}</div>
        </ScrollView>
      </div>
    );
  }
}

SideBar.propTypes = propTypes;

SideBar.defaultProps = defaultProps;

export default SideBar;
