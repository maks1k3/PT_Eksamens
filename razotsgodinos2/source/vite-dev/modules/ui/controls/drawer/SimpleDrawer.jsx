import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./SimpleDrawer.module.less";

const propTypes = {
  content: PropTypes.node.isRequired,
};

const defaultProps = {};

const getInitialState = () => {
  return {
    open: false,
  };
};

class SimpleDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    //<editor-fold defaultstate="collapsed" desc="componentDidMount">
    ee.on(events.drawer.open, this.open);
    ee.on(events.drawer.close, this.close);
    //</editor-fold>
  }

  componentWillUnmount() {
    //<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
    ee.off(events.drawer.open, this.open);
    ee.off(events.drawer.close, this.close);
    //</editor-fold>
  }

  /* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

  open = () => {
    //<editor-fold defaultstate="collapsed" desc="open">
    this.setState({ open: true });
    //</editor-fold>
  };

  close = () => {
    //<editor-fold defaultstate="collapsed" desc="close">
    this.setState({ open: false });
    //</editor-fold>
  };

  render() {
    const { content } = this.props;
    const { open } = this.state;

    const drawerClassNames = _g.classNames(styles["drawer"], {
      [styles["drawer_opened"]]: open,
    });

    return (
      <div>
        <div className={drawerClassNames}>{content}</div>
        {open && <div className={styles["overlay"]} onClick={this.close} />}
      </div>
    );
  }
}

SimpleDrawer.propTypes = propTypes;

SimpleDrawer.defaultProps = defaultProps;

export default SimpleDrawer;
