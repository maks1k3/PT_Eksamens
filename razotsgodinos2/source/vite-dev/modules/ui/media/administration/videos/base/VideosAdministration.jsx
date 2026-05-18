import React, { PureComponent as Component } from "react";
import PropTypes from "prop-types";

import WithLocale from "./WithLocale";

import EditableSortableGrid, {
  arrayMove,
} from "ui/list/sortable_list/components/editable_sortable_grid";
import Loading from "ui/misc/loading";
import VideoAdministration from "ui/media/administration/video/base";
import Thumbnail from "ui/media/thumbnail";
import Form from "ui/form";
import FormSubmitButton from "ui/form/form_submit_button";
import Field from "ui/form/field";
import Input from "ui/inputs/input";

import styles from "./VideosAdministration.module.less";

const propTypes = {
  classNames: PropTypes.object,

  addNewItemsTo: PropTypes.oneOf(["end", "start"]).isRequired,

  get: PropTypes.shape({
    url: PropTypes.string.isRequired,
    getExtraData: PropTypes.func.isRequired,
    parseResponse: PropTypes.func.isRequired,
  }).isRequired,

  add: PropTypes.shape({
    url: PropTypes.string.isRequired,
    getExtraData: PropTypes.func.isRequired,
    parseResponse: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
  }).isRequired,

  edit: PropTypes.shape({
    url: PropTypes.string.isRequired,
    getExtraData: PropTypes.func.isRequired,
    parseResponse: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
  }).isRequired,

  delete: PropTypes.shape({
    url: PropTypes.string.isRequired,
    getExtraData: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
  }).isRequired,

  reorder: PropTypes.shape({
    url: PropTypes.string.isRequired,
    getExtraData: PropTypes.func.isRequired,
    onSortEnd: PropTypes.func,
  }).isRequired,

  VideoAdministrationProps: PropTypes.object,
  editPopupSettings: PropTypes.object,
  LoadingProps: PropTypes.object,
  ConfirmationPopupProps: PropTypes.object,

  onItemClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,

  //customization
  FormProps: PropTypes.object,
  InputProps: PropTypes.object,
  EditableSortableGridProps: PropTypes.object,

  //custom renderers
  render: PropTypes.func,
  renderForm: PropTypes.func,
  renderInput: PropTypes.func,
  renderList: PropTypes.func,
  renderItem: PropTypes.func,
  renderEditIcon: PropTypes.func,
  renderDeleteIcon: PropTypes.func,

  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,

  translations: PropTypes.object,
};

const defaultProps = {
  classNames: {},
  items: [],

  showEdit: true,
  showDelete: true,

  translations: {
    save: "Save",
    add: "Add",
    placeholder: "Link to video",
    editTitle: "Edit video",
    confirmationTitle: "Confirm deletion",
    confirmationText: "Are you sure you want to delete this?",
    confirmationConfirm: "Confirm",
    confirmationCancel: "Cancel",
  },
};

