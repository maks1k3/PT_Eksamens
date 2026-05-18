import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Loader from "ui/animation/common/loader";

import styles from "./ScaleLoader.module.less";

const propTypes = {
  classNames: PropTypes.object,
  center: PropTypes.bool,
  pageCenter: PropTypes.bool,
  LoaderProps: PropTypes.object,
};

const defaultProps = {
  classNames: {},
};

class ScaleLoader extends Component {
  constructor(props) {
    super(props);
  }

  renderLoader = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderLoader">
    return (
      <div className={classNames["wrapper"]}>
        <div className={classNames["rect1"]} />
        <div className={classNames["rect2"]} />
        <div className={classNames["rect3"]} />
        <div className={classNames["rect4"]} />
        <div className={classNames["rect5"]} />
      </div>
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

ScaleLoader.propTypes = propTypes;

ScaleLoader.defaultProps = defaultProps;

export default ScaleLoader;
