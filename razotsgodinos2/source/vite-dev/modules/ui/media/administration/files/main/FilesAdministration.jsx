import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import FilesAdministrationUi from 'ui/media/administration/files/base';

const propTypes = {
	containerName: PropTypes.string.isRequired,
	containerId: PropTypes.number.isRequired,

	onChange: PropTypes.func,

	addNewItemsTo: PropTypes.oneOf(['end', 'start']),
	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,

	FilesAdministrationProps: PropTypes.object,
};

const defaultProps = {
	addNewItemsTo: 'end',
	showEdit: true,
	showDelete: true,
};

class FilesAdministration extends Component {
	constructor(props) {
		super(props);
	}

	onChange = items => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange } = this.props;

		if (_.isFunction(onChange)) {
			onChange({ items, FilesAdministration: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Get
   *
   * ========================================================================*/

	getGetExtraData = () => {
		//<editor-fold defaultstate="collapsed" desc="getGetExtraData">
		const { containerName, containerId } = this.props;
		return {
			action: 'list',
			container_name: containerName,
			container_id: containerId,
		};
		//</editor-fold>
	};

	parseGetResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseGetResponse">
		return response.files;
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Upload
   *
   * ========================================================================*/

	getUploadData = () => {
		//<editor-fold defaultstate="collapsed" desc="getUploadData">
		const { containerName, containerId } = this.props;
		return {
			action: 'upload',
			container_name: containerName,
			container_id: containerId,
		};
		//</editor-fold>
	};

	parseUploadResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseUploadResponse">
		return response.files;
		//</editor-fold>
	};

	onUploadSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onUploadSuccess">
		this.onChange(items);
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Reupload
   *
   * ========================================================================*/

	getReuploadExtraData = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="getReuploadExtraData">
		return {
			action: 'reupload',
			id: item.id,
		};
		//</editor-fold>
	};

	parseReuploadResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseReuploadResponse">
		return {
			url: response.file.download_url,
			name: response.file.display_name,
			extension: response.file.extension,
			size: response.file.size,
		};
		//</editor-fold>
	};

	onReuploadSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onReuploadSuccess">
		this.onChange(items);
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Rename
   *
   * ========================================================================*/

	getRenameExtraData = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="getRenameExtraData">
		return {
			action: 'rename',
			id: item.id,
		};
		//</editor-fold>
	};

	parseRenameResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseRenameResponse">
		return {
			name: response.file.display_name,
		};
		//</editor-fold>
	};

	onRenameSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onRenameSuccess">
		this.onChange(items);
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Delete
   *
   * ========================================================================*/

	getDeleteExtraData = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="getDeleteExtraData">
		return {
			action: 'delete',
			id: item.id,
		};
		//</editor-fold>
	};

	onDelete = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onDelete">
		this.onChange(items);
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Reorder
   *
   * ========================================================================*/

	getReorderExtraData = ({ ids }) => {
		//<editor-fold defaultstate="collapsed" desc="getReorderExtraData">
		const { containerName, containerId } = this.props;

		return {
			action: 'reorder',
			container_name: containerName,
			container_id: containerId,
			ids: ids.join(','),
		};
		//</editor-fold>
	};

	onSortEnd = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		this.onChange(items);
		//</editor-fold>
	};

	render() {
		const {
			FilesAdministrationProps,
			addNewItemsTo,
			showEdit,
			showDelete,
		} = this.props;

		return (
			<FilesAdministrationUi
				{...FilesAdministrationProps}
				addNewItemsTo={addNewItemsTo}
				showEdit={showEdit}
				showDelete={showDelete}
				get={{
					url: 'media/files',
					getExtraData: this.getGetExtraData,
					parseResponse: this.parseGetResponse,
				}}
				upload={{
					url: 'media/files',
					getExtraData: this.getUploadData,
					parseResponse: this.parseUploadResponse,
					onSuccess: this.onUploadSuccess,
				}}
				reupload={{
					url: 'media/files',
					getExtraData: this.getReuploadExtraData,
					parseResponse: this.parseReuploadResponse,
					onSuccess: this.onReuploadSuccess,
				}}
				rename={{
					url: 'media/files',
					getExtraData: this.getRenameExtraData,
					parseResponse: this.parseRenameResponse,
					onSuccess: this.onRenameSuccess,
				}}
				delete={{
					url: 'media/files',
					getExtraData: this.getDeleteExtraData,
					onDelete: this.onDelete,
				}}
				reorder={{
					url: 'media/files',
					getExtraData: this.getReorderExtraData,
					onSortEnd: this.onSortEnd,
				}}
			/>
		);
	}
}

FilesAdministration.propTypes = propTypes;

FilesAdministration.defaultProps = defaultProps;

export default FilesAdministration;
