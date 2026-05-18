import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import styles from "./Switch.module.less";

const propTypes = {
  classNames: PropTypes.object,
  theme: PropTypes.oneOf([
    "main",
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "custom",
  ]),
  value: PropTypes.any, //'0' or '1'
  label: PropTypes.any,
  valueId: PropTypes.any,
  controlled: PropTypes.bool,

  //renderers
  render: PropTypes.func,
  renderControls: PropTypes.func,
  renderLabel: PropTypes.func,
  renderThumb: PropTypes.func,

  //settings
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,

  //callbacks
  onChange: PropTypes.func,
  onFocus: PropTypes.func, //onFocus
  onBlur: PropTypes.func, //onBlur
  //from Field
  FieldInstance: PropTypes.object,
};

const defaultProps = {
  classNames: {},
  theme: "main",
  controlled: false,
  disabled: false,
  readonly: false,
};

class Switch extends Component {
  constructor(props) {
    super(props);
    const value = _.get(this.props, "value", "");
    this.value = this.formatValue(value);
    this.state = {
      focused: false,
      value: this.formatValue(value),
    };
  }

  componentDidMount() {
    //<editor-fold defaultstate="collapsed" desc="componentDidMount">
    ee.on(events.keydown.space, this.onKeySpaceDown);

    const { FieldInstance } = this.props;

    if (!_.isUndefined(FieldInstance)) {
      FieldInstance.register({ input: this });
    }
    //</editor-fold>
  }

  componentDidUpdate(prevProps) {
    //<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
    if (prevProps.value !== this.props.value) {
      if (this.value !== this.props.value) {
        this.setValue(this.props.value);
      }
    }

    if (prevProps.valueId !== this.props.valueId) {
      this.setValue(this.props.value);
    }
    //</editor-fold>
  }

  componentWillUnmount() {
    //<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
    ee.off(events.keydown.space, this.onKeySpaceDown);
    //</editor-fold>
  }

  /* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

  focus = () => {
    //<editor-fold defaultstate="collapsed" desc="focus">
    this.setState({
      focused: true,
    });
    //</editor-fold>
  };

  setValue = (value) => {
    //<editor-fold defaultstate="collapsed" desc="setValue">
    value = this.formatValue(value);
    this.value = value;

    this.setState({
      value: value,
    });
    //</editor-fold>
  };

  getValue = () => {
    //<editor-fold defaultstate="collapsed" desc="getValue">
    return this.value;
    //</editor-fold>
  };

  formatValue = (value) => {
    //<editor-fold defaultstate="collapsed" desc="formatValue">
    if (_g.inArray(value, [1, "1", true])) {
      value = "1";
    } else {
      value = "0";
    }

    return value;
    //</editor-fold>
  };

  /* ========================================================================*
   *
   *                     Callbacks
   *
   * ========================================================================*/

  onKeySpaceDown = ({ event }) => {
    //<editor-fold defaultstate="collapsed" desc="onKeySpaceDown">
    const { focused } = this.state;

    if (focused) {
      event.preventDefault();
      this.onChange();
    }
    //</editor-fold>
  };

  onChange = () => {
    //<editor-fold defaultstate="collapsed" desc="onChange">
    const { onChange, controlled, readonly, disabled } = this.props;

    if (readonly || disabled) {
      return;
    }

    const newValue = this.value === "1" ? "0" : "1";

    if (!controlled) {
      this.setValue(newValue);
    }

    if (_.isFunction(onChange)) {
      onChange({ value: newValue, Switch: this });
    }

    //</editor-fold>
  };

  onFocus = (e) => {
    //<editor-fold defaultstate="collapsed" desc="onFocus">
    this.setState({
      focused: true,
    });

    const { onFocus } = this.props;

    if (_.isFunction(onFocus)) {
      onFocus({ value: this.getValue(), event: e, Switch: this });
    }
    //</editor-fold>
  };

  onBlur = (e) => {
    //<editor-fold defaultstate="collapsed" desc="onBlur">
    this.setState({
      focused: false,
    });

    const { onBlur } = this.props;

    if (_.isFunction(onBlur)) {
      onBlur({ value: this.getValue(), event: e, Switch: this });
    }
    //</editor-fold>
  };

  /* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

  renderThumb = () => {
    //<editor-fold defaultstate="collapsed" desc="renderThumb">
    const { value } = this.state;
    const { theme, renderThumb } = this.props;
    const classNames = _g.getClassNames(styles, this.props.classNames);

    const thumb = _g.classNames(classNames["thumb"], {
      [classNames["thumb_active"]]: _.toInteger(value),
      [classNames[`thumb_${theme}_active`]]: _.toInteger(value),
    });
    if (_.isFunction(renderThumb)) {
      return renderThumb({
        className: thumb,
      });
    }
    return <div className={thumb} />;
    //</editor-fold>
  };

  renderLabel = () => {
    //<editor-fold defaultstate="collapsed" desc="renderLabel">
    const { label, renderLabel } = this.props;
    const classNames = _g.getClassNames(styles, this.props.classNames);

    if (_.isFunction(renderLabel)) {
      return renderLabel({
        onClick: this.onChange,
        className: classNames["label"],
        label: label,
        Switch: this,
      });
    }

    return (
      <div onClick={this.onChange} className={classNames["label"]}>
        {label}
      </div>
    );
    //</editor-fold>
  };

  renderControls = () => {
    //<editor-fold defaultstate="collapsed" desc="renderControls">
    const { value, focused } = this.state;
    const { theme, renderControls } = this.props;
    const classNames = _g.getClassNames(styles, this.props.classNames);

    const track = _g.classNames(classNames["track"], {
      [classNames[`track_${theme}_active`]]: _.toInteger(value),
      [classNames["track_focused"]]: focused,
    });

    if (_.isFunction(renderControls)) {
      return renderControls({
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onClick: this.onChange,
        thumb: this.renderThumb(),
        className: track,
        value: value,
        Switch: this,
      });
    }

    return (
      <div
        tabIndex={0}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.onChange}
        className={track}
      >
        {this.renderThumb()}
      </div>
    );
    //</editor-fold>
  };

  render() {
    const { render, disabled } = this.props;
    const classNames = _g.getClassNames(styles, this.props.classNames);

    const wrapper = _g.classNames(classNames["wrapper"], {
      [classNames["wrapper_disabled"]]: disabled,
    });

    if (_.isFunction(render)) {
      return render({
        classNames,
        controls: this.renderControls(),
        label: this.renderLabel(),
        disabled: disabled,
        Switch: this,
      });
    }

    return (
      <div className={wrapper}>
        {this.renderControls()} {this.renderLabel()}
      </div>
    );
  }
}

Switch.propTypes = propTypes;

Switch.defaultProps = defaultProps;

export default Switch;
