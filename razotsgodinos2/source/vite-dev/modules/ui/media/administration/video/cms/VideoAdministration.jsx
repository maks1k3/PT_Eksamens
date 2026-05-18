import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import VideoAdministrationUi from 'ui/media/administration/video/base';
import DeleteButton from 'ui/misc/delete_button';
import Loading from 'ui/misc/loading';

const propTypes = {
	id: PropTypes.number.isRequired,

	showDelete: PropTypes.bool,

	onUpdate: PropTypes.func,
	onDelete: PropTypes.func,

	VideoAdministrationProps: PropTypes.object,
	DeleteButtonProps: PropTypes.object,

	deleteTitle: PropTypes.string,
};

const defaultProps = {
	showDelete: true,
	deleteTitle: 'Delete video',
};

class VideoAdministration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			video: null,
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
			url: 'media/videos',
			data: {
				action: 'get',
				id: id,
			},
			onSuccess: response => {
				if (!this.mounted) {
					return;
				}

				this.setState({
					video: response.video,
					loading: false,
				});
			},
			error: response => {
				showAlert({ content: response.msg });
			},
		});
		//</editor-fold>
	};

	onUpdate = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onUpdate">
		const { id, onUpdate } = this.props;

		this.setState({
			video: response.video,
		});

		uiStore.set(`videos.${id}`, response.video);

		if (_.isFunction(onUpdate)) {
			onUpdate({
				response,
				video: response.video,
				VideoAdministration: this,
			});
		}
		//</editor-fold>
	};

	parseUpdateResponse = response => {
		//<editor-fold defaultstate="collapsed" desc="parseUpdateResponse">
		return {
			msg: response.msg,
			video: response.video.player,
			provider: response.video.provider,
		};
		//</editor-fold>
	};

	onDeleteSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onDeleteSuccess">
		const { id, onDelete, onUpdate } = this.props;

		this.setState({
			video: response.video,
		});

		uiStore.set(`videos.${id}`, response.video);

		if (_.isFunction(onDelete)) {
			onDelete({
				response,
				video: response.video,
				VideoAdministration: this,
			});
		}

		if (_.isFunction(onUpdate)) {
			onUpdate({
				response,
				video: response.video,
				VideoAdministration: this,
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
		const { VideoAdministrationProps, id } = this.props;
		const { video } = this.state;
		const { player, provider } = video;

		const _player = _g.isEmpty(player) ? '' : player;
		const _provider = _g.isEmpty(provider) ? '' : provider;

		let showForm = true;

		if (!_g.isEmpty(player)) {
			showForm = false;
		}

		return (
			<div className="margin-bottom">
				<VideoAdministrationUi
					action="media/videos"
					extraData={{
						action: 'update',
						id: id,
					}}
					provider={_provider}
					player={_player}
					parseResponse={this.parseUpdateResponse}
					onSuccess={this.onUpdate}
					showForm={showForm}
					{...VideoAdministrationProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { player } = this.state.video;

		if (_g.isEmpty(player)) {
			return null;
		}

		const { showDelete, DeleteButtonProps, id, deleteTitle } = this.props;

		if (!showDelete) {
			return null;
		}

		return (
			<div className="margin-bottom">
				<DeleteButton
					action="media/videos"
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

VideoAdministration.propTypes = propTypes;

VideoAdministration.defaultProps = defaultProps;

VideoAdministration = WithLocale(VideoAdministration);

export default VideoAdministration;
