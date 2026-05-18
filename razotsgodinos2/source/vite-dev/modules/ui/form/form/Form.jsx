import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import FormContext from './FormContext';
import FormResponse from '../form_response';
import FormSubmitButton from '../form_submit_button';
import {
	debounce,
	find,
	forEach,
	get,
	has,
	head,
	isFunction,
	isNull,
	isUndefined,
	set,
	size,
	toString,
	unset,
} from 'lodash-es';

const propTypes = {
	action: PropTypes.string, //url to server

	name: PropTypes.string, //autosave and restore from Redux

	refresh: PropTypes.bool, //reset form after each submit
	autoSubmit: PropTypes.bool, //submit form on every input change
	extraData: PropTypes.object, //extra data that will be submitted to server

	//ui
	submit: PropTypes.object, //Button proptypes if not provided there will be no submit button
	submitPosition: PropTypes.oneOf(['left', 'right', 'center']),
	renderSubmit: PropTypes.func, //override default form submit

	showSuccess: PropTypes.bool, //show AlertBox when form is submitted successfully
	showError: PropTypes.bool, //show AlertBox when form submission failed
	showResponse: PropTypes.bool,

	//if confirmation provided form will be submitted only after confirmation
	confirmation: PropTypes.shape({
		title: PropTypes.string,
		text: PropTypes.string,
		theme: PropTypes.string,
		confirm: PropTypes.string,
		cancel: PropTypes.string,
		onConfirm: PropTypes.func,
		onCancel: PropTypes.func,
		classNames: PropTypes.object,
		settings: PropTypes.object,
	}),

	preventSubmitEvent: PropTypes.bool, //do not submit on Input submit event

	//callbacks
	onRemoteRequest: PropTypes.func, //override default remote request
	onSubmit: PropTypes.func, //overrides forms onSubmit event
	onProcess: PropTypes.func, //lock form and perform some async operation
	onValidate: PropTypes.func, //apply extra validations before submit occurs
	onChange: PropTypes.func, //listens to all inputs change
	searchTimeout: PropTypes.number, //number of milliseconds when search will fire
	onBeforeSubmit: PropTypes.func, //here you can do some manipulation with data before it will be submitted
	onSuccess: PropTypes.func, //fires after successful submit to server
	onError: PropTypes.func, //fires after submit to server failed
	onFail: PropTypes.func, //fires on server error
	onValidationFailed: PropTypes.func, //fires when validation fails

	debounce: PropTypes.bool, // if false fire onChange without debounce

	//Field customization
	FieldProps: PropTypes.object, //apply this properties for every Field inside Form

	children: PropTypes.node,
};

const defaultProps = {
	submitPosition: 'right',
	refresh: false,
	autoSubmit: false,
	extraData: {},
	showSuccess: true,
	showError: true,
	showResponse: true,
	searchTimeout: 400,
	preventSubmitEvent: false,
	debounce: true,
	FieldProps: {},
};

