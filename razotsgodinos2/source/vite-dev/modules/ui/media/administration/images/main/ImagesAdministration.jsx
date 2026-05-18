import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import ImagesAdministrationUi from 'ui/media/administration/images/base';
import { isFunction } from 'lodash-es';

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

	onChange = (items) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange } = this.props;

		if (isFunction(onChange)) {
			onChange({ items, ImagesAdministration: this });
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

	parseGetResponse = (response) => {
		//<editor-fold defaultstate="collapsed" desc="parseGetResponse">
		return response.images;
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

	parseUploadResponse = (response) => {
		//<editor-fold defaultstate="collapsed" desc="parseUploadResponse">
		return response.images;
		//</editor-fold>
	};

	onUploadSuccess = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="onUploadSuccess">
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
			action: 'reupload',
			id: item.id,
		};
		//</editor-fold>
	};

	parseEditResponse = (response) => {
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
		const { ImagesAdministrationProps, addNewItemsTo, showEdit, showDelete } =
			this.props;
		return (
			<ImagesAdministrationUi
				{...ImagesAdministrationProps}
				addNewItemsTo={addNewItemsTo}
				showEdit={showEdit}
				showDelete={showDelete}
				get={{
					url: 'media/images',
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
					url: 'media/images',
					getExtraData: this.getDeleteExtraData,
					onDelete: this.onDelete,
				}}
				reorder={{
					url: 'media/images',
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
