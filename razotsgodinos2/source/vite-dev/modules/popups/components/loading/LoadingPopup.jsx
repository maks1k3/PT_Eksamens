import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import Popup from "popups/components/ui/popup";
import Content from "popups/components/ui/content";
import ProgressBar from "ui/misc/progressbar";

import styles from "./LoadingPopup.module.less";

export const settings = {
  name: "loading",
  inUrl: false,
  level: 15,
  closeOnEsc: false,
};

const defaultSettings = {
  level: settings.level,
  verticalAlign: "middle",
  maxWidth: "400px",
  openAnimation: "",
  closeAnimation: "",
  PopupProps: {},
  //content
  ContentProps: {},
};

const propTypes = {
  data: PropTypes.object.isRequired,
  settings: PropTypes.object,
};

const defaultProps = {
  settings: {},
};

class LoadingPopup extends Component {
  constructor(props) {
    super(props);

    const message = _.get(
      this.props.data,
      "message",
      "Are you sure you don't want to wait?"
    );

    $(window).bind("beforeunload.loading_dialog", function () {
      return message;
    });
  }

  componentWillUnmount() {
    //<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
    $(window).unbind("beforeunload.loading_dialog");
    //</editor-fold>
  }

  render() {
    const classNames = _g.getClassNames(
      styles,
      _.get(this.props.data, "classNames", {})
    );
    const title = _.get(this.props.data, "title", "Loading...");
    const ProgressBarProps = _.get(this.props.data, "ProgressBarProps", {});

    const { settings } = this.props;
    const options = _.defaults(settings, defaultSettings);

    const { level, verticalAlign, maxWidth, PopupProps, ContentProps } =
      options;

    return (
      <Popup
        {...PopupProps}
        name={settings.name}
        level={level}
        verticalAlign={verticalAlign}
        hideOnOverlayClick={false}
        showCloseControl={false}
        contentWrapStyle={{
          maxWidth: maxWidth,
        }}
      >
        <Content
          {...ContentProps}
          classNames={{ wrapper: classNames["wrapper"] }}
        >
          <div className={classNames["title"]}>{title}</div>
          <ProgressBar {...ProgressBarProps} />
        </Content>
      </Popup>
    );
  }
}

LoadingPopup.propTypes = propTypes;

LoadingPopup.defaultProps = defaultProps;

export default LoadingPopup;
