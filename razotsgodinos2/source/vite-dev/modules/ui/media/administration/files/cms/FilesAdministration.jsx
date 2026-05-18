import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import refreshCollection from 'helpers/collections/refreshCollection';
import getCollectionName from 'helpers/collections/getCollectionName';
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
   *                     Methods
   *
   * ========================================================================*/

	refreshCollection = () => {
		//<editor-fold defaultstate="collapsed" desc="refreshCollection">
		const { containerName, containerId } = this.props;
		refreshCollection(containerName, containerId);
		//</editor-fold>
	};

	getCollectionName = () => {
		//<editor-fold defaultstate="collapsed" desc="getCollectionName">
		const { containerName, containerId } = this.props;
		return getCollectionName(containerName, containerId);
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
			action: 'get',
			lang: 'en',
			name: containerName,
			collection_id: containerId,
			results_per_page: 'all',
			order: {
				position: 'asc',
			},
		};
		//</editor-fold>
	};

	parseGetResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseGetResponse">
		const files = [];
		const ids = _.get(
			response,
			`collections.${this.getCollectionName()}.ids`,
			[],
		);

		_.forEach(ids, id => {
			const collectionItem = _.get(response, `collectionItems.${id}`);
			const fileId = _.head(_.get(collectionItem, 'media.files'));
			const file = _.get(response, `files.${fileId}`);
			files.push({
				id: file.id,
				collectionItemId: id,
				download_url: file.download_url,
				display_name: file.display_name,
				extension: file.extension,
				size: file.size,
			});
		});

		return files;
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
			container_name: 'cms_collection',
			container_id: containerId,
			collection_name: containerName,
			collection_id: containerId,
		};
		//</editor-fold>
	};

	parseUploadResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseUploadResponse">
		const files = [];

		_.forEach(response.files, file => {
			files.push({
				id: file.id,
				collectionItemId: file.container_id,
				download_url: file.download_url,
				display_name: file.display_name,
				extension: file.extension,
				size: file.size,
			});
		});

		return files;
		//</editor-fold>
	};

	onUploadSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onUploadSuccess">
		this.onChange(items);
		this.refreshCollection();
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
		this.refreshCollection();
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
		this.refreshCollection();
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
			id: item.collectionItemId,
		};
		//</editor-fold>
	};

	onDelete = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onDelete">
		this.onChange(items);
		this.refreshCollection();
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Reorder
   *
   * ========================================================================*/

	getReorderExtraData = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="getReorderExtraData">
		const { containerName, containerId } = this.props;

		return {
			action: 'reorder',
			name: containerName,
			collection_id: containerId,
			ids: _.map(items, item => item.collectionItemId).join(','),
		};
		//</editor-fold>
	};

	onSortEnd = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		this.onChange(items);
		this.refreshCollection();
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
					url: 'cms/collection',
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
					url: 'cms/administration/collection_item',
					getExtraData: this.getDeleteExtraData,
					onDelete: this.onDelete,
				}}
				reorder={{
					url: 'cms/administration/collection',
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
