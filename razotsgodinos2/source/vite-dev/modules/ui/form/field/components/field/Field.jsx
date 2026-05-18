import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithBrowserDevice from 'hoc/browser/with_browser_device';
import WithLocale from './WithLocale';

import validation from '../../../validation';
import translations from 'assets/translations/ui/form/field';

import styles from './Field.module.less';
import { get, has, isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	name: PropTypes.string.isRequired,
	component: PropTypes.any.isRequired,
	componentProps: PropTypes.object,

	label: PropTypes.string, // if label is undefined it won't render
	value: PropTypes.any,
	defaultValue: PropTypes.any,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,

	//validation
	isRequired: PropTypes.bool,
	isEmail: PropTypes.bool,
	isValidUrl: PropTypes.bool,
	isEqualTo: PropTypes.string,
	mustAccept: PropTypes.bool, //for Checkboxes
	min: PropTypes.number,
	errorMsg: PropTypes.object, //custom error messages
	customValidation: PropTypes.func,

	//customization
	displayType: PropTypes.oneOf(['row', 'column']),
	labelWidth: PropTypes.string,
	inputWidth: PropTypes.string,
	render: PropTypes.func,

	//from hoc
	browserDevice: PropTypes.string,

	//context
	formContext: PropTypes.object.isRequired,
};

const defaultProps = {
	classNames: {},
	componentProps: {},
	errorMsg: {},
};

