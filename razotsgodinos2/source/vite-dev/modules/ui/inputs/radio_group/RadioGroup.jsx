import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './RadioGroup.module.less';
import _ from 'lodash-es';

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
	value: PropTypes.any,
	valueId: PropTypes.any,

	options: PropTypes.array.isRequired,
	valueKey: PropTypes.string,
	labelKey: PropTypes.string,

	controlled: PropTypes.bool,

	//callbacks
	onChange: PropTypes.func, //onChange
	onFocus: PropTypes.func, //onFocus
	onBlur: PropTypes.func, //onBlur

	//extra
	readonly: PropTypes.bool,
	disabled: PropTypes.bool,

	//customization
	renderOption: PropTypes.func,
	renderOptions: PropTypes.func,

	//from Field
	FieldInstance: PropTypes.object,

	//empty
	allowEmpty: PropTypes.bool,
	emptyValue: PropTypes.any,
};

const defaultProps = {
	classNames: {},
	theme: 'main',
	controlled: false,
	readonly: false,
	disabled: false,
	valueKey: 'value',
	labelKey: 'label',

	allowEmpty: false,
	emptyValue: '',
};

class RadioGroup extends Component {
	constructor(props) {
		super(props);

		const { options, valueKey, allowEmpty, emptyValue } = this.props;

		const firstOptionValue = _.get(_.head(options), valueKey, '');

		const defaultValue = allowEmpty ? emptyValue : firstOptionValue;

		const hasValueProp =
			!_.isUndefined(this.props.value) && this.props.value !== null;

		const value = hasValueProp ? this.props.value : defaultValue;

		this.value = this.formatValue(value);

		this.state = {
			focused: false,
			value: this.formatValue(value),
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ee.on(events.keydown.up, this.onUpKey); //38 - up arrow
		ee.on(events.keydown.down, this.onDownKey); //40 - down arrow
		ee.on(events.keydown.left, this.onUpKey); //37 - left arrow
		ee.on(events.keydown.right, this.onDownKey); //39 - right arrow

		const { FieldInstance } = this.props;

		if (!_.isUndefined(FieldInstance)) {
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
		ee.off(events.keydown.up, this.onUpKey); //38 - up arrow
		ee.off(events.keydown.down, this.onDownKey); //40 - down arrow
		ee.off(events.keydown.left, this.onUpKey); //37 - left arrow
		ee.off(events.keydown.right, this.onDownKey); //39 - right arrow
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
		//<editor-fold defaultstate="collapsed" desc="formatNumber">
		value = _.toString(value);

		return value;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onUpKey = ({ event }) => {
		//<editor-fold defaultstate="collapsed" desc="onUpKey">
		const { focused, value } = this.state;

		if (!focused) {
			return;
		}

		event.preventDefault();

		const { options, valueKey } = this.props;

		let currentIndex = _.findIndex(options, (o) => o[valueKey] == value);
		currentIndex--;

		if (currentIndex < 0) {
			currentIndex = options.length - 1;
		}

		const newValue = options[currentIndex][valueKey];

		this.onChange(newValue);
		//</editor-fold>
	};

	onDownKey = ({ event }) => {
		//<editor-fold defaultstate="collapsed" desc="onDownKey">
		const { focused, value } = this.state;

		if (!focused) {
			return;
		}

		event.preventDefault();

		const { options, valueKey } = this.props;

		let currentIndex = _.findIndex(options, (o) => o[valueKey] == value);

		currentIndex++;

		if (currentIndex >= options.length) {
			currentIndex = 0;
		}

		const newValue = options[currentIndex][valueKey];

		this.onChange(newValue);
		//</editor-fold>
	};

	onChange = (value) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, controlled, readonly, disabled } = this.props;

		if (readonly || disabled) {
			return;
		}

		value = this.formatValue(value);

		if (this.value === value) {
			return;
		}

		if (!controlled) {
			this.setValue(value);
		}

		if (_.isFunction(onChange)) {
			onChange({ value: value, RadioGroup: this });
		}

		//</editor-fold>
	};

	onFocus = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		this.setState({
			focused: true,
		});

		const { onFocus } = this.props;

		if (_.isFunction(onFocus)) {
			onFocus({ value: this.getValue(), event: e, RadioGroup: this });
		}
		//</editor-fold>
	};

	onBlur = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onBlur">
		this.setState({
			focused: false,
		});

		const { onBlur } = this.props;

		if (_.isFunction(onBlur)) {
			onBlur({ value: this.getValue(), event: e, RadioGroup: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderOptions = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderOptions">
		const { options, renderOptions } = this.props;

		const _options = _.map(options, (option, index) => {
			return this.renderOption({ option, index, classNames });
		});

		if (_.isFunction(renderOptions)) {
			return renderOptions({ classNames, options: _options, RadioGroup: this });
		}

		return _options;

		//</editor-fold>
	};

	renderOption = ({ option, index, classNames }) => {
		//<editor-fold defaultstate="collapsed" desc="renderOption">
		const { valueKey, labelKey, renderOption, disabled, theme } = this.props;
		const { value: current } = this.state;
		const value = _.get(option, valueKey, '');
		const label = _.get(option, labelKey, '');

		const active = current == value;

		if (_.isFunction(renderOption)) {
			return renderOption({
				option,
				index,
				label,
				value,
				classNames,
				disabled,
				theme,
				active,
				RadioGroup: this,
			});
		}

		const className = _g.classNames(classNames['option-wrapper'], {
			[classNames['option-wrapper_disabled']]: disabled,
		});

		const optionClassName = _g.classNames(classNames['option'], {
			[classNames['option_disabled']]: disabled,
		});

		const circleClassName = _g.classNames(classNames['circle'], {
			[classNames[`circle_${theme}`]]: active,
			[classNames['circle_disabled']]: disabled,
		});

		const labelClassName = _g.classNames(classNames['label'], {
			[classNames['label_disabled']]: disabled,
		});

		return (
			<div
				key={index}
				className={className}
				onClick={() => {
					this.onChange(value);
				}}>
				<div className={optionClassName}>
					{active && <div className={circleClassName} />}
				</div>
				<div className={labelClassName}>{label}</div>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		return (
			<div
				tabIndex={0}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				className={classNames['wrapper']}>
				<div className={classNames['inner']}>
					{this.renderOptions(classNames)}
				</div>
			</div>
		);
	}
}

RadioGroup.propTypes = propTypes;

RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
