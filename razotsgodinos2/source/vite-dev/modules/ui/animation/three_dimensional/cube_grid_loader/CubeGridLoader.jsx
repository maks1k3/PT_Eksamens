import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Loader from "ui/animation/common/loader";

import styles from "./CubeGridLoader.module.less";

const propTypes = {
  classNames: PropTypes.object,
  center: PropTypes.bool,
  pageCenter: PropTypes.bool,
  LoaderProps: PropTypes.object,
};

const defaultProps = {
  classNames: {},
};

class CubeGridLoader extends Component {
  constructor(props) {
    super(props);
  }

  renderLoader = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderLoader">
    return (
      <div className={classNames["wrapper"]}>
        <div className={classNames["cube1"]} />
        <div className={classNames["cube2"]} />
        <div className={classNames["cube4"]} />
        <div className={classNames["cube3"]} />
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

CubeGridLoader.propTypes = propTypes;

CubeGridLoader.defaultProps = defaultProps;

export default CubeGridLoader;
