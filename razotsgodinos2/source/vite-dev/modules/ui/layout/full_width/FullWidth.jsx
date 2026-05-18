import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Responsive from "hoc/responsive";

import styles from "./FullWidth.module.less";

const propTypes = {
  classNames: PropTypes.object,
  height: PropTypes.string,
  children: PropTypes.node,
  //from hoc
  browserWindowWidth: PropTypes.number,
};

const defaultProps = {
  height: "400px",
};

class FullWidth extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    //<editor-fold defaultstate="collapsed" desc="componentDidMount">
    this.setState({
      mounted: true,
    });
    //</editor-fold>
  }

  renderInner = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderInner">
    const { mounted } = this.state;

    if (!mounted) {
      return null;
    }

    const { height, children, browserWindowWidth } = this.props;

    const offset = $(this.container.current).offset().left;

    const style = {
      height: height,
      width: browserWindowWidth + "px",
      left: -offset + "px",
    };

    return (
      <div className={classNames["inner"]} style={style}>
        {children}
      </div>
    );
    //</editor-fold>
  };

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { height } = this.props;

    const style = {
      height: height,
    };

    return (
      <div ref={this.container} className={classNames["wrapper"]} style={style}>
        {this.renderInner(classNames)}
      </div>
    );
  }
}

FullWidth.propTypes = propTypes;

FullWidth.defaultProps = defaultProps;

FullWidth = Responsive()(FullWidth);

export default FullWidth;
