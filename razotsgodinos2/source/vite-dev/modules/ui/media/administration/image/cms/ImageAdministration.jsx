import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import ImageAdministrationUi from 'ui/media/administration/image/base';
import Loading from 'ui/misc/loading';
import DeleteButton from 'ui/misc/delete_button';
import { isFunction } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,

	showDelete: PropTypes.bool,

	onUpdate: PropTypes.func,
	onDelete: PropTypes.func,

	ImageAdministrationProps: PropTypes.object,
	DeleteButtonProps: PropTypes.object,
	deleteTitle: PropTypes.string,
};

const defaultProps = {
	showDelete: true,
	deleteTitle: 'Delete image',
};

class ImageAdministration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			loading: true,
		};

		this.mounted = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		this.getData();
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

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { id } = this.props;

		remoteRequest({
			url: 'media/images',
			data: {
				action: 'get',
				id: id,
			},
			onSuccess: (response) => {
				if (!this.mounted) {
					return;
				}

				this.setState({
					image: response.image,
					loading: false,
				});
			},
			onError: (response) => {
				showAlert({ content: response.msg });
			},
		});
		//</editor-fold>
	};

	onUpdate = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onUpdate">
		const { id, onUpdate } = this.props;

		this.setState({
			image: response.image,
		});

		uiStore.set(`images.${id}`, response.image);

		if (isFunction(onUpdate)) {
			onUpdate({
				response,
				image: response.image,
				ImageAdministration: this,
			});
		}

		//</editor-fold>
	};

	parseUpdateResponse = (response) => {
		//<editor-fold defaultstate="collapsed" desc="parseUpdateResponse">
		return {
			msg: response.msg,
			image: response.image.image,
		};
		//</editor-fold>
	};

	onDeleteSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onDeleteSuccess">
		const { id, onDelete, onUpdate } = this.props;

		this.setState({
			image: response.image,
		});

		uiStore.set(`images.${id}`, response.image);

		if (isFunction(onDelete)) {
			onDelete({
				response,
				image: response.image,
				ImageAdministration: this,
			});
		}

		if (isFunction(onUpdate)) {
			onUpdate({
				response,
				image: response.image,
				ImageAdministration: this,
			});
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAdministration">
		const { ImageAdministrationProps, id } = this.props;
		const { image } = this.state.image;

		return (
			<div className="margin-bottom">
				<ImageAdministrationUi
					action="media/images"
					extraData={{
						action: 'reupload',
						id: id,
					}}
					image={image}
					parseResponse={this.parseUpdateResponse}
					onSuccess={this.onUpdate}
					{...ImageAdministrationProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { size } = this.state.image;

		if (_g.isEmpty(size)) {
			return null;
		}

		const { showDelete, DeleteButtonProps, id, deleteTitle } = this.props;

		if (!showDelete) {
			return null;
		}

		return (
			<div style={{ marginBottom: 15 }}>
				<DeleteButton
					action="media/images"
					extraData={{
						action: 'delete',
						id: id,
					}}
					title={deleteTitle}
					onSuccess={this.onDeleteSuccess}
					{...DeleteButtonProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const { loading } = this.state;

		if (loading) {
			return <Loading />;
		}

		return (
			<div>
				{this.renderAdministration()}
				{this.renderDelete()}
			</div>
		);
	}
}

ImageAdministration.propTypes = propTypes;

ImageAdministration.defaultProps = defaultProps;

ImageAdministration = WithLocale(ImageAdministration);

export default ImageAdministration;
