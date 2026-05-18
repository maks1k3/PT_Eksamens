import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./Arrow.module.less";

const propTypes = {
  classNames: PropTypes.object,
  type: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  classNames: {},
};

class Arrow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { type, onClick } = this.props;

    if (type === "left") {
      return (
        <div
          className={`${classNames["wrapper"]} ${classNames["wrapper_left"]}`}
          onClick={onClick}
        />
      );
    } else {
      return (
        <div
          className={`${classNames["wrapper"]} ${classNames["wrapper_right"]}`}
          onClick={onClick}
        />
      );
    }
  }
}

Arrow.propTypes = propTypes;

Arrow.defaultProps = defaultProps;

export default Arrow;
