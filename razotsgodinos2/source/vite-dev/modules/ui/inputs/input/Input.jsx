import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'ui/misc/icon';

import styles from './Input.module.less';
import {
	debounce,
	get,
	isFunction,
	isUndefined,
	keys,
	omit,
	trimStart,
	truncate,
	toString,
} from 'lodash-es';
import Image from 'ui/media/image';

const propTypes = {
	classNames: PropTypes.object,
	type: PropTypes.string,

	value: PropTypes.any,
	valueId: PropTypes.any,
	placeholder: PropTypes.string,
	showStyledPlaceholder: PropTypes.bool,

	icon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	clearable: PropTypes.bool,
	clearIcon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	controlled: PropTypes.bool,

	//callbacks
	onSubmit: PropTypes.func,
	onSearch: PropTypes.func, //fires when user finished typing
	searchTimeout: PropTypes.number, //number of milliseconds when search will fire
	onKeyUp: PropTypes.func, //onKeyUp
	onKeyDown: PropTypes.func, //onKeyDown
	onKeyPress: PropTypes.func, //onKeyPress
	onChange: PropTypes.func, //onChange
	onFocus: PropTypes.func, //onFocus
	onBlur: PropTypes.func, //onBlur
	onCopy: PropTypes.func, //onCopy
	onCut: PropTypes.func, //onCut
	onPaste: PropTypes.func, //onPaste
	onClear: PropTypes.func, //onClear custom callback for clear icon click

	autoFocus: PropTypes.bool,
	autoSelect: PropTypes.bool, //select input on focus

	style: PropTypes.object,
	inputStyle: PropTypes.object,

	//extra
	readonly: PropTypes.bool,
	invisible: PropTypes.bool,
	disabled: PropTypes.bool,
	loading: PropTypes.bool, //loading state

	customFormat: PropTypes.func, //custom callback to format input value
	max: PropTypes.number, //max input value
	number: PropTypes.shape({
		allowNegative: PropTypes.bool.isRequired,
		allowDecimal: PropTypes.bool.isRequired,
	}),

	//browser options
	autoComplete: PropTypes.oneOf(['on', 'off']),

	//customization
	renderLeft: PropTypes.func,
	renderRight: PropTypes.func,

	showValidationError: PropTypes.bool,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	classNames: {},

	showStyledPlaceholder: false,
	clearable: false,
	clearIcon: {
		provider: 'icomoon',
		name: 'cross3',
	},
	controlled: false,
	searchTimeout: 400,
	autoFocus: false,
	autoSelect: false,
	readonly: false,
	invisible: false,
	disabled: false,
	loading: false,
	showValidationError: false,
};

const patterns = {
	allowNegativeAndAllowDecimal: /^-?\d*\.?\d*$/,
	allowNegative: /^-?\d*$/,
	allowDecimal: /^\d*\.?\d*$/,
	onlyNumbers: /^\d*$/,
};

