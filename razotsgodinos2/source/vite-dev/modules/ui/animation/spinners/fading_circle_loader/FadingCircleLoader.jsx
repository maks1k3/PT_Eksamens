import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Loader from "ui/animation/common/loader";

import styles from "./FadingCircleLoader.module.less";

const propTypes = {
  classNames: PropTypes.object,
  center: PropTypes.bool,
  pageCenter: PropTypes.bool,
  LoaderProps: PropTypes.object,
};

const defaultProps = {
  classNames: {},
};

class FadingCircleLoader extends Component {
  constructor(props) {
    super(props);
  }

  renderLoader = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderLoader">
    return (
      <div className={classNames["wrapper"]}>
        <div className={classNames["circle1"]} />
        <div className={classNames["circle2"]} />
        <div className={classNames["circle3"]} />
        <div className={classNames["circle4"]} />
        <div className={classNames["circle5"]} />
        <div className={classNames["circle6"]} />
        <div className={classNames["circle7"]} />
        <div className={classNames["circle8"]} />
        <div className={classNames["circle9"]} />
        <div className={classNames["circle10"]} />
        <div className={classNames["circle11"]} />
        <div className={classNames["circle12"]} />
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

FadingCircleLoader.propTypes = propTypes;

FadingCircleLoader.defaultProps = defaultProps;

export default FadingCircleLoader;