class Field extends Component {
	constructor(props) {
		super(props);

		this.input = null;
		this.hasFileInput = false;
		this.isRemoteError = false;

		this.state = {
			isInput: false,
			showError: false,
			errorMsg: '',
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { formContext, name } = this.props;
		formContext.Form.register({ name: name, Field: this });
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { formContext, name } = this.props;
		formContext.Form.unregister({ name: name });
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onChange = ({ value, debounce = false, ...extra }) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { name, formContext, onChange } = this.props;

		formContext.Form.onChange({ name, value, debounce });

		if (isFunction(onChange)) {
			onChange({ value, debounce, Field: this, ...extra });
		}

		if (this._validate) {
			this.validate();
		}

		if (this.isRemoteError) {
			this.isRemoteError = false;
			this.setState({
				showError: false,
				errorMsg: '',
			});
		}

		//</editor-fold>
	};

	onSubmit = ({ Input }) => {
		//<editor-fold defaultstate="collapsed" desc="onSubmit">
		if (isUndefined(Input)) {
			return;
		}

		const { formContext, onSubmit } = this.props;

		if (isFunction(onSubmit)) {
			onSubmit({ value: this.input.getValue(), Field: this });
			return;
		}

		const { preventSubmitEvent } = formContext.Form.props;

		if (preventSubmitEvent) {
			return;
		}

		formContext.Form.submit();
		//</editor-fold>
	};

	register = ({ input, isInput = false, isFileInput = false }) => {
		//<editor-fold defaultstate="collapsed" desc="register">
		this.input = input;
		this.hasFileInput = isFileInput;
		this.setState({ isInput: isInput });
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		this.input.setValue(value);
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">

		return this.input.getValue();
		//</editor-fold>
	};

	validate = () => {
		//<editor-fold defaultstate="collapsed" desc="validate">
		this._validate = true;

		const { errorMsg, customValidation, formContext } = this.props;

		for (let key in validation) {
			if (has(this.props, key)) {
				const msg = get(errorMsg, key, translations['en'][key]);
				let check = validation[key]({
					value: this.getValue(),
					validationProp: this.props[key],
					Field: this,
					Form: formContext.Form,
					msg,
				});

				if (!check.passed) {
					this.setState({
						showError: true,
						errorMsg: check.msg,
					});

					return false;
				}
			}
		}

		if (isFunction(customValidation)) {
			let check = customValidation({
				value: this.getValue(),
				validationProp: customValidation,
				Field: this,
				Form: formContext.Form,
			});

			if (!check.passed) {
				this.setState({
					showError: true,
					errorMsg: check.msg,
				});

				return false;
			}
		}

		this._validate = false;
		this.setState({
			showError: false,
			errorMsg: '',
		});

		return true;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderInput = () => {
		//<editor-fold defaultstate="collapsed" desc="renderInput">
		const { component, componentProps, value, disabled, formContext } =
			this.props;

		const { showError } = this.state;
		const { locked } = formContext;

		let _disabled = !isUndefined(disabled) ? disabled : locked;

		if (locked) {
			_disabled = true;
		}

		const inputProps = {
			disabled: _disabled,
			value: value,
			showValidationError: showError,
			onChange: this.onChange,
			onSubmit: this.onSubmit,
			FieldInstance: this,
		};

		return React.createElement(component, { ...componentProps, ...inputProps });
		//</editor-fold>
	};

	renderLabel = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLabel">
		const { label, isRequired, labelWidth } = this.props;

		const className = _g.classNames({
			[classNames['label-wrapper_row']]: this.displayType === 'row',
			[classNames['label-wrapper_column']]: this.displayType === 'column',
			[classNames['label-wrapper_center']]:
				this.displayType === 'row' && this.state.isInput,
		});

		const extra = {};

		if (this.displayType === 'row' && !isUndefined(labelWidth)) {
			extra.style = {
				width: labelWidth,
			};
		}

		return (
			<div className={className} {...extra}>
				<span className={classNames['label']}>{label}</span>
				{isRequired && (
					<span className={classNames['is-required-mark']}> *</span>
				)}
			</div>
		);
		//</editor-fold>
	};

	renderInputWrapper = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderInputWrapper">
		const { inputWidth } = this.props;

		const className = _g.classNames({
			[classNames['input-wrapper_row']]: this.displayType === 'row',
			[classNames['input-wrapper_column']]: this.displayType === 'column',
		});

		const extra = {};

		if (this.displayType === 'row' && !isUndefined(inputWidth)) {
			extra.style = {
				width: inputWidth,
			};
		}

		return (
			<div className={className} {...extra}>
				{this.renderInput()}
				{this.renderError(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderLightInputWrapper = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLightInputWrapper">
		return (
			<Fragment>
				{this.renderInput()}
				{this.renderError(classNames)}
			</Fragment>
		);
		//</editor-fold>
	};

	renderError = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderError">
		const { showError, errorMsg } = this.state;

		if (!showError) {
			return null;
		}

		return (
			<div className={classNames['error-wrapper']} data-name="form-error">
				<span className={classNames['error-msg']}>{errorMsg}</span>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const {
			render,
			browserDevice,
			displayType,
			labelWidth,
			inputWidth,
			isRequired,
			disabled,
			label,
		} = this.props;

		const { showError, errorMsg } = this.state;

		let _displayType;

		if (!isUndefined(displayType)) {
			_displayType = displayType;
		} else {
			_displayType = browserDevice === 'mobile' ? 'column' : 'row';
		}

		this.displayType = _displayType;

		if (isFunction(render)) {
			return render({
				classNames,
				displayType: _displayType,
				labelWidth,
				inputWidth,
				isRequired,
				disabled,
				label,
				showError,
				errorMsg,
				input: this.renderInput(),
				Field: this,
			});
		}

		if (isUndefined(label)) {
			return this.renderLightInputWrapper(classNames);
		}

		const className = _g.classNames(
			classNames['wrapper'],
			{
				[classNames['wrapper_row']]: _displayType === 'row',
			},
			{
				[classNames['wrapper_column']]: _displayType === 'column',
			},
		);

		return (
			<div className={className}>
				{this.renderLabel(classNames)}
				{this.renderInputWrapper(classNames)}
			</div>
		);
	}
}

Field.propTypes = propTypes;

Field.defaultProps = defaultProps;

Field = WithBrowserDevice(Field);

Field = WithLocale(Field);

export default Field;
