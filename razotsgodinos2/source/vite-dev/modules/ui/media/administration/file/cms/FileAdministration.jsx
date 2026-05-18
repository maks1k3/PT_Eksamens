import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import FileAdministrationUi from 'ui/media/administration/file/base';
import DeleteButton from 'ui/misc/delete_button';
import Loading from 'ui/misc/loading';
import { isFunction, isNull, toString } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,

	showDelete: PropTypes.bool,

	onUpdate: PropTypes.func,
	onDelete: PropTypes.func,

	FileAdministrationProps: PropTypes.object,
	DeleteButtonProps: PropTypes.object,

	deleteTitle: PropTypes.string,
};

const defaultProps = {
	showDelete: true,
};

class FileAdministration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null,
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
			url: 'media/files',
			data: {
				action: 'get',
				id: id,
			},
			onSuccess: (response) => {
				if (!this.mounted) {
					return;
				}

				this.setState({
					file: response.file,
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
			file: response.file,
		});

		uiStore.set(`files.${id}`, response.file);

		if (isFunction(onUpdate)) {
			onUpdate({
				response,
				file: response.file,
				FileAdministration: this,
			});
		}
		//</editor-fold>
	};

	onDeleteSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onDeleteSuccess">
		const { id, onDelete, onUpdate } = this.props;

		this.setState({
			file: response.file,
		});

		uiStore.set(`files.${id}`, response.file);

		if (isFunction(onDelete)) {
			onDelete({
				response,
				file: response.file,
				FileAdministration: this,
			});
		}

		if (isFunction(onUpdate)) {
			onUpdate({
				response,
				file: response.file,
				FileAdministration: this,
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
		const { FileAdministrationProps } = this.props;
		const { id, download_url, display_name, extension, size } = this.state.file;

		return (
			<div className="margin-bottom">
				<FileAdministrationUi
					url={isNull(download_url) ? '' : download_url}
					name={isNull(display_name) ? '' : display_name}
					extension={isNull(extension) ? '' : extension}
					size={isNull(size) ? '' : toString(size)}
					upload={{
						url: 'media/files',
						extraData: {
							action: 'reupload',
							id: id,
						},
						parseResponse: (response) => {
							return {
								url: response.file.download_url,
								name: response.file.display_name,
								extension: response.file.extension,
								size: response.file.size,
							};
						},
						onSuccess: this.onUpdate,
					}}
					edit={{
						url: 'media/files',
						extraData: {
							action: 'rename',
							id: id,
						},
						parseResponse: (response) => {
							return {
								name: response.file.display_name,
							};
						},
						onSuccess: this.onUpdate,
					}}
					title="Upload file"
					submitTitle="Rename file"
					showReupload={false}
					{...FileAdministrationProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { mime } = this.state.file;

		if (_g.isEmpty(mime)) {
			return null;
		}

		const { showDelete, DeleteButtonProps, id, deleteTitle } = this.props;

		if (!showDelete) {
			return null;
		}

		return (
			<div className="margin-bottom">
				<DeleteButton
					action="media/files"
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

FileAdministration.propTypes = propTypes;

FileAdministration.defaultProps = defaultProps;

FileAdministration = WithLocale(FileAdministration);

export default FileAdministration;
