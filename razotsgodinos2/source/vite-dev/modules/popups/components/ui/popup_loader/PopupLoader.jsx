import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import BeatLoader from "ui/animation/horizontal_bars/beat_loader";
import loaderStyles from "./BeatLoader.module.less";

import styles from "./PopupLoader.module.less";

const propTypes = {
  classNames: PropTypes.object,
};

const defaultProps = {
  classNames: {},
};

class PopupLoader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);

    return (
      <div className={classNames["wrapper"]}>
        <BeatLoader classNames={loaderStyles} pageCenter={true} />
      </div>
    );
  }
}

PopupLoader.propTypes = propTypes;

PopupLoader.defaultProps = defaultProps;

export default PopupLoader;
