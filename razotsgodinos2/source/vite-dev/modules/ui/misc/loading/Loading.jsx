import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import CircleLoader from "ui/animation/spinners/circle_loader";

import styles from "./Loading.module.less";

const propTypes = {
  classNames: PropTypes.object,
  loaderClassNames: PropTypes.object,
  Loader: PropTypes.func,
};

const defaultProps = {
  classNames: {},
  Loader: CircleLoader,
};

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);

    const { loaderClassNames, Loader } = this.props;

    return (
      <div className={classNames["wrapper"]}>
        <Loader classNames={loaderClassNames} pageCenter={true} />
      </div>
    );
  }
}

Loading.propTypes = propTypes;

Loading.defaultProps = defaultProps;

export default Loading;