class Input extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();

		const value = get(this.props, 'value', '');

		this.value = this.formatValue(value);

		this.state = {
			focused: false,
			value: this.formatValue(value),
		};

		const { onSearch, searchTimeout } = this.props;
		if (isFunction(onSearch)) {
			this._onSearch = debounce(onSearch, searchTimeout);
		}
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { FieldInstance } = this.props;

		if (!isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this, isInput: true });
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.value !== this.props.value) {
			if (this.value !== this.props.value) {
				this.setValue(this.props.value);
			}
		}

		if (prevProps.valueId !== this.props.valueId) {
			this.setValue(this.props.value);
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	getDOMNode = () => {
		//<editor-fold defaultstate="collapsed" desc="getDOMNode">
		return this.input.current;
		//</editor-fold>
	};

	getDOMNodeRef = () => {
		//<editor-fold defaultstate="collapsed" desc="getDOMNodeRef">
		return this.input;
		//</editor-fold>
	};

	focus = () => {
		//<editor-fold defaultstate="collapsed" desc="focus">
		if (this.input.current) {
			this.input.current.focus();
		}
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		this.setState({
			value: value,
		});
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="formatValue">
		const { max, number, customFormat } = this.props;
		value = toString(value);

		if (isFunction(customFormat)) {
			return customFormat({ value, previousValue: this.value, Input: this });
		}

		if (max) {
			if (value.length > max) {
				value = truncate(value, {
					length: max,
					omission: '',
				});
			}
		} else if (!isUndefined(number)) {
			value = this.formatNumber(value);
		}

		value = trimStart(value);

		return value;
		//</editor-fold>
	};

	formatNumber = (value) => {
		//<editor-fold defaultstate="collapsed" desc="formatNumber">
		const { number } = this.props;
		const { allowNegative, allowDecimal } = number;
		value = value.replace(/\,/g, '.');
		let pattern;

		if (allowNegative && allowDecimal) {
			pattern = patterns.allowNegativeAndAllowDecimal;
		} else if (allowNegative) {
			pattern = patterns.allowNegative;
		} else if (allowDecimal) {
			pattern = patterns.allowDecimal;
		} else {
			pattern = patterns.onlyNumbers;
		}

		if (!pattern.test(value)) {
			return this.value;
		}

		return value;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onKeyUp = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onKeyUp">
		const { onSubmit, onKeyUp } = this.props;

		if (isFunction(onSubmit) && e.key === 'Enter') {
			if (this.state.focused) {
				this.setState({
					focused: false,
				});
			}
			onSubmit({ value: this.getValue(), event: e, Input: this });
		} else if (isFunction(onKeyUp)) {
			onKeyUp({
				value: this.getValue(),
				targetValue: e.target.value,
				key: e.key,
				event: e,
				Input: this,
			});
		}
		//</editor-fold>
	};

	onKeyDown = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onKeyUp">
		const { onKeyDown } = this.props;

		if (isFunction(onKeyDown)) {
			onKeyDown({
				value: this.getValue(),
				targetValue: e.target.value,
				key: e.key,
				event: e,
				Input: this,
			});
		}
		//</editor-fold>
	};

	onKeyPress = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onKeyPress">
		const { onKeyPress } = this.props;

		if (isFunction(onKeyPress)) {
			onKeyPress({
				value: this.getValue(),
				targetValue: e.target.value,
				key: e.key,
				event: e,
				Input: this,
			});
		}
		//</editor-fold>
	};

	onChange = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, controlled } = this.props;
		let value = e.target.value;

		if (!controlled) {
			this.setValue(value);
		}

		if (controlled) {
			value = this.formatValue(value);
		} else {
			value = this.getValue();
		}

		if (isFunction(onChange)) {
			onChange({ value: value, event: e, Input: this, debounce: true });
		}

		if (isFunction(this._onSearch)) {
			this._onSearch({ value: value, event: e, Input: this });
		}
		//</editor-fold>
	};

	onFocus = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		this.setState({
			focused: true,
		});

		const { autoSelect, onFocus } = this.props;

		if (isFunction(onFocus)) {
			onFocus({ value: this.getValue(), event: e, Input: this });
		}

		if (autoSelect) {
			e.target.select();
		}
		//</editor-fold>
	};

	onBlur = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onBlur">

		this.setState({
			focused: false,
		});

		const { onBlur } = this.props;

		if (isFunction(onBlur)) {
			onBlur({ value: this.getValue(), event: e, Input: this });
		}
		//</editor-fold>
	};

	onCopy = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onCopy">
		const { onCopy } = this.props;

		if (isFunction(onCopy)) {
			onCopy({ value: this.getValue(), event: e, Input: this });
		}
		//</editor-fold>
	};

	onCut = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onCut">
		const { onCut } = this.props;

		if (isFunction(onCut)) {
			onCut({ value: this.getValue(), event: e, Input: this });
		}
		//</editor-fold>
	};

	onPaste = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onPaste">
		const { onPaste } = this.props;

		if (isFunction(onPaste)) {
			onPaste({
				value: this.getValue(),
				pasted: e.clipboardData.getData('Text'),
				event: e,
				Input: this,
			});
		}
		//</editor-fold>
	};

	onClear = () => {
		//<editor-fold defaultstate="collapsed" desc="onClear">
		const { onChange, onClear, onSearch } = this.props;

		const e = null;

		this.setValue('');
		this.input.current.focus();

		if (isFunction(onChange)) {
			onChange({ value: this.getValue(), event: e, Input: this });
		}

		if (isFunction(onSearch)) {
			onSearch({ value: this.getValue(), event: e, Input: this });
		}

		if (isFunction(onClear)) {
			onClear({ value: this.getValue(), event: e, Input: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderInput = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderInput">
		const otherProps = omit(this.props, keys(propTypes));
		const {
			type,
			readonly,
			disabled,
			autoComplete,
			autoFocus,
			onCopy,
			onCut,
			onPaste,
			onKeyDown,
			onKeyPress,
			placeholder,
			showStyledPlaceholder,
			renderLeft,
			renderRight,
			icon,
			clearable,
			inputStyle,
		} = this.props;

		const value = this.state.value;

		const extra = {};

		if (autoFocus) {
			extra.autoFocus = autoFocus;
		}

		if (onCopy) {
			extra.onCopy = this.onCopy;
		}

		if (onCut) {
			extra.onCut = this.onCut;
		}

		if (onPaste) {
			extra.onPaste = this.onPaste;
		}

		if (onKeyDown) {
			extra.onKeyDown = this.onKeyDown;
		}

		if (onKeyPress) {
			extra.onKeyPress = this.onKeyPress;
		}

		if (!_g.isEmpty(placeholder)) {
			if (showStyledPlaceholder) {
				extra.placeholder = '';
			} else {
				extra.placeholder = placeholder;
			}
		}

		const className = _g.classNames(
			classNames['input'],
			{
				[classNames['input_with-left']]:
					isFunction(renderLeft) || !isUndefined(icon),
			},
			{
				[classNames['input_with-right']]: isFunction(renderRight) || clearable,
			},
		);

		return (
			<input
				{...otherProps}
				ref={this.input}
				type={type}
				className={className}
				value={value}
				readOnly={readonly}
				disabled={disabled}
				onKeyUp={this.onKeyUp}
				onChange={this.onChange}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				autoComplete={autoComplete}
				style={inputStyle}
				{...extra}
			/>
		);
		//</editor-fold>
	};

	renderStyledPlaceholder = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderStyledPlaceholder">
		const {
			showStyledPlaceholder,
			placeholder,
			renderLeft,
			icon,
			renderRight,
			clearable,
		} = this.props;
		const { value } = this.state;

		if (!showStyledPlaceholder || value.length > 0) {
			return null;
		}

		const className = _g.classNames(
			classNames['styled-placeholder-wrapper'],
			{
				[classNames['input_with-left']]:
					isFunction(renderLeft) || !isUndefined(icon),
			},
			{
				[classNames['input_with-right']]: isFunction(renderRight) || clearable,
			},
		);

		return (
			<div className={className}>
				<span className={classNames['styled-placeholder']}>{placeholder}</span>
			</div>
		);
		//</editor-fold>
	};

	renderLeft = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLeft">
		const { renderLeft, icon } = this.props;

		if (isFunction(renderLeft)) {
			return renderLeft({
				classNames,
				icon,
				Input: this,
			});
		}

		if (isUndefined(icon)) {
			return null;
		}
		const iconType = typeof icon === 'object' ? 'object' : 'string';

		return (
			<div className={classNames['left']}>
				{iconType === 'object' ? (
					<Icon
						className={classNames['icon']}
						provider={icon.provider}
						name={icon.name}
					/>
				) : (
					<Image src={icon} className={classNames['image_icon']} />
				)}
			</div>
		);
		//</editor-fold>
	};

	renderCenter = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCenter">
		return (
			<div className={classNames['center']}>
				{this.renderStyledPlaceholder(classNames)}
				{this.renderInput(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderRight = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderRight">
		const { renderRight, clearable, clearIcon, loading } = this.props;

		const { value } = this.state;

		if (isFunction(renderRight)) {
			return renderRight({
				classNames,
				clearable,
				clearIcon,
				loading,
				value,
				Input: this,
			});
		}

		if (!clearable) {
			return null;
		}

		let content;

		if (!loading && clearable && value.length > 0) {
			content = (
				<Icon
					className={classNames['clear-icon']}
					provider={clearIcon.provider}
					name={clearIcon.name}
					onClick={this.onClear}
				/>
			);
		}

		const extra = {};

		if (_g.isEmpty(content)) {
			extra.onClick = this.focus;
		}

		return (
			<div className={classNames['right']} {...extra}>
				{content}
			</div>
		);
		//</editor-fold>
	};

	renderLoading = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLoading">
		const { loading } = this.props;

		if (!loading) {
			return null;
		}

		return (
			<div className={classNames['loading-wrapper']}>
				<div className={classNames['loading']} />
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { disabled, invisible, showValidationError, style } = this.props;
		const { focused } = this.state;

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_error']]: showValidationError && !invisible,
			[classNames['wrapper_focused']]: focused && !invisible,
			[classNames['wrapper_disabled']]: disabled && !invisible,
			[classNames['wrapper_invisible']]: invisible,
		});

		return (
			<div className={className} style={style}>
				{this.renderLeft(classNames)}
				{this.renderCenter(classNames)}
				{this.renderRight(classNames)}
				{this.renderLoading(classNames)}
			</div>
		);
	}
}

Input.propTypes = propTypes;

Input.defaultProps = defaultProps;

export default Input;
