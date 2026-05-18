import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import CircleLoader from "ui/animation/spinners/circle_loader";

import styles from "./OverlayLoading.module.less";

const propTypes = {
  classNames: PropTypes.object,
  loaderClassNames: PropTypes.object,
  Loader: PropTypes.func,
};

const defaultProps = {
  classNames: {},
  Loader: CircleLoader,
};

class OverlayLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);

    const { loaderClassNames, Loader } = this.props;

    return (
      <div className={classNames["wrapper"]}>
        <div className={classNames["overlay"]} />
        <div className={classNames["loader"]}>
          <Loader classNames={loaderClassNames} pageCenter={true} />
        </div>
      </div>
    );
  }
}

OverlayLoading.propTypes = propTypes;

OverlayLoading.defaultProps = defaultProps;

export default OverlayLoading;
