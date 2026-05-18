import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import refreshCollection from 'helpers/collections/refreshCollection';
import getCollectionName from 'helpers/collections/getCollectionName';
import ImagesAdministrationUi from 'ui/media/administration/images/base';

const propTypes = {
	containerName: PropTypes.string.isRequired,
	containerId: PropTypes.number.isRequired,

	onChange: PropTypes.func,

	addNewItemsTo: PropTypes.oneOf(['end', 'start']),
	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,

	ImagesAdministrationProps: PropTypes.object,
};

const defaultProps = {
	addNewItemsTo: 'end',
	showEdit: true,
	showDelete: true,
};

class ImagesAdministration extends Component {
	constructor(props) {
		super(props);
	}

	onChange = items => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange } = this.props;

		if (_.isFunction(onChange)) {
			onChange({ items, ImagesAdministration: this });
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
		const images = [];
		const ids = _.get(
			response,
			`collections.${this.getCollectionName()}.ids`,
			[],
		);

		_.forEach(ids, id => {
			const collectionItem = _.get(response, `collectionItems.${id}`);
			const imageId = _.head(_.get(collectionItem, 'media.images'));
			const image = _.get(response, `images.${imageId}`);
			images.push({
				id: image.id,
				collectionItemId: id,
				image: image.image,
				thumbnail: image.thumbnail,
			});
		});

		return images;
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
		const images = [];

		_.forEach(response.images, image => {
			images.push({
				id: image.id,
				collectionItemId: image.container_id,
				image: image.image,
				thumbnail: image.thumbnail,
			});
		});

		return images;
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
     *                     Edit
     *
     * ========================================================================*/

	getEditExtraData = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="getEditExtraData">
		return {
			action: 'reupload',
			id: item.id,
		};
		//</editor-fold>
	};

	parseEditResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseEditResponse">
		return {
			image: response.image.image,
			thumbnail: response.image.thumbnail,
		};
		//</editor-fold>
	};

	onEditSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onEditSuccess">
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
			ImagesAdministrationProps,
			addNewItemsTo,
			showEdit,
			showDelete,
		} = this.props;

		return (
			<ImagesAdministrationUi
				{...ImagesAdministrationProps}
				addNewItemsTo={addNewItemsTo}
				showEdit={showEdit}
				showDelete={showDelete}
				get={{
					url: 'cms/collection',
					getExtraData: this.getGetExtraData,
					parseResponse: this.parseGetResponse,
				}}
				upload={{
					url: 'media/images',
					getExtraData: this.getUploadData,
					parseResponse: this.parseUploadResponse,
					onSuccess: this.onUploadSuccess,
				}}
				edit={{
					url: 'media/images',
					getExtraData: this.getEditExtraData,
					parseResponse: this.parseEditResponse,
					onSuccess: this.onEditSuccess,
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

ImagesAdministration.propTypes = propTypes;

ImagesAdministration.defaultProps = defaultProps;

export default ImagesAdministration;
