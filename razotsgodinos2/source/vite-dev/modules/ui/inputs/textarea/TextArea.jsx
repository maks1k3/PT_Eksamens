import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import autosize from 'utils/autosize';

import Icon from 'ui/misc/icon';

import styles from './TextArea.module.less';

import {
	debounce,
	isFunction,
	isUndefined,
	keys,
	omit,
	toInteger,
	toString,
	truncate,
	get,
} from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	value: PropTypes.any,
	valueId: PropTypes.any,
	placeholder: PropTypes.string,
	showStyledPlaceholder: PropTypes.bool,

	showValidationError: PropTypes.bool,

	clearable: PropTypes.bool,
	clearIcon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	controlled: PropTypes.bool,

	//events
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
	autoSelect: PropTypes.bool, //select textarea on focus
	autoSize: PropTypes.bool, //autosize textarea

	//extra
	readonly: PropTypes.bool,
	invisible: PropTypes.bool,
	disabled: PropTypes.bool,

	maxChars: PropTypes.number, //maximum chars in textarea
	showCharsLimit: PropTypes.bool,
	showCharsLimitWhenLeft: PropTypes.number, //show chars limit whent chars left <= showWhenLeft

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	showValidationError: false,
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
	autoSize: true,
	readonly: false,
	invisible: false,
	disabled: false,
	showCharsLimit: false,
};

class TextArea extends Component {
	constructor(props) {
		super(props);

		this.textarea = React.createRef();

		const value = get(this.props, 'value', '');
		this.value = this.formatValue(value);

		const { charsLimitVisible } = this.getCharsLimit();

		this.state = {
			focused: false,
			value: this.formatValue(value),
			charsLimitVisible: charsLimitVisible,
		};

		const { onSearch, searchTimeout } = this.props;
		if (isFunction(onSearch)) {
			this._onSearch = debounce(onSearch, searchTimeout);
		}
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { autoSize, FieldInstance } = this.props;
		if (autoSize) {
			autosize(this.textarea.current);
		}

		if (!isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this });
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

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { autoSize } = this.props;
		if (autoSize) {
			autosize.destroy(this.textarea.current);
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
		return this.textarea.current;
		//</editor-fold>
	};

	focus = () => {
		//<editor-fold defaultstate="collapsed" desc="focus">
		if (this.textarea.current) {
			this.textarea.current.focus();
		}
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		this.setState(
			{
				value: value,
			},
			() => {
				this.updateAutoSize();
				this.updateCharsLimit();
			},
		);
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="formatNumber">
		const { maxChars } = this.props;
		value = toString(value);

		if (maxChars) {
			if (value.length > maxChars) {
				value = truncate(value, {
					length: maxChars,
					omission: '',
				});
			}
		}
		return value;
		//</editor-fold>
	};

	getCharsLimit = () => {
		//<editor-fold defaultstate="collapsed" desc="getCharsLimit">
		const { maxChars, showCharsLimitWhenLeft, showCharsLimit } = this.props;

		if (!showCharsLimit) {
			return {
				charsLimitVisible: false,
				charsLeft: 0,
			};
		} else {
			let charsLimitVisible = true;
			let charsLeft = maxChars - this.value.length;

			if (charsLeft < 0) {
				charsLeft = 0;
			}

			if (!isUndefined(showCharsLimitWhenLeft)) {
				charsLimitVisible = false;
				if (this.value.length >= maxChars) {
					charsLimitVisible = true;
				} else {
					charsLimitVisible = charsLeft <= showCharsLimitWhenLeft;
				}
			}

			return {
				charsLimitVisible: charsLimitVisible,
				charsLeft: charsLeft,
			};
		}
		//</editor-fold>
	};

	updateAutoSize = () => {
		//<editor-fold defaultstate="collapsed" desc="updateAutoSize">
		const { autoSize } = this.props;

		if (autoSize) {
			const event = document.createEvent('Event');
			event.initEvent('autosize:update', true, false);

			this.textarea.current.dispatchEvent(event);
		}
		//</editor-fold>
	};

