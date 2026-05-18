import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./LoadingPlaceholder.module.less";

const propTypes = {
  classNames: PropTypes.object,
  type: PropTypes.oneOf(["post", "rows", "image-rows"]),
  renderCustomMaskers: PropTypes.func,
};

const defaultProps = {
  classNames: {},
  type: "image-rows",
};

class LoadingPlaceholder extends Component {
  constructor(props) {
    super(props);
  }

  renderMaskers = () => {
    //<editor-fold defaultstate="collapsed" desc="renderMaskers">
    const { type, renderCustomMaskers } = this.props;

    if (_.isFunction(renderCustomMaskers)) {
      return renderCustomMaskers({
        classNames: this.classNames,
        LoadingPlaceholder: this,
      });
    }

    if (type === "image-rows") {
      return (
        <div className={this.classNames["image-rows"]}>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["line-1"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["line-1-start"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["line-2"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["line-2-start"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["line-2-end"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["line-3"]}`}
          ></div>
        </div>
      );
    } else if (type === "rows") {
      return (
        <div className={this.classNames["rows"]}>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["end-first-line"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["divider-1"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["end-second-line"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["divider-2"]}`}
          ></div>
          <div
            className={`${this.classNames["background-masker"]} ${this.classNames["end-third-line"]}`}
          ></div>
        </div>
      );
    }

    return (
      <div className={this.classNames["post"]}>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["header-top"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["header-left"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["header-right"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["header-bottom"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["subheader-left"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["subheader-right"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["subheader-bottom"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["content-top"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["content-first-end"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["content-second-line"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["content-second-end"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["content-third-line"]}`}
        ></div>
        <div
          className={`${this.classNames["background-masker"]} ${this.classNames["content-third-end"]}`}
        ></div>
      </div>
    );
    //</editor-fold>
  };

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    this.classNames = classNames;

    const { type } = this.props;

    const className = _g.classNames(
      this.classNames["wrapper"],
      {
        [this.classNames["wrapper_small"]]: _g.inArray(type, [
          "rows",
          "image-rows",
        ]),
      },
      { [this.classNames["wrapper_big"]]: type === "post" }
    );

    return (
      <div className={className}>
        <div className={this.classNames["animated-background"]}>
          {this.renderMaskers()}
        </div>
      </div>
    );
  }
}

LoadingPlaceholder.propTypes = propTypes;

LoadingPlaceholder.defaultProps = defaultProps;

export default LoadingPlaceholder;
