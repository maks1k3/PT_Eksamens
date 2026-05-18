import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./ProgressBar.module.less";

const propTypes = {
  classNames: PropTypes.object,
  percent: PropTypes.number,
  animate: PropTypes.bool,
  showPercent: PropTypes.bool,
  label: PropTypes.string,
  theme: PropTypes.oneOf([
    "main",
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "custom",
  ]),
};

const defaultProps = {
  classNames: {},
  percent: 100,
  animate: true,
  showPercent: false,
  theme: "primary",
};

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { showPercent, label, percent, animate, theme } = this.props;

    const className = _g.classNames(
      classNames["progressbar"],
      { [classNames["progressbar_animate"]]: animate },
      classNames[`progressbar_${theme}`]
    );

    return (
      <div className={classNames["wrapper"]}>
        <div className={className} style={{ width: percent + "%" }}>
          {label} {showPercent && percent + "%"}
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = propTypes;

ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
