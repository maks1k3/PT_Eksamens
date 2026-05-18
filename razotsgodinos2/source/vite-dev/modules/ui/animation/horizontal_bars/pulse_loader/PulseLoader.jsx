import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Loader from "ui/animation/common/loader";

import styles from "./PulseLoader.module.less";

const propTypes = {
  classNames: PropTypes.object,
  center: PropTypes.bool,
  pageCenter: PropTypes.bool,
  LoaderProps: PropTypes.object,
};

const defaultProps = {
  classNames: {},
};

class PulseLoader extends Component {
  constructor(props) {
    super(props);
  }

  renderLoader = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderLoader">
    return (
      <div className={classNames["wrapper"]}>
        <div className={classNames["ball1"]} />
        <div className={classNames["ball2"]} />
        <div className={classNames["ball3"]} />
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

PulseLoader.propTypes = propTypes;

PulseLoader.defaultProps = defaultProps;

export default PulseLoader;
