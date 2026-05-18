import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import EditableSortableGrid, {
	arrayMove,
} from 'ui/list/sortable_list/components/editable_sortable_grid';
import Loading from 'ui/misc/loading';
import ImageAdministration from 'ui/media/administration/image/base';
import FileUploadButton from 'ui/file_upload/file_upload_button';
import Thumbnail from 'ui/media/thumbnail';

import styles from './ImagesAdministration.module.less';
import { findIndex, forEach, get, isFunction, map, toArray } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	addNewItemsTo: PropTypes.oneOf(['end', 'start']).isRequired,

	get: PropTypes.shape({
		url: PropTypes.string.isRequired,
		getExtraData: PropTypes.func.isRequired,
		parseResponse: PropTypes.func.isRequired,
	}).isRequired,

	upload: PropTypes.shape({
		url: PropTypes.string.isRequired,
		getExtraData: PropTypes.func.isRequired,
		parseResponse: PropTypes.func.isRequired,
		onSuccess: PropTypes.func,
		onError: PropTypes.func,
		onFail: PropTypes.func,
	}).isRequired,

	edit: PropTypes.shape({
		url: PropTypes.string.isRequired,
		getExtraData: PropTypes.func.isRequired,
		parseResponse: PropTypes.func.isRequired,
		onSuccess: PropTypes.func,
		onError: PropTypes.func,
		onFail: PropTypes.func,
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
	}),

	ImageAdministrationProps: PropTypes.object,
	editPopupSettings: PropTypes.object,
	LoadingProps: PropTypes.object,
	ConfirmationPopupProps: PropTypes.object,

	onItemClick: PropTypes.func,
	onEditClick: PropTypes.func,
	onDeleteClick: PropTypes.func,

	icon: PropTypes.PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),
	translations: PropTypes.object,

	//customization
	FileUploadButtonProps: PropTypes.object,
	EditableSortableGridProps: PropTypes.object,

	//custom renderers
	render: PropTypes.func,
	renderFileUploadButton: PropTypes.func,
	renderList: PropTypes.func,
	renderItem: PropTypes.func,

	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,
};

const defaultProps = {
	classNames: {},

	showEdit: true,
	showDelete: true,

	translations: {
		uploadTitle: 'Upload',
		editTitle: 'Edit image',
		confirmationTitle: 'Confirm deletion',
		confirmationText: 'Are you sure you want to delete this?',
		confirmationConfirm: 'Confirm',
		confirmationCancel: 'Cancel',
	},
	icon: {
		provider: 'icomoon',
		name: 'image5',
	},
};

class ImagesAdministration extends Component {
	constructor(props) {
		super(props);

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
		const { parseResponse, onSuccess } = this.props.upload;
		const images = parseResponse(response);

		const items = toArray(_g.cloneDeep(this.state.items));

		forEach(images, (image) => {
			if (addNewItemsTo === 'start') {
				items.unshift(image);
			} else {
				items.push(image);
			}
		});

		this.setState({
			items: items,
		});

		if (isFunction(onSuccess)) {
			onSuccess({ response, items });
		}
		//</editor-fold>
	};

	onError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		if (!this.mounted) {
			return;
		}

		const { onError } = this.props.upload;