	updateCharsLimit = () => {
		//<editor-fold defaultstate="collapsed" desc="updateCharsLimit">
		const { charsLimitVisible } = this.getCharsLimit();

		if (this.state.charsLimitVisible !== charsLimitVisible) {
			this.setState({
				charsLimitVisible: charsLimitVisible,
			});
		}

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
			onSubmit({ value: this.getValue(), event: e, TextArea: this });
		} else if (isFunction(onKeyUp)) {
			onKeyUp({
				value: this.getValue(),
				targetValue: e.target.value,
				key: e.key,
				event: e,
				TextArea: this,
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
				TextArea: this,
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
				TextArea: this,
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
			onChange({ value: value, event: e, TextArea: this, debounce: true });
		}

		if (isFunction(this._onSearch)) {
			this._onSearch({ value: value, event: e, TextArea: this });
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
			onFocus({ value: this.getValue(), event: e, TextArea: this });
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
			onBlur({ value: this.getValue(), event: e, TextArea: this });
		}
		//</editor-fold>
	};

	onCopy = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onCopy">
		const { onCopy } = this.props;

		if (isFunction(onCopy)) {
			onCopy({ value: this.getValue(), event: e, TextArea: this });
		}
		//</editor-fold>
	};

	onCut = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onCut">
		const { onCut } = this.props;

		if (isFunction(onCut)) {
			onCut({ value: this.getValue(), event: e, TextArea: this });
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
				TextArea: this,
			});
		}
		//</editor-fold>
	};

	onClear = () => {
		//<editor-fold defaultstate="collapsed" desc="onClear">
		const { onChange, onClear } = this.props;

		const e = null;

		this.setValue('');
		this.textarea.current.focus();

		if (isFunction(onChange)) {
			onChange({ value: this.getValue(), event: e, TextArea: this });
		}

		if (isFunction(this._onSearch)) {
			this._onSearch({ value: this.getValue(), event: e, TextArea: this });
		}

		if (isFunction(onClear)) {
			onClear({ value: this.getValue(), event: e, TextArea: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderClearable = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderClearable">
		const { clearable, clearIcon } = this.props;

		const { value } = this.state;

		if (!clearable || value.length === 0) {
			return null;
		}

		return (
			<div className={classNames['clear-icon-wrapper']}>
				<Icon
					className={classNames['clear-icon']}
					provider={clearIcon.provider}
					name={clearIcon.name}
					onClick={this.onClear}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderTextArea = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTextArea">
		const otherProps = omit(this.props, keys(propTypes));
		const {
			readonly,
			disabled,
			autoFocus,
			onCopy,
			onCut,
			onPaste,
			onKeyDown,
			onKeyPress,
			placeholder,
			showStyledPlaceholder,
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

		if (!_g.isEmpty(placeholder) && !showStyledPlaceholder) {
			extra.placeholder = placeholder;
		}

		return (
			<textarea
				{...otherProps}
				ref={this.textarea}
				className={classNames['textarea']}
				value={value}
				readOnly={readonly}
				disabled={disabled}
				onKeyUp={this.onKeyUp}
				onChange={this.onChange}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				{...extra}
			/>
		);
		//</editor-fold>
	};

	renderStyledPlaceholder = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderStyledPlaceholder">
		const { showStyledPlaceholder, placeholder } = this.props;
		const { value } = this.state;

		if (!showStyledPlaceholder || value.length > 0) {
			return null;
		}

		return (
			<div className={classNames['styled-placeholder-wrapper']}>
				<span className={classNames['styled-placeholder']}>{placeholder}</span>
			</div>
		);
		//</editor-fold>
	};

	renderCharsLimit = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCharsLimit">
		const { showCharsLimit, maxChars } = this.props;
		const { charsLimitVisible, value } = this.state;

		if (!showCharsLimit) {
			return null;
		}
		return (
			<div className={classNames['chars-limit-wrapper']}>
				<span className={classNames['chars-limit']}>
					{charsLimitVisible && `${value.length}/${toInteger(maxChars)}`}
				</span>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { disabled, invisible, showValidationError, showCharsLimit } =
			this.props;
		const { focused } = this.state;

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_error']]: showValidationError && !invisible,
			[classNames['wrapper_focused']]: focused && !invisible,
			[classNames['wrapper_disabled']]: disabled && !invisible,
			[classNames['wrapper_invisible']]: invisible,
			[classNames['wrapper_show-chars-limit']]: showCharsLimit,
		});

		return (
			<div className={className}>
				{this.renderClearable(classNames)}
				{this.renderTextArea(classNames)}
				{this.renderStyledPlaceholder(classNames)}
				{this.renderCharsLimit(classNames)}
			</div>
		);
	}
}

TextArea.propTypes = propTypes;

TextArea.defaultProps = defaultProps;

export default TextArea;