class VideosAdministration extends Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();

    this.state = {
      loading: true,
      items: [],
    };

    this.mounted = false;
  }

  componentDidMount() {
    //<editor-fold defaultstate="collapsed" desc="componentDidMount">
    this.mounted = true;
    this.getItems();
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

  getItems = () => {
    //<editor-fold defaultstate="collapsed" desc="getItems">
    const { url, getExtraData, parseResponse } = this.props.get;

    remoteRequest({
      url: url,
      data: getExtraData(),
      onSuccess: (response) => {
        if (!this.mounted) {
          return;
        }

        const items = parseResponse(response);
        this.setState({
          loading: false,
          items: items,
        });
      },
      onError: (response) => {
        showAlert({ content: response.msg });
      },
    });
    //</editor-fold>
  };

  onSuccess = ({ response }) => {
    //<editor-fold defaultstate="collapsed" desc="onSuccess">
    if (!this.mounted) {
      return;
    }

    const { addNewItemsTo } = this.props;
    const { parseResponse, onSuccess } = this.props.add;
    const videos = parseResponse(response);

    const items = _.toArray(_g.cloneDeep(this.state.items));

    _.forEach(videos, (video) => {
      if (addNewItemsTo === "start") {
        items.unshift(video);
      } else {
        items.push(video);
      }
    });

    this.setState({
      items: items,
    });

    if (_.isFunction(onSuccess)) {
      onSuccess({ response, items });
    }
    //</editor-fold>
  };

  onError = ({ response }) => {
    //<editor-fold defaultstate="collapsed" desc="onError">
    if (!this.mounted) {
      return;
    }

    const { onError } = this.props.add;

    if (_.isFunction(onError)) {
      onError(response);
    } else {
      showAlert({ content: response.msg });
    }
    //</editor-fold>
  };

  onItemClick = (item) => {
    //<editor-fold defaultstate="collapsed" desc="onItemClick">
    const { onItemClick } = this.props;

    if (_.isFunction(onItemClick)) {
      onItemClick({ item, VideosAdministration: this });
    } else {
      const { items } = this.state;

      const _items = _.map(items, (item) => {
        return {
          src: item.player,
          provider: item.provider,
        };
      });

      openPopup({
        name: "video",
        data: {
          current: _.findIndex(items, (i) => i.id === item.id),
          hideOnOverlayClick: true,
          autoPlay: true,
          items: _items,
        },
      });
    }
    //</editor-fold>
  };

  onEditSuccess = ({ response, VideoAdministration, id }) => {
    //<editor-fold defaultstate="collapsed" desc="onEditSuccess">
    if (!this.mounted) {
      return;
    }

    const { edit } = this.props;
    const { onSuccess } = edit;

    const { player, provider, thumbnail } = edit.parseResponse(response);

    const items = _.toArray(_g.cloneDeep(this.state.items));

    const index = _.findIndex(items, (i) => i.id === id);

    if (index >= 0) {
      items[index].player = player;
      items[index].provider = provider;
      items[index].thumbnail = thumbnail;
    }

    this.setState({
      items: items,
    });

    if (_.isFunction(onSuccess)) {
      onSuccess({ response, player, provider, VideoAdministration, id, items });
    }
    //</editor-fold>
  };

  onEditError = ({ response }) => {
    //<editor-fold defaultstate="collapsed" desc="onEditError">
    if (!this.mounted) {
      return;
    }

    const { onError } = this.props.edit;

    if (_.isFunction(onError)) {
      onError(response);
    }
    //</editor-fold>
  };

  onEditClick = ({ item }) => {
    //<editor-fold defaultstate="collapsed" desc="onEditClick">
    const {
      onEditClick,
      editPopupSettings,
      VideoAdministrationProps,
      edit,
      translations,
    } = this.props;

    if (_.isFunction(onEditClick)) {
      onEditClick({
        item,
        editPopupSettings,
        VideoAdministrationProps,
        edit,
        onEditSuccess: this.onEditSuccess,
        onEditError: this.onEditError,
        translations,
      });
    } else {
      const { id, provider, player } = item;

      const { url, getExtraData, parseResponse } = edit;

      const data = {
        translations: translations,
        action: url,
        extraData: getExtraData({ item }),
        provider: provider,
        player: player,
        parseResponse: parseResponse,
        onSuccess: ({
          response: _response,
          VideoAdministration: _VideoAdministration,
        }) => {
          this.onEditSuccess({
            response: _response,
            VideoAdministration: _VideoAdministration,
            id,
          });
        },
        onError: this.onEditError,
        ...VideoAdministrationProps,
      };

      openPopup({
        name: "universal",
        data: data,
        component: VideoAdministration,
        settings: {
          title: _.get(translations, "editTitle", "Edit video") + " #" + id,
          level: 12,
          maxWidth: "600px",
          ...editPopupSettings,
        },
      });
    }
    //</editor-fold>
  };

  onDeleteClick = ({ item }) => {
    //<editor-fold defaultstate="collapsed" desc="onDeleteClick">
    const {
      onDeleteClick,
      ConfirmationPopupProps,
      delete: _delete,
      translations,
    } = this.props;

    if (_.isFunction(onDeleteClick)) {
      onDeleteClick({
        item,
        ConfirmationPopupProps,
        delete: _delete,
        onDelete: this.onDelete,
        translations,
      });
    } else {
      openPopup({
        name: "confirmation",
        data: {
          ...ConfirmationPopupProps,
          title: _.get(translations, "confirmationTitle", "Confirm deletion"),
          text: _.get(
            translations,
            "confirmationText",
            "Are you sure you want to delete this?"
          ),
          confirm: _.get(translations, "confirmationConfirm", "Confirm"),
          cancel: _.get(translations, "confirmationCancel", "Cancel"),
          onConfirm: () => {
            this.onDelete(item);
            closePopup({ name: "confirmation" });
          },
        },
      });
    }
    //</editor-fold>
  };

  onDelete = (item) => {
    //<editor-fold defaultstate="collapsed" desc="onDelete">
    const { id } = item;

    const items = _.toArray(_g.cloneDeep(this.state.items));
    const index = _.findIndex(items, (i) => i.id === id);

    if (index >= 0) {
      items.splice(index, 1);
    }

    this.setState({
      items: items,
    });

    const { url, getExtraData, onDelete } = this.props.delete;

    remoteRequest({
      url: url,
      data: getExtraData({ item }),
      onSuccess: () => {
        if (_.isFunction(onDelete)) {
          onDelete({ item, items });
        }
      },
    });
    //</editor-fold>
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    //<editor-fold defaultstate="collapsed" desc="onSortEnd">
    const { url, getExtraData, onSortEnd } = this.props.reorder;

    const newItems = arrayMove(this.state.items, oldIndex, newIndex);

    const ids = _.map(newItems, (item) => item.id);

    this.setState({
      items: newItems,
    });

    remoteRequest({
      url: url,
      data: getExtraData({ ids, items: newItems }),
      onSuccess: () => {
        if (_.isFunction(onSortEnd)) {
          onSortEnd({ ids, items: newItems });
        }
      },
    });
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

  renderForm = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderForm">
    const { renderForm, FormProps, translations } = this.props;

    const title = _.get(translations, "add", "Add");

    const { url, getExtraData } = this.props.add;

    if (_.isFunction(renderForm)) {
      return renderForm({
        classNames,
        FormProps,
        url,
        extraData: getExtraData(),
        title,
        Input: this.renderInput(classNames),
        onSuccess: this.onSuccess,
        onError: this.onError,
      });
    }

    return (
      <Form
        ref={this.form}
        action={url}
        extraData={getExtraData()}
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

  renderList = (classNames) => {
    //<editor-fold defaultstate="collapsed" desc="renderList">
    const { renderList, EditableSortableGridProps, showEdit, showDelete } =
      this.props;

    const { items } = this.state;

    if (_.isFunction(renderList)) {
      return renderList({
        classNames,
        items,
        EditableSortableGridProps,
        renderItem: this.renderItem,
        onSortEnd: this.onSortEnd,
        showEdit,
        showDelete,
      });
    }

    const extra = {};

    if (showEdit) {
      extra.onEditClick = this.onEditClick;
    }

    if (showDelete) {
      extra.onDeleteClick = this.onDeleteClick;
    }

    return (
      <div className={classNames["list-wrapper"]}>
        <EditableSortableGrid
          items={items}
          onSortEnd={this.onSortEnd}
          renderItem={this.renderItem}
          {...extra}
          {...EditableSortableGridProps}
        />
      </div>
    );
    //</editor-fold>
  };

  renderItem = ({ item, containerWidth, gridItemWidth }) => {
    //<editor-fold defaultstate="collapsed" desc="renderItem">
    const classNames = this.classNames;
    const { renderItem } = this.props;

    if (_.isFunction(renderItem)) {
      return renderItem({
        classNames,
        item,
        containerWidth,
        gridItemWidth,
        onItemClick: () => {
          this.onItemClick(item);
        },
      });
    }

    const { thumbnail } = item;

    return (
      <div className={classNames["item-content-wrapper"]}>
        <Thumbnail
          src={thumbnail}
          width="100%"
          height="160px"
          showPlayIcon={true}
          onClick={() => {
            this.onItemClick(item);
          }}
        />
      </div>
    );
    //</editor-fold>
  };

  render() {
    const classNames = _g.getClassNames(styles, this.props.classNames);
    this.classNames = classNames;

    const { loading } = this.state;

    const { LoadingProps, render } = this.props;

    if (loading) {
      return <Loading {...LoadingProps} />;
    }

    if (_.isFunction(render)) {
      return render({
        classNames: classNames,
        Form: this.renderForm(classNames),
        List: this.renderList(classNames),
      });
    }

    return (
      <div className={classNames["wrapper"]}>
        {this.renderForm(classNames)}
        {this.renderList(classNames)}
      </div>
    );
  }
}

VideosAdministration.propTypes = propTypes;

VideosAdministration.defaultProps = defaultProps;

VideosAdministration = WithLocale(VideosAdministration);

export default VideosAdministration;
