import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./Container.module.less";

const propTypes = {
  classNames: PropTypes.object,
  children: PropTypes.node,
};

const defaultProps = {};

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { children } = this.props;

    return <div className={classNames["wrapper"]}>{children}</div>;
  }
}

Container.propTypes = propTypes;

Container.defaultProps = defaultProps;

export default Container;
