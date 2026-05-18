import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import refreshCollection from 'helpers/collections/refreshCollection';
import getCollectionName from 'helpers/collections/getCollectionName';
import VideosAdministrationUi from 'ui/media/administration/videos/base';

const propTypes = {
	containerName: PropTypes.string.isRequired,
	containerId: PropTypes.number.isRequired,

	onChange: PropTypes.func,

	addNewItemsTo: PropTypes.oneOf(['end', 'start']),
	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,

	VideosAdministrationProps: PropTypes.object,
};

const defaultProps = {
	addNewItemsTo: 'end',
	showEdit: true,
	showDelete: true,
};

class VideosAdministration extends Component {
	constructor(props) {
		super(props);
	}

	onChange = items => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange } = this.props;

		if (_.isFunction(onChange)) {
			onChange({ items, VideosAdministration: this });
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
		const videos = [];
		const ids = _.get(
			response,
			`collections.${this.getCollectionName()}.ids`,
			[],
		);

		_.forEach(ids, id => {
			const collectionItem = _.get(response, `collectionItems.${id}`);
			const videoId = _.head(_.get(collectionItem, 'media.videos'));
			const video = _.get(response, `videos.${videoId}`);

			videos.push({
				id: video.id,
				collectionItemId: id,
				thumbnail: video.thumbnail,
				player: video.player,
				provider: video.provider,
			});
		});

		return videos;
		//</editor-fold>
	};

	/* ========================================================================*
     *
     *                     Add
     *
     * ========================================================================*/

	getAddData = () => {
		//<editor-fold defaultstate="collapsed" desc="getAddData">
		const { containerName, containerId } = this.props;
		return {
			action: 'add',
			container_name: 'cms_collection',
			container_id: containerId,
			collection_name: containerName,
			collection_id: containerId,
		};
		//</editor-fold>
	};

	parseAddResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseAddResponse">
		const videos = [];

		const video = response.video;

		videos.push({
			id: video.id,
			collectionItemId: video.container_id,
			thumbnail: video.thumbnail,
			player: video.player,
			provider: video.provider,
		});

		return videos;
		//</editor-fold>
	};

	onAddSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onAddSuccess">
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
			action: 'update',
			id: item.id,
		};
		//</editor-fold>
	};

	parseEditResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseEditResponse">
		return {
			thumbnail: response.video.thumbnail,
			player: response.video.player,
			provider: response.video.provider,
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
			VideosAdministrationProps,
			addNewItemsTo,
			showEdit,
			showDelete,
		} = this.props;

		return (
			<VideosAdministrationUi
				{...VideosAdministrationProps}
				addNewItemsTo={addNewItemsTo}
				showEdit={showEdit}
				showDelete={showDelete}
				get={{
					url: 'cms/collection',
					getExtraData: this.getGetExtraData,
					parseResponse: this.parseGetResponse,
				}}
				add={{
					url: 'media/videos',
					getExtraData: this.getAddData,
					parseResponse: this.parseAddResponse,
					onSuccess: this.onAddSuccess,
				}}
				edit={{
					url: 'media/videos',
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

VideosAdministration.propTypes = propTypes;

VideosAdministration.defaultProps = defaultProps;

export default VideosAdministration;
