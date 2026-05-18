import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import FileLink from 'ui/misc/file_link';
import FileUploadButton from 'ui/file_upload/file_upload_button';
import Form from 'ui/form';
import FormSubmitButton from 'ui/form/form_submit_button';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

import styles from './FileAdministration.module.less';
import { forEach, get, isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	extension: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,

	icon: PropTypes.PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),
	inputName: PropTypes.string,
	showReupload: PropTypes.bool,
	showRename: PropTypes.bool,

	upload: PropTypes.shape({
		url: PropTypes.string.isRequired,
		extraData: PropTypes.object.isRequired,
		parseResponse: PropTypes.func.isRequired,
		onSuccess: PropTypes.func,
		onError: PropTypes.func,
		onFail: PropTypes.func,
	}).isRequired,

	edit: PropTypes.shape({
		url: PropTypes.string.isRequired,
		extraData: PropTypes.object.isRequired,
		parseResponse: PropTypes.func.isRequired,
		onSuccess: PropTypes.func,
		onError: PropTypes.func,
	}).isRequired,

	//customization
	FileUploadButtonProps: PropTypes.object,
	FileLinkProps: PropTypes.object,
	FormProps: PropTypes.object,
	InputProps: PropTypes.object,

	//custom renderers
	render: PropTypes.func,
	renderFileUploadButton: PropTypes.func,
	renderFileLink: PropTypes.func,
	renderForm: PropTypes.func,
	renderInput: PropTypes.func,

	translations: PropTypes.object,
};

const defaultProps = {
	classNames: {},

	icon: {
		provider: 'icomoon',
		name: 'file-empty2',
	},

	inputName: 'display_name',

	showReupload: true,
	showRename: true,

	translations: {
		uploadTitle: 'Upload',
		submitTitle: 'Rename',
		placeholder: 'Filename',
	},
};

class FileAdministration extends Component {
	constructor(props) {
		super(props);

		this.form = React.createRef();

		const { extension, url, name, size } = this.props;

		this.state = {
			extension,
			url,
			name,
			size,
		};
		this.mounted = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;

		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		const updatedState = {};

		forEach(['url', 'extension', 'name', 'size'], (key) => {
			if (!isUndefined(prevProps[key]) && prevProps[key] !== this.props[key]) {
				if (this.state[key] !== this.props[key]) {
					updatedState[key] = this.props[key];
				}
			}
		});

		if (!_g.isEmpty(updatedState)) {
			this.setState(updatedState);
		}
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

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onSuccess, parseResponse } = this.props.upload;
		const parsedResponse = parseResponse(response);

		if (!this.mounted) {
			return;
		}
		const { url, name, extension, size } = parsedResponse;

		this.setState({
			extension: extension,
			url: url,
			name: name,
			size: size,
		});

		if (isFunction(onSuccess)) {
			onSuccess({
				response,
				url,
				name,
				extension,
				size,
				FileAdministration: this,
			});
		}

