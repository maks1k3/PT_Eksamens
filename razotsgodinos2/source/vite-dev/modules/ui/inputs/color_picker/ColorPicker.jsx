import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Color from 'color';

import { ChromePicker } from 'react-color';

import Input from 'ui/inputs/input';
import Dropdown from 'ui/controls/dropdown';

import styles from './ColorPicker.module.less';
import { forEach, get, isFunction, isUndefined, toString } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	value: PropTypes.any,
	valueId: PropTypes.any,

	placeholder: PropTypes.string,

	disabled: PropTypes.bool,
	clearable: PropTypes.bool,

	showInput: PropTypes.bool,
	InputProps: PropTypes.object,
	DropdownProps: PropTypes.object,
	ChromePickerProps: PropTypes.object,

	opened: PropTypes.bool,

	closeOnTab: PropTypes.bool,
	closeOnOutsideClick: PropTypes.bool,

	//callbacks
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onChange: PropTypes.func,

	showValidationError: PropTypes.bool,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	classNames: {},

	// controlled: false,
	// readonly: false,
	disabled: false,
	clearable: false,

	showInput: true,

	opened: false,

	closeOnTab: true,
	closeOnOutsideClick: true,

	showValidationError: false,
};

class ColorPicker extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();

		const value = get(this.props, 'value', '');

		this.value = this.formatValue(value);

		this.state = {
			value: this.formatValue(value),
			valueId: null,
			opened: this.props.opened,
		};
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
		let updatedState = {};

		if (!isUndefined(prevProps.value) && prevProps.value !== this.props.value) {
			if (this.value !== this.props.value) {
				const _value = this.formatValue(this.props.value);

				updatedState.value = _value;
				updatedState.valueId = _g.generateShortId();
			}
		}

		forEach(['opened'], (key) => {
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

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	focus = () => {
		//<editor-fold defaultstate="collapsed" desc="focus">
		this.input.current.focus();
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);

		this.value = value;
		if (this.state.value !== value) {
			const updatedState = {};
			updatedState.value = value;
			updatedState.valueId = _g.generateShortId();

			this.setState(updatedState);
		}
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="formatValue">
		value = toString(value);

		return value;
		//</editor-fold>
	};

	openColorPicker = () => {
		//<editor-fold defaultstate="collapsed" desc="openColorPicker">
		const { opened } = this.state;

		if (opened) {
			return;
		}

		this.onOpen();
		//</editor-fold>
	};

	closeColorPicker = () => {
		//<editor-fold defaultstate="collapsed" desc="closeColorPicker">
		const { opened } = this.state;

		if (!opened) {
			return;
		}

		this.onClose();
		//</editor-fold>
	};

	//get hex or rbg as string from ChromePicker
	decodeColor = (color) => {
		//<editor-fold defaultstate="collapsed" desc="decodeColor">
		const alpha = get(color, 'rgb.a', 1);

		if (alpha < 1) {
			const rgb = get(color, 'rgb', { r: 1, g: 1, b: 1, a: 1 });
			return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
		} else {
			return get(color, 'hex', '');
		}
		//</editor-fold>
	};

	//create color object for ChromePicker
	encodeColor = (color) => {
		//<editor-fold defaultstate="collapsed" desc="encodeColor">
		let result = undefined;

		try {
			const _color = Color(color);
			const rgb = _color.rgb();

			result = {
				r: rgb.color[0],
				g: rgb.color[1],
				b: rgb.color[2],
				a: rgb.valpha,
			};
		} catch (e) {
			//
		}

		return result;
		//</editor-fold>
	};

	getTriggerRef = () => {
		//<editor-fold defaultstate="collapsed" desc="getTriggerRef">
		return this.input.current.getDOMNodeRef();
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { onOpen } = this.props;
		this.setState(
			{
				opened: true,
			},
			() => {
				if (isFunction(onOpen)) {
					onOpen({ ColorPicker: this });
				}
			},
		);
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { onClose } = this.props;
		this.setState(
			{
				opened: false,
			},
			() => {
				if (isFunction(onClose)) {
					onClose({ ColorPicker: this });
				}
			},
		);
		//</editor-fold>
	};

	onInputChange = ({ value }) => {
		//<editor-fold defaultstate="collapsed" desc="onInputChange">
		value = this.formatValue(value);

		this.value = value;

		this.setState({ value });

		const { onChange } = this.props;

		if (isFunction(onChange)) {
			onChange({ value: value, ColorPicker: this, debounce: true });
		}
		//</editor-fold>
	};

	onFocus = () => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		this.openColorPicker();
		//</editor-fold>
	};

	onKeyDown = ({ key }) => {
		//<editor-fold defaultstate="collapsed" desc="onKeyDown">
		const { closeOnTab } = this.props;
		if (key === 'Tab' && closeOnTab) {
			this.closeColorPicker();
		}
		//</editor-fold>
	};

	onColorChange = (color) => {
		//<editor-fold defaultstate="collapsed" desc="onColorChange">
		const _color = this.decodeColor(color);
		const value = this.formatValue(_color);
		this.setValue(value);

		const { onChange } = this.props;

		if (isFunction(onChange)) {
			onChange({ value: value, ColorPicker: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderLeft = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLeft">
		const { value } = this.state;
		const classNames = this.classNames;

		return (
			<div className={classNames['left']}>
				<div
					className={classNames['color']}
					style={{ backgroundColor: value }}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderInput = () => {
		//<editor-fold defaultstate="collapsed" desc="renderInput">
		const {
			showInput,
			InputProps,
			disabled,
			placeholder,
			clearable,
			showValidationError,
		} = this.props;

		if (!showInput) {
			return null;
		}

		const { value, valueId } = this.state;

		return (
			<Input
				{...InputProps}
				ref={this.input}
				placeholder={placeholder}
				value={value}
				valueId={valueId}
				onSearch={this.onInputChange}
				onFocus={this.onFocus}
				onKeyDown={this.onKeyDown}
				autoComplete="off"
				disabled={disabled}
				clearable={clearable}
				showValidationError={showValidationError}
				renderLeft={this.renderLeft}
			/>
		);
		//</editor-fold>
	};

	renderColorPicker = () => {
		//<editor-fold defaultstate="collapsed" desc="renderColorPicker">
		const { ChromePickerProps } = this.props;
		const { value } = this.state;

		return (
			<ChromePicker
				{...ChromePickerProps}
				color={this.encodeColor(value)}
				//onChangeComplete={this.onColorChange}
				onChange={this.onColorChange}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;
		const { disabled, closeOnOutsideClick, DropdownProps } = this.props;
		const { opened } = this.state;

		return (
			<Dropdown
				{...DropdownProps}
				align="auto"
				getTriggerRef={this.getTriggerRef}
				renderTrigger={this.renderInput}
				content={this.renderColorPicker()}
				opened={disabled ? false : opened}
				onClose={this.closeColorPicker}
				closeOnContentClick={false}
				closeOnOutsideClick={closeOnOutsideClick}
				classNames={{
					wrapper: classNames['dropdown-wrapper'],
					content_style: classNames['dropdown-content'],
				}}
			/>
		);
	}
}

ColorPicker.propTypes = propTypes;

ColorPicker.defaultProps = defaultProps;

export default ColorPicker;
