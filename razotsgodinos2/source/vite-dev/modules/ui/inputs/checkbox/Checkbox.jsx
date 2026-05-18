import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.less';
import { get, isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	theme: PropTypes.oneOf([
		'main',
		'primary',
		'success',
		'info',
		'warning',
		'danger',
		'custom',
	]),
	value: PropTypes.any, //'0' or '1'
	valueId: PropTypes.any,
	controlled: PropTypes.bool,

	//callbacks
	onChange: PropTypes.func,
	onFocus: PropTypes.func, //onFocus
	onBlur: PropTypes.func, //onBlur

	disabled: PropTypes.bool,
	readonly: PropTypes.bool,
	showValidationError: PropTypes.bool,
	label: PropTypes.string,
	renderTick: PropTypes.func,
	renderLabel: PropTypes.func,
	render: PropTypes.func,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	theme: 'main',
	controlled: false,
	disabled: false,
	readonly: false,
};

class Checkbox extends Component {
	constructor(props) {
		super(props);

		const value = get(this.props, 'value', '');

		this.value = this.formatValue(value);
		this.state = {
			focused: false,
			value: this.formatValue(value),
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ee.on(events.keydown.space, this.onKeySpaceDown);

		const { FieldInstance } = this.props;

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
		ee.off(events.keydown.space, this.onKeySpaceDown);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	focus = () => {
		//<editor-fold defaultstate="collapsed" desc="focus">
		this.setState({
			focused: true,
		});
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
		if (_g.inArray(value, [1, '1', true])) {
			value = '1';
		} else {
			value = '0';
		}

		return value;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onKeySpaceDown = ({ event }) => {
		//<editor-fold defaultstate="collapsed" desc="onKeySpaceDown">
		const { focused } = this.state;

		if (focused) {
			event.preventDefault();
			this.onChange();
		}
		//</editor-fold>
	};

	onChange = () => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, controlled, readonly, disabled } = this.props;

		if (readonly || disabled) {
			return;
		}

		const newValue = this.value === '1' ? '0' : '1';

		if (!controlled) {
			this.setValue(newValue);
		}

		if (isFunction(onChange)) {
			onChange({ value: newValue, Checkbox: this });
		}

		//</editor-fold>
	};

	onFocus = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		this.setState({
			focused: true,
		});

		const { onFocus } = this.props;

		if (isFunction(onFocus)) {
			onFocus({ value: this.getValue(), event: e, Checkbox: this });
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
			onBlur({ value: this.getValue(), event: e, Checkbox: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderCheckbox = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCheckbox">

		const { disabled, showValidationError, theme } = this.props;
		const { focused, value } = this.state;

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_error']]: showValidationError,
			[classNames['wrapper_focused']]: focused,
			[classNames['wrapper_disabled']]: disabled,
			[classNames[`wrapper_${theme}_active`]]: value === '1',
		});

		return (
			<div
				tabIndex={0}
				className={className}
				onClick={this.onChange}
				onFocus={this.onFocus}
				onBlur={this.onBlur}>
				{this.renderTick(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderLabel = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLabel">
		const { label, renderLabel, disabled } = this.props;

		if (isUndefined(label) && !isFunction(renderLabel)) {
			return null;
		}

		if (isFunction(renderLabel)) {
			return renderLabel({
				classNames,
				label,
				disabled,
				onClick: this.onChange,
				Checkbox: this,
			});
		}

		const className = _g.classNames(classNames['label'], {
			[classNames['label_disabled']]: disabled,
		});

		return (
			<div className={className} onClick={this.onChange}>
				{label}
			</div>
		);
		//</editor-fold>
	};

	renderTick = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTick">

		const { value } = this.state;

		if (value === '0') {
			return;
		}

		const { renderTick, disabled } = this.props;

		if (isFunction(renderTick)) {
			return renderTick({
				classNames,
				disabled,
				Checkbox: this,
			});
		}

		const className = _g.classNames(classNames['tick'], {
			[classNames['tick_disabled']]: disabled,
		});

		return <div className={className} />;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { render } = this.props;

		if (isFunction(render)) {
			return render({
				classNames,
				input: this.renderCheckbox(classNames),
				label: this.renderLabel(classNames),
				Checkbox: this,
			});
		}

		return (
			<div className={classNames['outer']}>
				{this.renderCheckbox(classNames)}
				{this.renderLabel(classNames)}
			</div>
		);
	}
}

Checkbox.propTypes = propTypes;

Checkbox.defaultProps = defaultProps;

export default Checkbox;
