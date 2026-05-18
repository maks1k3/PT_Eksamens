import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Loader from "ui/animation/common/loader";

import styles from "./ActivityIndicator.module.less";

const propTypes = {
  classNames: PropTypes.object,
  center: PropTypes.bool,
  pageCenter: PropTypes.bool,
  LoaderProps: PropTypes.object,
};

const defaultProps = {
  classNames: {},
};

class ActivityIndicator extends Component {
  constructor(props) {
    super(props);
  }

  renderLoader = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderLoader">
    return (
      <svg className={classNames["wrapper"]}>
        <circle className={classNames["circle"]} />
      </svg>
    );
    //</editor-fold>
  };

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { center, pageCenter, LoaderProps } = this.props;

    return (
      <Loader center={center} pageCenter={pageCenter} {...LoaderProps}>
        {this.renderLoader(classNames)}
      </Loader>
    );
  }
}

ActivityIndicator.propTypes = propTypes;

ActivityIndicator.defaultProps = defaultProps;

export default ActivityIndicator;
