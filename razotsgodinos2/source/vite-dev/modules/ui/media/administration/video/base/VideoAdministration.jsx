import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import WithLocale from "./WithLocale";

import Video from "ui/media/video";
import Form from "ui/form";
import Field from "ui/form/field";
import Input from "ui/inputs/input";
import FormSubmitButton from "ui/form/form_submit_button";

import styles from "./VideoAdministration.module.less";

const propTypes = {
  classNames: PropTypes.object,
  action: PropTypes.string.isRequired, //server action url
  extraData: PropTypes.object, //extra data for server

  provider: PropTypes.string.isRequired, //current video provider
  player: PropTypes.string.isRequired, //current video

  parseResponse: PropTypes.func.isRequired,

  showForm: PropTypes.bool,

  //customization
  VideoProps: PropTypes.object,
  FormProps: PropTypes.object,
  InputProps: PropTypes.object,

  //custom renderers
  render: PropTypes.func,
  renderVideo: PropTypes.func,
  renderForm: PropTypes.func,
  renderInput: PropTypes.func,

  //callbacks
  onSuccess: PropTypes.func,
  onError: PropTypes.func,

  translations: PropTypes.object,
};

const defaultProps = {
  classNames: {},

  showForm: true,

  translations: {
    save: "Save",
    add: "Add",
    placeholder: "Link to video",
    editTitle: "Edit video",
  },
};

class VideoAdministration extends Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();

    const { provider, player } = this.props;

    this.state = {
      provider: provider,
      player: player,
    };

    this.mounted = false;
  }

  componentDidMount() {
    //<editor-fold defaultstate="collapsed" desc="componentDidMount">
    this.mounted = true;
    //</editor-fold>
  }

  componentDidUpdate(prevProps) {
    //<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
    const updatedState = {};

    _.forEach(["player", "provider"], (key) => {
      if (
        !_.isUndefined(prevProps[key]) &&
        prevProps[key] !== this.props[key]
      ) {
        if (this.state[key] !== this.props[key]) {
          updatedState[key] = this.props[key];
        }
      }
    });

    if (!_g.isEmpty(updatedState)) {
      this.setState(updatedState);
    }
    //</editor-fold>
  }

  componentWillUnmount() {
    //<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
    this.mounted = false;
    //</editor-fold>
  }

  /* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

  parseResponse = (response) => {
    //<editor-fold defaultstate="collapsed" desc="parseResponse">
    const { parseResponse } = this.props;
    return parseResponse(response);
    //</editor-fold>
  };

  onSuccess = ({ response }) => {
    //<editor-fold defaultstate="collapsed" desc="onSuccess">
    const { onSuccess } = this.props;
    const parsedResponse = this.parseResponse(response);

    if (!this.mounted) {
      return;
    }
    const { player, provider } = parsedResponse;

    this.setState({
      player: player,
      provider: provider,
    });

    if (_.isFunction(onSuccess)) {
      onSuccess({ response, player, provider, VideoAdministration: this });
    }
    //</editor-fold>
  };

  onError = ({ response }) => {
    //<editor-fold defaultstate="collapsed" desc="onError">
    const { onError } = this.props;

    if (!this.mounted) {
      return;
    }

    if (_.isFunction(onError)) {
      onError({ response, VideoAdministration: this });
    }

    //</editor-fold>
  };

  onPaste = () => {
    //<editor-fold defaultstate="collapsed" desc="onPaste">
    setTimeout(() => {
      this.form.current.submit();
    }, 300);
    //</editor-fold>
  };

  /* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

  renderVideo = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderVideo">
    const { player, provider } = this.state;
    const { renderVideo, VideoProps } = this.props;

    if (_g.isEmpty(player)) {
      return null;
    }

    if (_.isFunction(renderVideo)) {
      return renderVideo({ player, provider, classNames, VideoProps });
    }

    return (
      <div className={classNames["video-wrapper"]}>
        <Video src={player} provider={provider} {...VideoProps} />
      </div>
    );
    //</editor-fold>
  };

  renderForm = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderForm">
    const { renderForm, FormProps, action, extraData, showForm, translations } =
      this.props;

    if (!showForm) {
      return null;
    }

    const title = _.get(translations, "save", "Save");

    if (_.isFunction(renderForm)) {
      return renderForm({
        classNames,
        FormProps,
        action,
        extraData,
        title,
        Input: this.renderInput(classNames),
        onSuccess: this.onSuccess,
        onError: this.onError,
      });
    }

    return (
      <Form
        ref={this.form}
        action={action}
        extraData={extraData}
        refresh={true}
        onSuccess={this.onSuccess}
        onError={this.onError}
        {...FormProps}
      >
        <div className={classNames["form-wrapper"]}>
          {this.renderInput(classNames)}
          <div className={classNames["submit-wrapper"]}>
            <FormSubmitButton ButtonProps={{ title: title }} />
          </div>
        </div>
      </Form>
    );
    //</editor-fold>
  };

  renderInput = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderInput">
    const { renderInput, InputProps, translations } = this.props;

    const placeholder = _.get(translations, "placeholder", "Link to video");

    if (_.isFunction(renderInput)) {
      return renderInput({
        classNames,
        InputProps,
        placeholder,
        onPaste: this.onPaste,
      });
    }

    return (
      <div className={classNames["input-wrapper"]}>
        <Field
          name="url"
          component={Input}
          componentProps={{
            placeholder: placeholder,
            onPaste: this.onPaste,
            ...InputProps,
          }}
          isRequired={true}
          isValidUrl={true}
        />
      </div>
    );
    //</editor-fold>
  };

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    const { render } = this.props;

    if (_.isFunction(render)) {
      return render({
        classNames: classNames,
        Video: this.renderVideo(classNames),
        Form: this.renderForm(classNames),
      });
    }

    return (
      <div className={classNames["wrapper"]}>
        {this.renderVideo(classNames)}
        {this.renderForm(classNames)}
      </div>
    );
  }
}

VideoAdministration.propTypes = propTypes;

VideoAdministration.defaultProps = defaultProps;

VideoAdministration = WithLocale(VideoAdministration);

export default VideoAdministration;