		if (isFunction(onError)) {
			onError({ response });
		} else {
			showAlert({ content: response.msg });
		}
		//</editor-fold>
	};

	onFail = () => {
		//<editor-fold defaultstate="collapsed" desc="onFail">
		if (!this.mounted) {
			return;
		}

		const { onFail } = this.props.upload;

		if (isFunction(onFail)) {
			onFail();
		} else {
			showAlert({ content: 'Server error!' });
		}
		//</editor-fold>
	};

	onItemClick = (item) => {
		//<editor-fold defaultstate="collapsed" desc="onItemClick">
		const { onItemClick } = this.props;

		if (isFunction(onItemClick)) {
			onItemClick({ item, ImagesAdministration: this });
		} else {
			const { items } = this.state;

			const _items = map(items, (item) => {
				return {
					src: item.image,
				};
			});

			openPopup({
				name: 'image',
				data: {
					current: findIndex(items, (i) => i.id === item.id),
					showTitle: false,
					showNumbers: true,
					items: _items,
				},
			});
		}
		//</editor-fold>
	};

	onEditSuccess = ({ response, ImageAdministration, id }) => {
		//<editor-fold defaultstate="collapsed" desc="onEditSuccess">
		if (!this.mounted) {
			return;
		}

		const { parseResponse, onSuccess } = this.props.edit;

		const { image, thumbnail } = parseResponse(response);

		const items = toArray(_g.cloneDeep(this.state.items));
		const index = findIndex(items, (i) => i.id === id);

		if (index >= 0) {
			items[index].image = image;
			items[index].thumbnail = thumbnail;
		}

		this.setState({
			items: items,
		});

		if (isFunction(onSuccess)) {
			onSuccess({ response, image, thumbnail, ImageAdministration, id, items });
		}
		//</editor-fold>
	};

	onEditError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onEditError">
		if (!this.mounted) {
			return;
		}

		const { onError } = this.props.edit;

		if (isFunction(onError)) {
			onError({ response });
		}
		//</editor-fold>
	};

	onEditFail = () => {
		//<editor-fold defaultstate="collapsed" desc="onEditFail">
		const { onFail } = this.props.edit;

		if (isFunction(onFail)) {
			onFail();
		} else {
			showAlert({ content: 'Server error!' });
		}
		//</editor-fold>
	};

	onEditClick = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="onEditClick">
		const {
			onEditClick,
			editPopupSettings,
			ImageAdministrationProps,
			edit,
			translations,
		} = this.props;

		if (isFunction(onEditClick)) {
			onEditClick({
				item,
				editPopupSettings,
				ImageAdministrationProps,
				edit,
				onEditSuccess: this.onEditSuccess,
				onEditError: this.onEditError,
				onEditFail: this.onEditFail,
				translations,
			});
		} else {
			const { id, image } = item;

			const { url, getExtraData, parseResponse } = edit;

			const data = {
				action: url,
				extraData: getExtraData({ item }),
				image: image,
				title: get(translations, 'uploadTitle', 'Upload'),
				parseResponse: parseResponse,
				onSuccess: ({
					response: _response,
					ImageAdministration: _ImageAdministration,
				}) => {
					this.onEditSuccess({
						response: _response,
						ImageAdministration: _ImageAdministration,
						id,
					});
				},
				onError: this.onEditError,
				onFail: this.onEditFail,
				...ImageAdministrationProps,
			};

			openPopup({
				name: 'universal',
				data: data,
				component: ImageAdministration,
				settings: {
					title: get(translations, 'editTitle', 'Edit image') + ' #' + id,
					level: 12,
					maxWidth: '600px',
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

		if (isFunction(onDeleteClick)) {
			onDeleteClick({
				item,
				ConfirmationPopupProps,
				delete: _delete,
				onDelete: this.onDelete,
				translations,
			});
		} else {
			openPopup({
				name: 'confirmation',
				data: {
					...ConfirmationPopupProps,
					title: get(translations, 'confirmationTitle', 'Confirm deletion'),
					text: get(
						translations,
						'confirmationText',
						'Are you sure you want to delete this?',
					),
					confirm: get(translations, 'confirmationConfirm', 'Confirm'),
					cancel: get(translations, 'confirmationCancel', 'Cancel'),
					onConfirm: () => {
						this.onDelete(item);
						closePopup({ name: 'confirmation' });
					},
				},
			});
		}
		//</editor-fold>
	};

	onDelete = (item) => {
		//<editor-fold defaultstate="collapsed" desc="onDelete">
		const { id } = item;

		const items = toArray(_g.cloneDeep(this.state.items));
		const index = findIndex(items, (i) => i.id === id);

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
				if (isFunction(onDelete)) {
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

		const ids = map(newItems, (item) => item.id);

		this.setState({
			items: newItems,
		});

		remoteRequest({
			url: url,
			data: getExtraData({ ids, items: newItems }),
			onSuccess: () => {
				if (isFunction(onSortEnd)) {
					onSortEnd({ ids, items: newItems });
				}
			},
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderFileUploadButton = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFileUploadButton">
		const {
			renderFileUploadButton,
			FileUploadButtonProps,
			translations,
			icon,
		} = this.props;

		const title = get(translations, 'uploadTitle', 'Upload');

		const { url, getExtraData } = this.props.upload;

		if (isFunction(renderFileUploadButton)) {
			return renderFileUploadButton({
				classNames,
				FileUploadButtonProps,
				url,
				extraData: getExtraData(),
				title,
				icon,
				onSuccess: this.onSuccess,
				onError: this.onError,
				onFail: this.onFail,
				ImageAdministration: this,
			});
		}

		return (
			<div className={classNames['file-upload-wrapper']}>
				<FileUploadButton
					action={url}
					extraData={getExtraData()}
					title={title}
					icon={icon}
					accept="image/*"
					multiple={true}
					onSuccess={this.onSuccess}
					onError={this.onError}
					onFail={this.onFail}
					{...FileUploadButtonProps}
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

		if (isFunction(renderList)) {
			return renderList({
				classNames,
				items,
				EditableSortableGridProps,
				renderItem: this.renderItem,
				onSortEnd: this.onSortEnd,
				showEdit,
				showDelete,
				ImageAdministration: this,
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
			<div className={classNames['list-wrapper']}>
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

		if (isFunction(renderItem)) {
			return renderItem({
				classNames,
				item,
				containerWidth,
				gridItemWidth,
				onItemClick: () => {
					this.onItemClick(item);
				},
				ImageAdministration: this,
			});
		}

		const { thumbnail } = item;

		return (
			<div className={classNames['item-content-wrapper']}>
				<Thumbnail
					src={thumbnail}
					width="100%"
					height="160px"
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

		if (isFunction(render)) {
			return render({
				classNames: classNames,
				FileUploadButton: this.renderFileUploadButton(classNames),
				List: this.renderList(classNames),
				ImageAdministration: this,
			});
		}

		return (
			<div className={classNames['wrapper']}>
				{this.renderFileUploadButton(classNames)}
				{this.renderList(classNames)}
			</div>
		);
	}
}

ImagesAdministration.propTypes = propTypes;

ImagesAdministration.defaultProps = defaultProps;

ImagesAdministration = WithLocale(ImagesAdministration);

export default ImagesAdministration;
