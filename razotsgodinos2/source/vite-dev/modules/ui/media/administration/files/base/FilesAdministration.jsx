import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import FileUploadButton from 'ui/file_upload/file_upload_button';
import FileAdministration from 'ui/media/administration/file/base';
import EditableSortableList, {
	arrayMove,
} from 'ui/list/sortable_list/components/editable_sortable_list';
import FileLink from 'ui/misc/file_link';
import Loading from 'ui/misc/loading';

import styles from './FilesAdministration.module.less';
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

	reupload: PropTypes.shape({
		url: PropTypes.string.isRequired,
		getExtraData: PropTypes.func.isRequired,
		parseResponse: PropTypes.func.isRequired,
		onSuccess: PropTypes.func,
		onError: PropTypes.func,
		onFail: PropTypes.func,
	}).isRequired,

	rename: PropTypes.shape({
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
	}),

	FileAdministrationProps: PropTypes.object,
	editPopupSettings: PropTypes.object,
	LoadingProps: PropTypes.object,
	ConfirmationPopupProps: PropTypes.object,

	onEditClick: PropTypes.func,
	onDeleteClick: PropTypes.func,

	icon: PropTypes.PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),

	translations: PropTypes.object,
	//customization
	FileUploadButtonProps: PropTypes.object,
	FileLinkProps: PropTypes.object,
	EditableSortableListProps: PropTypes.object,

	//custom renderers
	render: PropTypes.func,
	renderFileUploadButton: PropTypes.func,
	renderList: PropTypes.func,
	renderItem: PropTypes.func,
	renderEditIcon: PropTypes.func,
	renderDeleteIcon: PropTypes.func,

	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,
};

const defaultProps = {
	classNames: {},

	showEdit: true,
	showDelete: true,

	icon: {
		provider: 'icomoon',
		name: 'image5',
	},

	translations: {
		uploadTitle: 'Upload',
		submitTitle: 'Rename',
		placeholder: 'Filename',
		editTitle: 'Edit file',
		deleteTitle: 'Delete file',
		confirmationTitle: 'Confirm deletion',
		confirmationText: 'Are you sure you want to delete this?',
		confirmationConfirm: 'Confirm',
		confirmationCancel: 'Cancel',
	},
};

class FilesAdministration extends Component {
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
		const files = parseResponse(response);

		const items = toArray(_g.cloneDeep(this.state.items));

