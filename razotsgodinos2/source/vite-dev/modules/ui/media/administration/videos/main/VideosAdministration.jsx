import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

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
		return response.videos;
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
			container_name: containerName,
			container_id: containerId,
		};
		//</editor-fold>
	};

	parseAddResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseAddResponse">
		const videos = [];

		const video = response.video;

		videos.push(video);

		return videos;
		//</editor-fold>
	};

	onAddSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onAddSuccess">
		this.onChange(items);
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
					url: 'media/videos',
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
					url: 'media/videos',
					getExtraData: this.getDeleteExtraData,
					onDelete: this.onDelete,
				}}
				reorder={{
					url: 'media/videos',
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
