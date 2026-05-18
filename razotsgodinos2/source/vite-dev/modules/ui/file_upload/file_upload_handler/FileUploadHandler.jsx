import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './FileUploadHandler.module.less';
import { forEach, head, isFunction, toString } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	name: PropTypes.string,

	action: PropTypes.string, //file upload url
	extraData: PropTypes.object, //additional data that will be sent to server
	multiple: PropTypes.bool, //multiple files
	autoUpload: PropTypes.bool, //upload after user added file

	//input props
	accept: PropTypes.string, //image/*,video/*,audio/*
	disabled: PropTypes.bool,

	//callbacks
	customUpload: PropTypes.func, //custom upload function
	onUploadStarted: PropTypes.func,
	onUploadFinished: PropTypes.func,
	onUploadProgress: PropTypes.func, //returns upload progress
	onChange: PropTypes.func, //get files on change
	onSuccess: PropTypes.func, //fires when server returned {response:}
	onError: PropTypes.func, //fires when server returned {error:}
	onFail: PropTypes.func, //fires when file upload failed

	children: PropTypes.node,
};

const defaultProps = {
	classNames: {},
	name: 'file',
	extraData: {},
	multiple: false,
	autoUpload: true,
	disabled: false,
};

class FileUploadHandler extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.files = [];
	}

	clear = () => {
		//<editor-fold defaultstate="collapsed" desc="clear">
		this.files = [];

		if (this.input.current) {
			this.input.current.value = null;
		}
		//</editor-fold>
	};

	getFiles = () => {
		//<editor-fold defaultstate="collapsed" desc="getFiles">
		return this.files;
		//</editor-fold>
	};

	upload = (files) => {
		//<editor-fold defaultstate="collapsed" desc="upload">
		const { action, extraData, customUpload, name, multiple, onUploadStarted } =
			this.props;

		if (isFunction(customUpload)) {
			return customUpload({
				name,
				files,
				action,
				extraData,
				multiple,
				onUploadStarted,
				FileUploadHandler: this,
			});
		}

		const data = new FormData();

		forEach(extraData, (item, name) => {
			data.append(name, toString(item));
		});

		if (!multiple) {
			data.append(name, head(files), head(files).name);
		} else {
			let index = 0;
			forEach(files, (file) => {
				data.append(`${name}[${index}]`, file, file.name);
				index++;
			});
		}

		if (isFunction(onUploadStarted)) {
			onUploadStarted({ FileUploadHandler: this });
		}

		remoteRequest({
			url: action,
			data: data,
			onUploadProgress: this.onUploadProgress,
			onSuccess: this.onSuccess,
			onError: this.onError,
			onFail: this.onFail,
		});
		//</editor-fold>
	};

	onChange = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const files = e.target.files;
		this.files = files;

		const { autoUpload, onChange } = this.props;

		if (autoUpload) {
			this.upload(files);
			return;
		}

		if (isFunction(onChange)) {
			onChange({ files, FileUploadHandler: this });
		}
		//</editor-fold>
	};

	onUploadProgress = (percentCompleted) => {
		//<editor-fold defaultstate="collapsed" desc="onUploadProgress">
		const { onUploadProgress } = this.props;

		if (isFunction(onUploadProgress)) {
			onUploadProgress({ percentCompleted, FileUploadHandler: this });
		}
		//</editor-fold>
	};

	onSuccess = (response) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onSuccess, onUploadFinished } = this.props;

		if (isFunction(onUploadFinished)) {
			onUploadFinished({ FileUploadHandler: this });
		}

		if (isFunction(onSuccess)) {
			onSuccess({ response, FileUploadHandler: this });
		}
		//</editor-fold>
	};

	onError = (response) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		const { onError, onUploadFinished } = this.props;

		if (isFunction(onUploadFinished)) {
			onUploadFinished({ FileUploadHandler: this });
		}

		if (isFunction(onError)) {
			onError({ response, FileUploadHandler: this });
		}
		//</editor-fold>
	};

	onFail = (response) => {
		//<editor-fold defaultstate="collapsed" desc="onFail">
		const { onFail, onUploadFinished } = this.props;

		if (isFunction(onUploadFinished)) {
			onUploadFinished({ FileUploadHandler: this });
		}

		if (isFunction(onFail)) {
			onFail({ response, FileUploadHandler: this });
		}
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { multiple, name, accept, children, disabled } = this.props;

		const _name = multiple ? `${name}[]` : name;

		return (
			<div className={classNames['wrapper']}>
				{children}
				{!disabled && (
					<input
						ref={this.input}
						type="file"
						className={classNames['input']}
						name={_name}
						multiple={multiple}
						accept={accept}
						onChange={this.onChange}
					/>
				)}
			</div>
		);
	}
}

FileUploadHandler.propTypes = propTypes;

FileUploadHandler.defaultProps = defaultProps;

export default FileUploadHandler;
