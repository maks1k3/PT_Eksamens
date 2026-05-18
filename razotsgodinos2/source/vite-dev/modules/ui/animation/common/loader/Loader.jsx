import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./Loader.module.less";

const propTypes = {
  classNames: PropTypes.object,
  center: PropTypes.bool,
  pageCenter: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  classNames: {},
  center: true,
  pageCenter: false,
};

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { center, pageCenter, children } = this.props;

    const component = <div className={classNames["wrapper"]}>{children}</div>;

    if (pageCenter) {
      return <div className={classNames["page-center"]}>{component}</div>;
    } else if (center) {
      return <div className={classNames["center"]}>{component}</div>;
    }

    return component;
  }
}

Loader.propTypes = propTypes;

Loader.defaultProps = defaultProps;

export default Loader;
