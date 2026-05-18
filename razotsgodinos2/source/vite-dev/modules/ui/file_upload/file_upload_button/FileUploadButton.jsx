import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import FileUploadHandler from 'ui/file_upload/file_upload_handler';
import Button from 'ui/controls/button';
import ProgressBar from 'ui/misc/progressbar';
import { isFunction } from 'lodash-es';

const propTypes = {
	action: PropTypes.string.isRequired, //file upload url
	extraData: PropTypes.object, //additional data that will be sent to server
	multiple: PropTypes.bool, //multiple files
	accept: PropTypes.string, //image/*,video/*,audio/*
	name: PropTypes.string,

	customUpload: PropTypes.func, //custom upload function
	onUploadStarted: PropTypes.func,
	onUploadFinished: PropTypes.func,
	onUploadProgress: PropTypes.func, //returns upload progress
	onSuccess: PropTypes.func, //fires when server returned {response:}
	onError: PropTypes.func, //fires when server returned {error:}
	onFail: PropTypes.func, //fires when file upload failed

	title: PropTypes.string,
	icon: PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),
	disabled: PropTypes.bool,

	ButtonProps: PropTypes.object,
	ProgressBarProps: PropTypes.object,
	renderButton: PropTypes.func,
	renderUploadProgress: PropTypes.func,
};

const defaultProps = {
	name: 'file',
	extraData: {},
	multiple: false,
	disabled: false,
};

class FileUploadButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploading: false,
			percentCompleted: 0,
		};
	}

	onUploadStarted = () => {
		//<editor-fold defaultstate="collapsed" desc="onUploadStarted">
		this.setState({
			uploading: true,
		});

		const { onUploadStarted } = this.props;

		if (isFunction(onUploadStarted)) {
			onUploadStarted({ FileUploadButton: this });
		}
		//</editor-fold>
	};

	onUploadFinished = () => {
		//<editor-fold defaultstate="collapsed" desc="onUploadFinished">
		this.setState({
			uploading: false,
			percentCompleted: 0,
		});

		const { onUploadFinished } = this.props;

		if (isFunction(onUploadFinished)) {
			onUploadFinished({ FileUploadButton: this });
		}
		//</editor-fold>
	};

	onUploadProgress = ({ percentCompleted }) => {
		//<editor-fold defaultstate="collapsed" desc="onUploadProgress">

		const { onUploadProgress } = this.props;

		if (isFunction(onUploadProgress)) {
			onUploadProgress({ percentCompleted, FileUploadButton: this });
		}

		this.setState({
			percentCompleted,
		});
		//</editor-fold>
	};

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onSuccess } = this.props;

		if (isFunction(onSuccess)) {
			onSuccess({ response, FileUploadButton: this });
		}
		//</editor-fold>
	};

	onError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		const { onError } = this.props;

		if (isFunction(onError)) {
			onError({ response, FileUploadButton: this });
		}
		//</editor-fold>
	};

	onFail = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onFail">
		const { onFail } = this.props;

		if (isFunction(onFail)) {
			onFail({ response, FileUploadButton: this });
		}
		//</editor-fold>
	};

	renderUploadProgress = () => {
		//<editor-fold defaultstate="collapsed" desc="renderUploadProgress">
		const { percentCompleted } = this.state;
		const { ProgressBarProps, renderUploadProgress } = this.props;

		if (isFunction(renderUploadProgress)) {
			return renderUploadProgress({
				percentCompleted,
				ProgressBarProps,
				FileUploadButton: this,
			});
		}

		return <ProgressBar {...ProgressBarProps} percent={percentCompleted} />;
		//</editor-fold>
	};

	renderButton = () => {
		//<editor-fold defaultstate="collapsed" desc="renderButton">
		const { disabled, title, icon, ButtonProps, renderButton } = this.props;

		if (isFunction(renderButton)) {
			return renderButton({
				disabled,
				title,
				icon,
				ButtonProps,
				FileUploadButton: this,
			});
		}

		return (
			<Button {...ButtonProps} title={title} icon={icon} disabled={disabled} />
		);
		//</editor-fold>
	};

	render() {
		const { uploading } = this.state;

		if (uploading) {
			return this.renderUploadProgress();
		}

		const {
			disabled,
			action,
			extraData,
			multiple,
			accept,
			customUpload,
			name,
		} = this.props;

		return (
			<FileUploadHandler
				name={name}
				action={action}
				extraData={extraData}
				multiple={multiple}
				accept={accept}
				disabled={disabled}
				customUpload={customUpload}
				onUploadStarted={this.onUploadStarted}
				onUploadFinished={this.onUploadFinished}
				onUploadProgress={this.onUploadProgress}
				onSuccess={this.onSuccess}
				onError={this.onError}
				onFail={this.onFail}>
				{this.renderButton()}
			</FileUploadHandler>
		);
	}
}

FileUploadButton.propTypes = propTypes;

FileUploadButton.defaultProps = defaultProps;

export default FileUploadButton;
