import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";
import styles from "./Video.module.less";

const propTypes = {
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  provider: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  autoPlay: false,
  provider: "custom",
};

class Video extends Component {
  constructor(props) {
    super(props);
  }

  /* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

  getPlayer = () => {
    //<editor-fold defaultstate="collapsed" desc="getPlayer">
    const { src } = this.props;
    const params = this.getParams();
    let result = src;
    if (params.length > 0) {
      if (src.indexOf("?") > -1) {
        result += "&" + params;
      } else {
        result += "?" + params;
      }
    }
    return result;
    //</editor-fold>
  };

  getParams = () => {
    //<editor-fold defaultstate="collapsed" desc="getParams">
    const { provider, autoPlay } = this.props;

    let params = "";

    if (provider === "youtube") {
      params += "iv_load_policy=3&rel=0";
      if (autoPlay) {
        params += "&autoplay=1";
      }
    } else if (provider === "coub") {
      params += "muted=false&startWithHD=true";
      if (autoPlay) {
        params += "&autostart=true";
      }
    } else if (provider === "vimeo") {
      params += "quality=1080p";
      if (autoPlay) {
        params += "&autoplay=1";
      }
    } else if (provider === "rutube") {
      params += "";
      if (autoPlay) {
        params += "&autoStart=1";
      }
    } else {
      params += "";
      if (autoPlay) {
        params += "&autoplay=1";
      }
    }
    return params;
    //</editor-fold>
  };

  render() {
    const src = this.getPlayer();
    const { style } = this.props;
    return (
      <div className={styles.wrapper}>
        <iframe
          className={styles.item}
          style={style}
          key={src}
          src={src}
          frameBorder="0"
          allowFullScreen={true}
        />
      </div>
    );
  }
}

Video.propTypes = propTypes;

Video.defaultProps = defaultProps;

export default Video;