		//</editor-fold>
	};

	onError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		const { onError } = this.props.upload;

		if (!this.mounted) {
			return;
		}

		if (isFunction(onError)) {
			onError({ response, FileAdministration: this });
		} else {
			showAlert({ content: response.msg });
		}
		//</editor-fold>
	};

	onFail = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onFail } = this.props.upload;

		if (!this.mounted) {
			return;
		}

		if (isFunction(onFail)) {
			onFail({ FileAdministration: this });
		} else {
			showAlert({ content: 'Server error!' });
		}
		//</editor-fold>
	};

	onRenameSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { parseResponse, onSuccess } = this.props.edit;

		const parsedResponse = parseResponse(response);

		if (!this.mounted) {
			return;
		}
		const { name } = parsedResponse;

		this.setState({
			name: name,
		});

		if (isFunction(onSuccess)) {
			onSuccess({ response, name, FileAdministration: this });
		}
		//</editor-fold>
	};

	onRenameError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		const { onError } = this.props.edit;

		if (!this.mounted) {
			return;
		}

		if (isFunction(onError)) {
			onError({ response, FileAdministration: this });
		}
		//</editor-fold>
	};

	onPaste = () => {
		//<editor-fold defaultstate="collapsed" desc="onPaste">
		setTimeout(() => {
			this.form.current.submit();
		}, 300);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderFileUploadButton = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFileUploadButton">
		const {
			renderFileUploadButton,
			FileUploadButtonProps,
			showReupload,
			icon,
			translations,
		} = this.props;

		const title = get(translations, 'uploadTitle', 'Upload');

		const { name } = this.state;

		if (!showReupload && !_g.isEmpty(name)) {
			return null;
		}

		const { url, extraData } = this.props.upload;

		if (isFunction(renderFileUploadButton)) {
			return renderFileUploadButton({
				classNames,
				FileUploadButtonProps,
				url,
				extraData,
				title,
				icon,
				onSuccess: this.onSuccess,
				onError: this.onError,
				onFail: this.onFail,
			});
		}

		return (
			<div className={classNames['file-upload-wrapper']}>
				<FileUploadButton
					action={url}
					extraData={extraData}
					title={title}
					icon={icon}
					multiple={false}
					onSuccess={this.onSuccess}
					onError={this.onError}
					onFail={this.onFail}
					{...FileUploadButtonProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderFileLink = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFileLink">
		const { renderFileLink, FileLinkProps } = this.props;
		const { url, name, extension, size } = this.state;

		if (_g.isEmpty(name)) {
			return null;
		}

		if (isFunction(renderFileLink)) {
			return renderFileLink({
				classNames,
				FileLinkProps,
				url,
				name,
				extension,
				size,
			});
		}

		return (
			<div className={classNames['file-link-wrapper']}>
				<FileLink
					to={url}
					title={`${name}.${extension} ${!_g.isEmpty(size) ? `(${size})` : ''}`}
					extension={extension}
					{...FileLinkProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderForm = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { renderForm, FormProps, showRename, translations } = this.props;

		const submitTitle = get(translations, 'submitTitle', 'Rename');

		const { name } = this.state;

		if (_g.isEmpty(name)) {
			return null;
		}

		if (!showRename) {
			return null;
		}

		const { url, extraData } = this.props.edit;

		if (isFunction(renderForm)) {
			return renderForm({
				classNames,
				FormProps,
				url,
				extraData,
				submitTitle,
				setFormRef: this.setFormRef,
				setSubmitButtonRef: this.setSubmitButtonRef,
				Input: this.renderInput(classNames),
				onSuccess: this.onRenameSuccess,
				onError: this.onRenameError,
			});
		}

		return (
			<Form
				ref={this.form}
				action={url}
				extraData={extraData}
				onSuccess={this.onRenameSuccess}
				onError={this.onRenameError}
				{...FormProps}>
				<div className={classNames['form-wrapper']}>
					{this.renderInput(classNames)}
					<div className={classNames['submit-wrapper']}>
						<FormSubmitButton ButtonProps={{ title: submitTitle }} />
					</div>
				</div>
			</Form>
		);
		//</editor-fold>
	};

	renderInput = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderInput">
		const { renderInput, InputProps, inputName, translations } = this.props;
		const { name } = this.state;

		const placeholder = get(translations, 'placeholder', 'Filename');

		if (isFunction(renderInput)) {
			return renderInput({
				classNames,
				inputName,
				InputProps,
				placeholder,
				FileAdministration: this,
				onPaste: this.onPaste,
			});
		}

		return (
			<div className={classNames['input-wrapper']}>
				<Field
					name={inputName}
					component={Input}
					componentProps={{
						placeholder: placeholder,
						onPaste: this.onPaste,
						...InputProps,
					}}
					value={name}
					isRequired={true}
				/>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { render } = this.props;

		if (isFunction(render)) {
			return render({
				classNames: classNames,
				FileUploadButton: this.renderFileUploadButton(classNames),
				FileLink: this.renderFileLink(classNames),
				Form: this.renderForm(classNames),
			});
		}

		return (
			<div className={classNames['wrapper']}>
				{this.renderFileUploadButton(classNames)}
				{this.renderFileLink(classNames)}
				{this.renderForm(classNames)}
			</div>
		);
	}
}

FileAdministration.propTypes = propTypes;

FileAdministration.defaultProps = defaultProps;

FileAdministration = WithLocale(FileAdministration);

export default FileAdministration;
