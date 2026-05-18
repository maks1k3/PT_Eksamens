import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./Card.module.less";

const propTypes = {
  classNames: PropTypes.object,
  withPadding: PropTypes.bool,

  children: PropTypes.node,
};

const defaultProps = {
  withPadding: true,
  classNames: {},
};

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);

    const { children, withPadding } = this.props;

    const className = _g.classNames(classNames["wrapper"], {
      [classNames["wrapper_padding"]]: withPadding,
    });

    return <div className={className}>{children}</div>;
  }
}

Card.propTypes = propTypes;

Card.defaultProps = defaultProps;

export default Card;