class Form extends Component {
	constructor(props) {
		super(props);

		this.hasFileInput = false;

		this.fields = {};

		this.locked = false;
		this.validated = false;
		this.confirmed = false;
		this.defaultValues = {};

		this.state = {
			Form: this,
			locked: false,
			response: {
				show: false,
				type: 'success',
				content: '',
			},
		};

		const { searchTimeout } = this.props;

		this._onDebounceChange = debounce(this.onDebounceChange, searchTimeout);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		this.subscribeToEvents();
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		this.unSubscribeToEvents();
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	subscribeToEvents = () => {
		//<editor-fold defaultstate="collapsed" desc="subscribeToEvents">
		const { name: formName } = this.props;
		if (isUndefined(formName)) {
			return;
		}

		ee.on(events.form.clear, this.onClearEvent);
		ee.on(events.form.getData, this.onGetDataEvent);
		ee.on(events.form.hideResponse, this.onHideResponseEvent);
		ee.on(events.form.lock, this.onLockEvent);
		ee.on(events.form.reset, this.onResetEvent);
		ee.on(events.form.showError, this.onShowErrorEvent);
		ee.on(events.form.showSuccess, this.onShowSuccessEvent);
		ee.on(events.form.submit, this.onSubmitEvent);
		ee.on(events.form.unLock, this.onUnLockEvent);
		ee.on(events.form.update, this.onUpdateEvent);
		//</editor-fold>
	};

	unSubscribeToEvents = () => {
		//<editor-fold defaultstate="collapsed" desc="unSubscribeToEvents">
		const { name: formName } = this.props;

		if (isUndefined(formName)) {
			return;
		}

		ee.off(events.form.clear, this.onClearEvent);
		ee.off(events.form.getData, this.onGetDataEvent);
		ee.off(events.form.hideResponse, this.onHideResponseEvent);
		ee.off(events.form.lock, this.onLockEvent);
		ee.off(events.form.reset, this.onResetEvent);
		ee.off(events.form.showError, this.onShowErrorEvent);
		ee.off(events.form.showSuccess, this.onShowSuccessEvent);
		ee.off(events.form.submit, this.onSubmitEvent);
		ee.off(events.form.unLock, this.onUnLockEvent);
		ee.off(events.form.update, this.onUpdateEvent);
		//</editor-fold>
	};

	onClearEvent = ({ formName }) => {
		//<editor-fold defaultstate="collapsed" desc="onClearEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.clear();
		//</editor-fold>
	};

	onGetDataEvent = ({ formName, callback }) => {
		//<editor-fold defaultstate="collapsed" desc="onGetDataEvent">
		if (this.props.name !== formName) {
			return;
		}

		callback(this.getData());
		//</editor-fold>
	};

	onHideResponseEvent = ({ formName }) => {
		//<editor-fold defaultstate="collapsed" desc="onHideResponseEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.hideResponse();
		//</editor-fold>
	};

	onLockEvent = ({ formName }) => {
		//<editor-fold defaultstate="collapsed" desc="onLockEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.lock();
		//</editor-fold>
	};

	onResetEvent = ({ formName }) => {
		//<editor-fold defaultstate="collapsed" desc="onResetEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.reset();
		//</editor-fold>
	};

	onShowErrorEvent = ({ formName, content }) => {
		//<editor-fold defaultstate="collapsed" desc="onShowErrorEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.showError(content);
		//</editor-fold>
	};

	onShowSuccessEvent = ({ formName, content }) => {
		//<editor-fold defaultstate="collapsed" desc="onShowSuccessEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.showSuccess(content);
		//</editor-fold>
	};

	onSubmitEvent = ({ formName }) => {
		//<editor-fold defaultstate="collapsed" desc="onSubmitEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.submit();
		//</editor-fold>
	};

	onUnLockEvent = ({ formName }) => {
		//<editor-fold defaultstate="collapsed" desc="onUnLockEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.unLock();
		//</editor-fold>
	};

	onUpdateEvent = ({ formName, data }) => {
		//<editor-fold defaultstate="collapsed" desc="onUpdateEvent">
		if (this.props.name !== formName) {
			return;
		}

		this.update(data);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	register = ({ name, Field }) => {
		//<editor-fold defaultstate="collapsed" desc="register">
		const { name: formName } = this.props;

		set(this.fields, name, Field);

		if (Field.hasFileInput) {
			this.hasFileInput = true;
		}

		const defaultValue = has(Field.props, 'defaultValue')
			? Field.props.defaultValue
			: Field.props.value;

		set(this.defaultValues, name, toString(defaultValue));

		if (!isUndefined(formName)) {
			const value = uiStore.get(`Forms.${formName}.${name}`, null);

			if (!isNull(value)) {
				Field.setValue(value);
			}
		}
		//</editor-fold>
	};

	unregister = ({ name }) => {
		//<editor-fold defaultstate="collapsed" desc="unregister">
		const Field = get(this.fields, name, null);
		let checkIfHasFileInput = false;

		if (!isNull(Field) && Field.hasFileInput) {
			checkIfHasFileInput = true;
		}

		unset(this.fields, name);
		unset(this.defaultValues, name);

		if (checkIfHasFileInput) {
			const found = find(this.fields, (f) => f.hasFileInput);

			this.hasFileInput = !isUndefined(found);
		}
		//</editor-fold>
	};

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const data = {};

		forEach(this.fields, (fieldInstance, name) => {
			let value = fieldInstance.getValue();
			data[name] = value;
		});

		return data;
		//</editor-fold>
	};

	lock = () => {
		//<editor-fold defaultstate="collapsed" desc="lock">
		this.locked = true;

		if (this.mounted) {
			this.setState({
				locked: true,
			});
		}
		//</editor-fold>
	};

	unLock = () => {
		//<editor-fold defaultstate="collapsed" desc="unLock">
		this.locked = false;
		this.validated = false;
		this.confirmed = false;

		if (this.mounted) {
			this.setState({
				locked: false,
			});
		}
		//</editor-fold>
	};

	//update inputs
	update = (data) => {
		//<editor-fold defaultstate="collapsed" desc="update">
		const { name: formName } = this.props;

		forEach(data, (value, name) => {
			if (has(this.fields, name)) {
				this.fields[name].setValue(value);
			}
		});

		if (!isUndefined(formName)) {
			uiStore.update(`Forms.${formName}`, data);
		}
		//</editor-fold>
	};

	submit = () => {
		//<editor-fold defaultstate="collapsed" desc="submit">
		if (this.locked) {
			return;
		}

		if (!this.validated) {
			this.validate();
			return;
		}

		const {
			confirmation,
			onSubmit,
			onProcess,
			onBeforeSubmit,
			refresh,
			extraData,
		} = this.props;

		if (!isUndefined(confirmation) && !this.confirmed) {
			this.confirm();
			return;
		}

		let data = this.getData();

		data = { ...extraData, ...data };

		if (isFunction(onBeforeSubmit)) {
			onBeforeSubmit({ data, Form: this });
		}

		data = this.prepareData(data);
		this.data = data;

		if (isFunction(onSubmit)) {
			onSubmit({ data, Form: this });

			if (refresh) {
				this.reset();
			}
			return;
		}

		if (isFunction(onProcess)) {
			this.lock();
			onProcess({ data, Form: this });
			return;
		}

		this.remoteRequest(data);
		//</editor-fold>
	};

	prepareData = (oldData) => {
		//<editor-fold defaultstate="collapsed" desc="prepareData">
		if (!this.hasFileInput) {
			return oldData;
		}

		const data = new FormData();

		//add input values
		forEach(oldData, (value, name) => {
			data.append(name, toString(value));
		});

		//add files
		forEach(this.fields, (field, name) => {
			if (field.hasFileInput) {
				const files = field.input.getFiles();

				if (size(files) === 1) {
					data.append(name, head(files), head(files).name);
				} else {
					let index = 0;
					forEach(files, (file) => {
						data.append(`${name}[${index}]`, file, file.name);
						index++;
					});
				}
			}
		});

		return data;
		//</editor-fold>
	};

	reset = () => {
		//<editor-fold defaultstate="collapsed" desc="reset">
		if (this.locked) {
			return;
		}

		const { name: formName } = this.props;

		forEach(this.fields, (fieldInstance, name) => {
			if (has(this.defaultValues, name)) {
				fieldInstance.setValue(this.defaultValues[name]);

				if (!isUndefined(formName)) {
					uiStore.set(
						`Forms.${formName}.${name}`,
						toString(this.defaultValues[name]),
					);
				}
			}
		});
		//</editor-fold>
	};

	clear = () => {
		//<editor-fold defaultstate="collapsed" desc="clear">
		if (this.locked) {
			return;
		}

		const { name: formName } = this.props;

		forEach(this.fields, (fieldInstance) => {
			fieldInstance.setValue('');
		});

		if (!isUndefined(formName)) {
			uiStore.remove(`Forms.${formName}`);
		}
		//</editor-fold>
	};

	validate = () => {
		//<editor-fold defaultstate="collapsed" desc="validate">
		const { onValidate, onValidationFailed } = this.props;
		const validationResults = [];

		forEach(this.fields, (fieldInstance) => {
			validationResults.push(fieldInstance.validate());
		});

		if (!_g.inArray(false, validationResults)) {
			if (isFunction(onValidate)) {
				onValidate({ Form: this });
			} else {
				this.validated = true;
				this.submit();
			}
		} else {
			if (isFunction(onValidationFailed)) {
				onValidationFailed({ Form: this });
			}
		}
		//</editor-fold>
	};

	confirm = () => {
		//<editor-fold defaultstate="collapsed" desc="confirm">
		const { confirmation } = this.props;

		openPopup({
			name: 'confirmation',
			data: {
				title: get(confirmation, 'title', 'Confirm action'),
				text: get(confirmation, 'text', 'Are you sure?'),
				theme: get(confirmation, 'theme', 'danger'),
				confirm: get(confirmation, 'confirm', 'Confirm'),
				cancel: get(confirmation, 'cancel', 'Cancel'),
				classNames: get(confirmation, 'classNames', undefined),
				onConfirm: () => {
					this.confirmed = true;
					this.submit();
				},
			},
			settings: get(confirmation, 'settings', undefined),
		});
		//</editor-fold>
	};

	remoteRequest = (data) => {
		//<editor-fold defaultstate="collapsed" desc="remoteRequest">
		const { action, onRemoteRequest } = this.props;

		if (isUndefined(action) && !isFunction(onRemoteRequest)) {
			return;
		}

		this.lock();

		if (isFunction(onRemoteRequest)) {
			onRemoteRequest({
				data,
				Form: this,
			});
			return;
		}

		remoteRequest({
			url: action,
			data: data,
			onSuccess: this.onRemoteRequestSuccess,
			onError: this.onRemoteRequestError,
			onFail: this.onRemoteRequestFail,
		});
		//</editor-fold>
	};

	onRemoteRequestSuccess = (response) => {
		//<editor-fold defaultstate="collapsed" desc="onRemoteRequestSuccess">
		const { onSuccess, showSuccess, refresh } = this.props;

		if (showSuccess && has(response, 'msg')) {
			this.showSuccess(response.msg);
		} else {
			this.unLock();
		}

		if (isFunction(onSuccess)) {
			onSuccess({ data: this.data, Form: this, response: response });
		}

		if (refresh) {
			this.reset();
		}
		//</editor-fold>
	};

	onRemoteRequestError = (response) => {
		//<editor-fold defaultstate="collapsed" desc="onRemoteRequestError">
		const { onError, showError } = this.props;

		if (showError && has(response, 'msg')) {
			if (has(response, 'field')) {
				const field = get(this.fields, response.field, null);

				if (isNull(field)) {
					this.showError(response.msg);
				} else {
					field.isRemoteError = true;
					field.setState({
						showError: true,
						errorMsg: response.msg,
					});
					this.unLock();
				}
			} else {
				this.showError(response.msg);
			}
		} else {
			this.unLock();
		}

		if (isFunction(onError)) {
			onError({ data: this.data, Form: this, response: response });
		}
		//</editor-fold>
	};

	onRemoteRequestFail = (response) => {
		//<editor-fold defaultstate="collapsed" desc="onRemoteRequestFail">
		const { onFail } = this.props;

		if (_g.isDebugMode()) {
			this.unLock();
		}

		if (isFunction(onFail)) {
			onFail({ data: this.data, Form: this, response: response });
		}
		//</editor-fold>
	};

	showSuccess = (content) => {
		//<editor-fold defaultstate="collapsed" desc="showSuccess">
		this.locked = false;
		this.validated = false;
		this.confirmed = false;

		if (this.mounted) {
			this.setState({
				locked: false,
				response: {
					show: true,
					type: 'success',
					content: content,
				},
			});
		}
		//</editor-fold>
	};

	showError = (content) => {
		//<editor-fold defaultstate="collapsed" desc="showError">
		this.locked = false;
		this.validated = false;
		this.confirmed = false;

		if (this.mounted) {
			this.setState({
				locked: false,
				response: {
					show: true,
					type: 'error',
					content: content,
				},
			});
		}
		//</editor-fold>
	};

	hideResponse = () => {
		//<editor-fold defaultstate="collapsed" desc="hideResponse">
		if (this.mounted) {
			this.setState({
				response: {
					show: false,
					type: 'success',
					content: '',
				},
			});
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onChange = ({ name, value, debounce }) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, autoSubmit, name: formName } = this.props;

		const data = this.getData();

		if (debounce && this.props.debounce) {
			this._onDebounceChange({ data, Form: this, changed: name, value });
		} else {
			if (isFunction(onChange)) {
				onChange({ data, Form: this, changed: name, value });
			}

			if (!isUndefined(formName)) {
				uiStore.set(`Forms.${formName}.${name}`, toString(value));
			}

			if (autoSubmit) {
				this.submit();
			}
		}

		//</editor-fold>
	};

	onDebounceChange = ({ data, Form, changed, value }) => {
		//<editor-fold defaultstate="collapsed" desc="onDebounceChange">
		const { onChange, autoSubmit, name: formName } = this.props;

		if (isFunction(onChange)) {
			onChange({ data, Form, changed, value });
		}

		if (!isUndefined(formName)) {
			uiStore.set(`Forms.${formName}.${changed}`, toString(value));
		}

		if (autoSubmit) {
			this.submit();
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderFormResponse = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFormResponse">
		const { showResponse } = this.props;

		if (!showResponse) {
			return null;
		}

		return <FormResponse />;
		//</editor-fold>
	};

	renderFormSubmitButton = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFormSubmitButton">
		const { submit, submitPosition, renderSubmit } = this.props;

		if (isUndefined(submit)) {
			return null;
		}

		const submitButton = <FormSubmitButton ButtonProps={submit} />;

		if (isFunction(renderSubmit)) {
			return renderSubmit({ submitButton, Form: this });
		}

		return <div style={{ textAlign: submitPosition }}>{submitButton}</div>;
		//</editor-fold>
	};

	render() {
		const { children, FieldProps } = this.props;

		const value = { ...this.state, ...{ FieldProps } };

		return (
			<FormContext.Provider value={value}>
				{this.renderFormResponse()}
				{children}
				{this.renderFormSubmitButton()}
			</FormContext.Provider>
		);
	}
}

Form.propTypes = propTypes;

Form.defaultProps = defaultProps;

export default Form;
