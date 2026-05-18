import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import FileUploadHandler from 'ui/file_upload/file_upload_handler';
import Button from 'ui/controls/button';
import Icon from 'ui/misc/icon';
import FileIcon from 'ui/misc/file_icon';
import Thumbnail from 'ui/media/thumbnail';

import styles from './FileInput.module.less';
import {
	concat,
	forEach,
	get,
	has,
	isFunction,
	isUndefined,
	toArray,
} from 'lodash-es';
import { map } from 'jquery';

const propTypes = {
	classNames: PropTypes.object,

	title: PropTypes.string,
	theme: PropTypes.oneOf([
		'main',
		'primary',
		'success',
		'info',
		'warning',
		'danger',
		'custom',
	]),
	icon: PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),

	accept: PropTypes.string, //image/*,video/*,audio/*
	multiple: PropTypes.bool,
	disabled: PropTypes.bool,

	//ui customization
	ButtonProps: PropTypes.object,
	renderFiles: PropTypes.func,
	renderFile: PropTypes.func,

	showImagePreview: PropTypes.bool,
	//from Field
	FieldInstance: PropTypes.object.isRequired,
};

const defaultProps = {
	classNames: {},

	title: 'Add file',
	theme: 'primary',
	icon: {
		provider: 'icomoon',
		name: 'plus3',
	},
	multiple: false,
	disabled: false,
	showImagePreview: false,
};

class FileInput extends Component {
	constructor(props) {
		super(props);
		this.fileUploadHandler = React.createRef();

		this.files = [];

		this.state = {
			showFileUploadButton: true,
			files: [],
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { FieldInstance } = this.props;

		if (!isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this, isFileInput: true });
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	loadImages = () => {
		//<editor-fold defaultstate="collapsed" desc="loadImages">
		forEach(this.files, (file, index) => {
			if (!has(file, 'image') && file.type.match('image.*')) {
				try {
					const reader = new FileReader();

					reader.onload = (e) => {
						this.files[index].image = e.target.result;

						this.setState({
							files: _g.cloneDeep(this.files),
						});
					};

					reader.readAsDataURL(file);
				} catch (e) {
					//
				}
			}
		});
		//</editor-fold>
	};

	getExtension = (filename) => {
		//<editor-fold defaultstate="collapsed" desc="getExtension">
		return filename.split('.').pop();
		//</editor-fold>
	};

	getReadableFileSize = (bytes) => {
		//<editor-fold defaultstate="collapsed" desc="getReadableFileSize">
		const thresh = 1024;
		if (Math.abs(bytes) < thresh) {
			return bytes + ' bytes';
		}
		const units = ['KB', 'MB', 'GB', 'TB'];
		let u = -1;
		do {
			bytes /= thresh;
			++u;
		} while (Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1) + ' ' + units[u];
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		if (_g.isEmpty(value)) {
			this.files = [];
			this.setState({
				showFileUploadButton: true,
				files: [],
			});

			if (this.fileUploadHandler.current) {
				this.fileUploadHandler.current.clear();
			}
		}
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return '';
		//</editor-fold>
	};

	getFiles = () => {
		//<editor-fold defaultstate="collapsed" desc="getFiles">
		return this.files;
		//</editor-fold>
	};

	onChange = ({ files }) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { multiple } = this.props;

		if (multiple) {
			this.files = concat(this.files, toArray(files));
		} else {
			this.files = toArray(files);
		}

		const { showImagePreview } = this.props;

		if (showImagePreview) {
			this.loadImages();
		}

		this.setState({
			showFileUploadButton: multiple,
			files: toArray(this.files),
		});
		//</editor-fold>
	};

	onDeleteFile = (index) => {
		//<editor-fold defaultstate="collapsed" desc="onDeleteFile">
		this.files.splice(index, 1);

		this.setState({
			showFileUploadButton: true,
			files: _g.cloneDeep(this.files),
		});

		try {
			const dt = new DataTransfer();

			for (let i = 0; i < this.files.length; i++) {
				dt.items.add(this.files[i]);
			}

			this.fileUploadHandler.current.input.current.files = dt.files;
		} catch (e) {
			//console.error(e);
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderFileUploadButton = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFileUploadButton">
		const { title, theme, icon, accept, multiple, disabled, ButtonProps } =
			this.props;
		const { showFileUploadButton } = this.state;

		if (!showFileUploadButton) {
			return null;
		}

		return (
			<div className={classNames['file-upload-button-wrapper']}>
				<FileUploadHandler
					ref={this.fileUploadHandler}
					autoUpload={false}
					multiple={multiple}
					accept={accept}
					disabled={disabled}
					onChange={this.onChange}>
					<Button
						{...ButtonProps}
						theme={theme}
						title={title}
						icon={icon}
						disabled={disabled}
					/>
				</FileUploadHandler>
			</div>
		);
		//</editor-fold>
	};

	renderFiles = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFiles">
		const { files } = this.state;
		const { renderFiles } = this.props;

		if (isFunction(renderFiles)) {
			return renderFiles({ files, classNames, FileInput: this });
		}

		const _files = map(files, this.renderFile);

		return <div className={classNames['files-list-wrapper']}>{_files}</div>;
		//</editor-fold>
	};

	renderFile = (file, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderFile">

		const classNames = this.classNames;
		const { renderFile, showImagePreview } = this.props;

		const name = file.name;
		const extension = this.getExtension(name);
		const size = this.getReadableFileSize(file.size);

		if (isFunction(renderFile)) {
			return renderFile({
				classNames,
				file,
				index,
				name,
				extension,
				size,
				showImagePreview,
				FileInput: this,
			});
		}

		let image = null;

		if (showImagePreview) {
			let src = get(file, 'image');

			if (!_g.isEmpty(src)) {
				image = (
					<Thumbnail
						className={styles['thumbnail']}
						src={src}
						width="50px"
						height="50px"
					/>
				);
			}
		}

		return (
			<div key={index} className={classNames['file']}>
				{image}
				<Icon
					className={classNames['delete-icon']}
					provider="icomoon"
					name="trash"
					onClick={() => {
						this.onDeleteFile(index);
					}}
				/>
				<FileIcon className={classNames['file-icon']} extension={extension} />
				<span className={classNames['file-name']}>{name}</span>
				<span className={classNames['file-size']}>({size})</span>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		return (
			<Fragment>
				{this.renderFileUploadButton(classNames)}
				{this.renderFiles(classNames)}
			</Fragment>
		);
	}
}

FileInput.propTypes = propTypes;

FileInput.defaultProps = defaultProps;

FileInput = WithLocale(FileInput);

export default FileInput;
