import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Link from "core/navigation/link";
import FileIcon from "ui/misc/file_icon";

import styles from "./FileLink.module.less";

const propTypes = {
  classNames: PropTypes.object,
  to: PropTypes.string,
  title: PropTypes.string,
  extension: PropTypes.string,

  LinkProps: PropTypes.object,
};

const defaultProps = {
  classNames: {},
};

class FileLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);

    const { to, title, extension, LinkProps } = this.props;

    return (
      <Link
        {...LinkProps}
        mode="navigation"
        to={to}
        classNames={{
          wrapper_main: classNames["wrapper"],
        }}
      >
        <FileIcon extension={extension} className={classNames["icon"]} />
        <span className={classNames["title"]}>{title}</span>
      </Link>
    );
  }
}

FileLink.propTypes = propTypes;

FileLink.defaultProps = defaultProps;

export default FileLink;