		forEach(files, (file) => {
			if (addNewItemsTo === 'start') {
				items.unshift(file);
			} else {
				items.push(file);
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

	onReuploadSuccess = ({ response, FileAdministration, id }) => {
		//<editor-fold defaultstate="collapsed" desc="onReuploadSuccess">
		if (!this.mounted) {
			return;
		}

		const { parseResponse, onSuccess } = this.props.reupload;

		const { url, name, extension, size } = parseResponse(response);

		const items = toArray(_g.cloneDeep(this.state.items));
		const index = findIndex(items, (i) => i.id === id);

		if (index >= 0) {
			items[index].download_url = url;
			items[index].display_name = name;
			items[index].extension = extension;
			items[index].size = size;
		}

		this.setState({
			items: items,
		});

		if (isFunction(onSuccess)) {
			onSuccess({
				response,
				url,
				name,
				extension,
				size,
				FileAdministration,
				id,
				items,
			});
		}
		//</editor-fold>
	};

	onReuploadError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onReuploadError">
		if (!this.mounted) {
			return;
		}

		const { onError } = this.props.reupload;

		if (isFunction(onError)) {
			onError({ response });
		} else {
			showAlert({ content: response.msg });
		}
		//</editor-fold>
	};

	onReuploadFail = () => {
		//<editor-fold defaultstate="collapsed" desc="onReuploadFail">
		const { onFail } = this.props.reupload;

		if (isFunction(onFail)) {
			onFail();
		} else {
			showAlert({ content: 'Server error!' });
		}
		//</editor-fold>
	};

	onRenameSuccess = ({ response, FileAdministration, id }) => {
		//<editor-fold defaultstate="collapsed" desc="onRenameSuccess">
		if (!this.mounted) {
			return;
		}

		const { parseResponse, onSuccess } = this.props.reupload;

		const { name } = parseResponse(response);

		const items = toArray(_g.cloneDeep(this.state.items));
		const index = findIndex(items, (i) => i.id === id);

		if (index >= 0) {
			items[index].display_name = name;
		}

		this.setState({
			items: items,
		});

		if (isFunction(onSuccess)) {
			onSuccess({ response, name, FileAdministration, id, items });
		}
		//</editor-fold>
	};

	onRenameError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onRenameError">
		if (!this.mounted) {
			return;
		}

		const { onError } = this.props.reupload;

		if (isFunction(onError)) {
			onError({ response });
		} else {
			showAlert({ content: response.msg });
		}
		//</editor-fold>
	};

	onEditClick = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="onEditClick">

		const {
			onEditClick,
			editPopupSettings,
			FileAdministrationProps,
			reupload,
			rename,
			translations,
		} = this.props;

		if (isFunction(onEditClick)) {
			onEditClick({
				item,
				editPopupSettings,
				FileAdministrationProps,
				reupload,
				rename,
				onReuploadSuccess: this.onReuploadSuccess,
				onReuploadError: this.onReuploadError,
				onReuploadFail: this.onReuploadFail,
				onRenameSuccess: this.onRenameSuccess,
				onRenameError: this.onRenameError,
				translations,
			});
		} else {
			const {
				id,
				download_url: url,
				display_name: name,
				extension,
				size,
			} = item;

			const data = {
				translations: translations,
				url: url,
				name: name,
				extension: extension,
				size: size,
				upload: {
					url: reupload.url,
					extraData: reupload.getExtraData({ item }),
					parseResponse: reupload.parseResponse,
					onSuccess: ({
						response: _response,
						FileAdministration: _FileAdministration,
					}) => {
						this.onReuploadSuccess({
							response: _response,
							FileAdministration: _FileAdministration,
							id,
						});
					},
					onError: this.onReuploadError,
					onFail: this.onReuploadFail,
				},
				edit: {
					url: rename.url,
					extraData: rename.getExtraData({ item }),
					parseResponse: rename.parseResponse,
					onSuccess: ({
						response: _response,
						FileAdministration: _FileAdministration,
					}) => {
						this.onRenameSuccess({
							response: _response,
							FileAdministration: _FileAdministration,
							id,
						});
					},
					onError: this.onRenameError,
				},
				...FileAdministrationProps,
			};

			openPopup({
				name: 'universal',
				data: data,
				component: FileAdministration,
				settings: {
					title: get(translations, 'editTitle', 'Edit file') + ' #' + id,
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
			});
		}

		return (
			<div className={classNames['file-upload-wrapper']}>
				<FileUploadButton
					action={url}
					extraData={getExtraData()}
					title={title}
					icon={icon}
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
		const { renderList, EditableSortableListProps, showEdit, showDelete } =
			this.props;

		const { items } = this.state;

		if (_g.isEmpty(items)) {
			return null;
		}

		if (isFunction(renderList)) {
			return renderList({
				classNames,
				items,
				EditableSortableListProps,
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
			<div className={classNames['list-wrapper']}>
				<EditableSortableList
					items={items}
					onSortEnd={this.onSortEnd}
					renderItem={this.renderItem}
					{...extra}
					{...EditableSortableListProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderItem = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { renderItem, FileLinkProps } = this.props;

		if (isFunction(renderItem)) {
			return renderItem({
				item,
				FileLinkProps,
			});
		}

		const { download_url: url, display_name: name, extension, size } = item;

		return (
			<FileLink
				to={url}
				title={`${name}.${extension} ${!_g.isEmpty(size) ? `(${size})` : ''}`}
				extension={extension}
				{...FileLinkProps}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

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

FilesAdministration.propTypes = propTypes;

FilesAdministration.defaultProps = defaultProps;

FilesAdministration = WithLocale(FilesAdministration);

export default FilesAdministration;
