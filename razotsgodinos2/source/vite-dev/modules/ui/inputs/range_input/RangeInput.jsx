import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

//based on
//https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Slider/Slider.js

import styles from './RangeInput.module.less';

const propTypes = {
	classNames: PropTypes.object,

	value: PropTypes.any, //can be an comma divide string 1,4,6
	valueId: PropTypes.any,

	//The track shows the range available for user selection.
	showTrack: PropTypes.bool,

	controlled: PropTypes.bool,
	theme: PropTypes.oneOf([
		'main',
		'primary',
		'success',
		'info',
		'warning',
		'danger',
		'custom',
	]),
	//Marks indicate predetermined values to which the user can move the slider. If true the marks will be spaced according the value of the step prop. If an array, it should contain objects with value and an optional label keys.
	marks: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.node,
				value: PropTypes.number.isRequired,
			}),
		),
		PropTypes.bool,
	]),
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number, //or null
	valueLabelDisplay: PropTypes.oneOf(['on', 'auto', 'off']),
	valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	/**
	 * A transformation function, to change the scale of the slider.
	 */
	scale: PropTypes.func,

	//callbacks
	onChange: PropTypes.func, //onChange
	onAfterChange: PropTypes.func, //when user stopped dragging

	//extra
	readonly: PropTypes.bool,
	disabled: PropTypes.bool,

	//custom renderers
	renderTrack: PropTypes.func,
	renderThumb: PropTypes.func,
	renderRail: PropTypes.func,
	renderValueLabel: PropTypes.func,
	renderMark: PropTypes.func,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	showTrack: true,
	marks: false,
	step: 1,
	orientation: 'horizontal',
	valueLabelDisplay: 'off',
	valueLabelFormat: x => x,
	controlled: false,
	theme: 'main',
	readonly: false,
	disabled: false,
	min: 0,
	max: 100,
	scale: x => x,
};

//<editor-fold defaultstate="collapsed" desc="Helpers">
function ValueLabelComponent(props) {
	const {
		children,
		classNames,
		open,
		value,
		valueLabelDisplay,
		disabled,
		renderValueLabel,
		RangeInput,
	} = props;

	if (valueLabelDisplay === 'off' || disabled) {
		return children;
	}

	const className = _g.classNames(classNames['valueLabel'], {
		[classNames['valueLabel_open']]: open,
	});

	let label = (
		<span className={className}>
			<span className={classNames['valueLabel_circle']}>
				<span className={classNames['valueLabel_label']}>{value}</span>
			</span>
		</span>
	);
	if (_.isFunction(renderValueLabel)) {
		label = renderValueLabel({ className, classNames, value, RangeInput });
	}

	return React.cloneElement(children, {}, label);
}

function asc(a, b) {
	return a - b;
}

function clamp(value, min, max) {
	return Math.min(Math.max(min, value), max);
}

function findClosest(values, currentValue) {
	const { index: closestIndex } = values.reduce((acc, value, index) => {
		const distance = Math.abs(currentValue - value);

		if (acc === null || distance < acc.distance || distance === acc.distance) {
			return {
				distance,
				index,
			};
		}

		return acc;
	}, null);
	return closestIndex;
}

function valueToPercent(value, min, max) {
	return ((value - min) * 100) / (max - min);
}

function percentToValue(percent, min, max) {
	return (max - min) * percent + min;
}

function ownerDocument(node) {
	return (node && node.ownerDocument) || document;
}

function trackFinger(event, touchId) {
	if (touchId.current !== undefined && event.changedTouches) {
		for (let i = 0; i < event.changedTouches.length; i += 1) {
			const touch = event.changedTouches[i];
			if (touch.identifier === touchId.current) {
				return {
					x: touch.clientX,
					y: touch.clientY,
				};
			}
		}

		return false;
	}

	return {
		x: event.clientX,
		y: event.clientY,
	};
}

function getDecimalPrecision(num) {
	// This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
	// When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
	if (Math.abs(num) < 1) {
		const parts = num.toExponential().split('e-');
		const matissaDecimalPart = parts[0].split('.')[1];
		return (
			(matissaDecimalPart ? matissaDecimalPart.length : 0) +
			parseInt(parts[1], 10)
		);
	}

	const decimalPart = num.toString().split('.')[1];
	return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value, step, min) {
	const nearest = Math.round((value - min) / step) * step + min;
	return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex({ values, source, newValue, index }) {
	// Performance shortcut
	if (source[index] === newValue) {
		return source;
	}

	const output = values.slice();
	output[index] = newValue;
	return output;
}

const axisProps = {
	horizontal: {
		offset: percent => ({ left: `${percent}%` }),
		leap: percent => ({ width: `${percent}%` }),
	},
	vertical: {
		offset: percent => ({ bottom: `${percent}%` }),
		leap: percent => ({ height: `${percent}%` }),
	},
};

let cachedSupportsTouchActionNone;
function doesSupportTouchActionNone() {
	if (cachedSupportsTouchActionNone === undefined) {
		const element = document.createElement('div');
		element.style.touchAction = 'none';
		document.body.appendChild(element);
		cachedSupportsTouchActionNone =
			window.getComputedStyle(element).touchAction === 'none';
		element.parentElement.removeChild(element);
	}
	return cachedSupportsTouchActionNone;
}

//</editor-fold>

class RangeInput extends Component {
	constructor(props) {
		super(props);

		this.wrapperNode = React.createRef();

		const value = _.get(this.props, 'value', '');

		this.touchId = {
			current: undefined,
		};

		this.previousIndex = {
			current: undefined,
		};

		this.value = this.formatValue(value);
		this.state = {
			focused: false,
			value: this.formatValue(value),
			activeIndex: -1,
			open: -1,
			focusVisible: -1,
		};

		this.values = this.formatValues(this.value);
		this.marks = this.formatMarks(this.props.marks);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { FieldInstance } = this.props;

		if (!_.isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this });
		}

		const { current: slider } = this.wrapperNode;
		slider.addEventListener('touchstart', this.onTouchStart, {
			passive: doesSupportTouchActionNone(),
		});
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.value !== this.props.value) {
			this.setValue(this.props.value);
		}

		if (prevProps.marks !== this.props.marks) {
			this.marks = this.formatMarks(this.props.marks);
		}

		if (prevProps.valueId !== this.props.valueId) {
			this.setValue(this.props.value);
		}

		if (prevProps.disabled !== this.props.disabled) {
			if (
				this.props.disabled &&
				this.wrapperNode.current.contains(document.activeElement)
			) {
				// This is necessary because Firefox and Safari will keep focus
				// on a disabled element:
				// https://codesandbox.io/s/mui-pr-22247-forked-h151h?file=/src/App.js
				document.activeElement.blur();
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;

		const { current: slider } = this.wrapperNode;

		const doc = ownerDocument(slider);

		slider.removeEventListener('touchstart', this.onTouchStart, {
			passive: doesSupportTouchActionNone(),
		});

		doc.removeEventListener('mousemove', this.onTouchMove);
		doc.removeEventListener('mouseup', this.onTouchEnd);
		doc.removeEventListener('touchmove', this.onTouchMove);
		doc.removeEventListener('touchend', this.onTouchEnd);
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

	setValue = value => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;
		this.values = this.formatValues(this.value);

		this.setState({
			value: value,
		});
		//</editor-fold>
	};

	setValueState = newValue => {
		//<editor-fold defaultstate="collapsed" desc="setValueState">
		const { readonly } = this.props;

		if (readonly) {
			return;
		}

		this.value = newValue;

		const { controlled } = this.props;

		if (!controlled) {
			this.values = this.formatValues(newValue);
			this.setState({
				value: newValue,
			});
		}

		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return _.join(this.value, ',');
		//</editor-fold>
	};

	formatValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatNumber">
		value = _.split(value, ',');
		value = _.map(value, v => _.toNumber(v));

		return value;
		//</editor-fold>
	};

	getFingerNewValue = ({ finger, move = false, values: values2, source }) => {
		//<editor-fold defaultstate="collapsed" desc="getFingerNewValue">
		const { current: slider } = this.wrapperNode;
		const { width, height, bottom, left } = slider.getBoundingClientRect();
		let percent;

		const { orientation, min, max, step } = this.props;

		if (orientation === 'vertical') {
			percent = (bottom - finger.y) / height;
		} else {
			percent = (finger.x - left) / width;
		}

		let newValue;
		newValue = percentToValue(percent, min, max);
		if (step) {
			newValue = roundValueToStep(newValue, step, min);
		} else {
			const marksValues = this.marks.map(mark => mark.value);
			const closestIndex = findClosest(marksValues, newValue);
			newValue = marksValues[closestIndex];
		}

		newValue = clamp(newValue, min, max);
		let activeIndex = 0;

		if (this.value.length > 1) {
			if (!move) {
				activeIndex = findClosest(values2, newValue);
			} else {
				activeIndex = this.previousIndex.current;
			}

			const previousValue = newValue;
			newValue = setValueIndex({
				values: values2,
				source,
				newValue,
				index: activeIndex,
			}).sort(asc);
			activeIndex = newValue.indexOf(previousValue);
			this.previousIndex.current = activeIndex;
		} else {
			newValue = [newValue];
		}

		return { newValue, activeIndex };
		//</editor-fold>
	};

	formatValues = value => {
		//<editor-fold defaultstate="collapsed" desc="formatValues">
		const { min, max } = this.props;
		let values = value.slice().sort(asc);
		values = values.map(value => clamp(value, min, max));
		return values;
		//</editor-fold>
	};

	formatMarks = marksProp => {
		//<editor-fold defaultstate="collapsed" desc="formatMarks">
		const { step, max, min } = this.props;

		let marks = [];

		if (marksProp === true && step !== null) {
			marks = [...Array(Math.floor((max - min) / step) + 1)].map(
				(t, index) => ({ value: min + step * index }),
			);
		} else if (marksProp) {
			marks = marksProp;
		}

		return marks;
		//</editor-fold>
	};

	focusThumb = ({ sliderRef, activeIndex }) => {
		//<editor-fold defaultstate="collapsed" desc="focusThumb">
		if (
			!sliderRef.current.contains(document.activeElement) ||
			Number(document.activeElement.getAttribute('data-index')) !== activeIndex
		) {
			sliderRef.current
				.querySelector(`[role="slider"][data-index="${activeIndex}"]`)
				.focus();
		}

		this.setState({
			activeIndex,
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Event handlers
	 *
	 * ========================================================================*/

	onKeyDown = event => {
		//<editor-fold defaultstate="collapsed" desc="onKeyDown">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		const { min, max, step } = this.props;

		const index = Number(event.currentTarget.getAttribute('data-index'));
		const value = this.values[index];
		const tenPercents = (max - min) / 10;
		const marksValues = this.marks.map(mark => mark.value);
		const marksIndex = marksValues.indexOf(value);
		let newValue;
		const increaseKey = 'ArrowRight';
		const decreaseKey = 'ArrowLeft';

		switch (event.key) {
			case 'Home':
				newValue = min;
				break;
			case 'End':
				newValue = max;
				break;
			case 'PageUp':
				if (step) {
					newValue = value + tenPercents;
				}
				break;
			case 'PageDown':
				if (step) {
					newValue = value - tenPercents;
				}
				break;
			case increaseKey:
			case 'ArrowUp':
				if (step) {
					newValue = value + step;
				} else {
					newValue =
						marksValues[marksIndex + 1] || marksValues[marksValues.length - 1];
				}
				break;
			case decreaseKey:
			case 'ArrowDown':
				if (step) {
					newValue = value - step;
				} else {
					newValue = marksValues[marksIndex - 1] || marksValues[0];
				}
				break;
			default:
				return;
		}

		// Prevent scroll of the page
		event.preventDefault();

		if (step) {
			newValue = roundValueToStep(newValue, step, min);
		}

		newValue = clamp(newValue, min, max);

		if (this.value.length > 1) {
			const previousValue = newValue;
			newValue = setValueIndex({
				values: this.values,
				source: this.value,
				newValue,
				index,
			}).sort(asc);
			this.focusThumb({
				sliderRef: this.wrapperNode,
				activeIndex: newValue.indexOf(previousValue),
			});
		} else {
			newValue = [newValue];
		}

		this.setValueState(newValue);
		this.setState({ focusVisible: index });

		const { onChange } = this.props;

		if (_.isFunction(onChange)) {
			onChange({ RangeInput: this, value: this.getValue() });
		}

		const { onAfterChange } = this.props;

		if (_.isFunction(onAfterChange)) {
			onAfterChange({ RangeInput: this, value: this.getValue() });
		}
		//</editor-fold>
	};

	onFocus = event => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		const index = Number(event.currentTarget.getAttribute('data-index'));

		this.setState({
			focusVisible: index,
			open: index,
		});
		//</editor-fold>
	};

	onBlur = () => {
		//<editor-fold defaultstate="collapsed" desc="onBlur">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		this.setState({
			focusVisible: -1,
			open: -1,
		});
		//</editor-fold>
	};

	onMouseOver = event => {
		//<editor-fold defaultstate="collapsed" desc="onMouseOver">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		const index = Number(event.currentTarget.getAttribute('data-index'));

		this.setState({
			open: index,
		});
		//</editor-fold>
	};

	onMouseLeave = () => {
		//<editor-fold defaultstate="collapsed" desc="onMouseLeave">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		this.setState({
			open: -1,
		});
		//</editor-fold>
	};

	onMouseDown = event => {
		//<editor-fold defaultstate="collapsed" desc="onMouseDown">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		event.preventDefault();
		const finger = trackFinger(event, this.touchId);
		const { newValue, activeIndex } = this.getFingerNewValue({
			finger,
			values: this.values,
			source: this.value,
		});
		this.focusThumb({ sliderRef: this.wrapperNode, activeIndex });

		this.setValueState(newValue);

		const { onChange } = this.props;

		if (_.isFunction(onChange)) {
			onChange({ RangeInput: this, value: this.getValue() });
		}

		const doc = ownerDocument(this.wrapperNode.current);
		doc.addEventListener('mousemove', this.onTouchMove);
		doc.addEventListener('mouseup', this.onTouchEnd);
		//</editor-fold>
	};

	onTouchStart = event => {
		//<editor-fold defaultstate="collapsed" desc="onTouchStart">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}
		// If touch-action: none; is not supported we need to prevent the scroll manually.

		if (!doesSupportTouchActionNone()) {
			event.preventDefault();
		}

		const touch = event.changedTouches[0];
		if (touch != null) {
			// A number that uniquely identifies the current finger in the touch session.
			this.touchId.current = touch.identifier;
		}
		const finger = trackFinger(event, this.touchId);

		const { newValue, activeIndex } = this.getFingerNewValue({
			finger,
			values: this.values,
			source: this.value,
		});
		this.focusThumb({ sliderRef: this.wrapperNode, activeIndex });

		this.setValueState(newValue);

		const { onChange } = this.props;

		if (_.isFunction(onChange)) {
			onChange({ RangeInput: this, value: this.getValue() });
		}

		const doc = ownerDocument(this.wrapperNode.current);
		doc.addEventListener('touchmove', this.onTouchMove);
		doc.addEventListener('touchend', this.onTouchEnd);
		//</editor-fold>
	};

	onTouchMove = event => {
		//<editor-fold defaultstate="collapsed" desc="onTouchMove">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		const finger = trackFinger(event, this.touchId);

		if (!finger) {
			return;
		}

		// Cancel move in case some other element consumed a mouseup event and it was not fired.
		if (event.type === 'mousemove' && event.buttons === 0) {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			this.onTouchEnd(event);
			return;
		}

		const { newValue, activeIndex } = this.getFingerNewValue({
			finger,
			move: true,
			values: this.values,
			source: this.value,
		});
		this.focusThumb({ sliderRef: this.wrapperNode, activeIndex });
		this.setValueState(newValue);

		const { onChange } = this.props;

		if (_.isFunction(onChange)) {
			onChange({ RangeInput: this, value: this.getValue() });
		}
		//</editor-fold>
	};

	onTouchEnd = event => {
		//<editor-fold defaultstate="collapsed" desc="onTouchEnd">
		const { disabled } = this.props;

		if (disabled) {
			return;
		}

		const finger = trackFinger(event, this.touchId);

		if (!finger) {
			return;
		}

		this.setState({
			activeIndex: -1,
			focusVisible: -1,
			open: -1,
		});

		// if (event.type === 'touchend') {
		// 	this.setState({
		// 		open: -1,
		// 	});
		// }

		const { onAfterChange } = this.props;

		if (_.isFunction(onAfterChange)) {
			onAfterChange({ RangeInput: this, value: this.getValue() });
		}

		this.touchId.current = undefined;

		const doc = ownerDocument(this.wrapperNode.current);
		doc.removeEventListener('mousemove', this.onTouchMove);
		doc.removeEventListener('mouseup', this.onTouchEnd);
		doc.removeEventListener('touchmove', this.onTouchMove);
		doc.removeEventListener('touchend', this.onTouchEnd);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderTrack = () => {
		//<editor-fold defaultstate="collapsed" desc="renderTrack">
		const { showTrack } = this.props;

		if (!showTrack) {
			return null;
		}

		const { orientation, min, max, disabled, renderTrack } = this.props;

		const trackOffset = valueToPercent(
			this.value.length > 1 ? this.values[0] : min,
			min,
			max,
		);
		const trackLeap =
			valueToPercent(this.values[this.values.length - 1], min, max) -
			trackOffset;
		const trackStyle = {
			...axisProps[orientation].offset(trackOffset),
			...axisProps[orientation].leap(trackLeap),
		};

		const className = _g.classNames(this.classNames['track'], {
			[this.classNames['track_vertical']]: orientation === 'vertical',
			[this.classNames['track_disabled']]: disabled,
		});

		if (_.isFunction(renderTrack)) {
			return renderTrack({ className, trackStyle, RangeInput: this });
		}

		return <div className={className} style={trackStyle} />;
		//</editor-fold>
	};

	renderThumbs = () => {
		//<editor-fold defaultstate="collapsed" desc="renderThumbs">
		return _.map(this.values, this.renderThumb);
		//</editor-fold>
	};

	renderThumb = (value, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderThumb">
		const {
			orientation,
			min,
			max,
			scale,
			valueLabelDisplay,
			valueLabelFormat,
			disabled,
			renderThumb,
			renderValueLabel,
		} = this.props;

		const percent = valueToPercent(value, min, max);
		const style = axisProps[orientation].offset(percent);

		const { open, activeIndex, focusVisible } = this.state;

		const active = activeIndex === index;

		const thumbClassName = _g.classNames(
			this.classNames['thumb'],

			{ [this.classNames['thumb_hover']]: !disabled && !active },
			{ [this.classNames['thumb_disabled']]: disabled },
			{
				[this.classNames['thumb_focus']]:
					!disabled && !active && focusVisible === index,
			},
			{ [this.classNames['thumb_active']]: !disabled && active },
		);

		let thumb = (
			<span
				className={thumbClassName}
				tabIndex={disabled ? null : 0}
				role="slider"
				style={style}
				data-index={index}
				onKeyDown={this.onKeyDown}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onMouseOver={this.onMouseOver}
				onMouseLeave={this.onMouseLeave}
			/>
		);

		if (_.isFunction(renderThumb)) {
			thumb = renderThumb({
				thumbClassName,
				disabled,
				style,
				index,
				onKeyDown: this.onKeyDown,
				onFocus: this.onFocus,
				onBlur: this.onBlur,
				onMouseOver: this.onMouseOver,
				onMouseLeave: this.onMouseLeave,
				RangeInput: this,
			});
		}

		return (
			<ValueLabelComponent
				key={index}
				valueLabelFormat={valueLabelFormat}
				valueLabelDisplay={valueLabelDisplay}
				classNames={this.classNames}
				value={
					typeof valueLabelFormat === 'function'
						? valueLabelFormat(scale(value), index)
						: valueLabelFormat
				}
				index={index}
				open={
					open === index || activeIndex === index || valueLabelDisplay === 'on'
				}
				disabled={disabled}
				renderValueLabel={renderValueLabel}
				RangeInput={this}>
				{thumb}
			</ValueLabelComponent>
		);
		//</editor-fold>
	};

	renderRail = () => {
		//<editor-fold defaultstate="collapsed" desc="renderRail">
		const { orientation, disabled, renderRail } = this.props;

		const className = _g.classNames(this.classNames['rail'], {
			[this.classNames['rail_vertical']]: orientation === 'vertical',
			[this.classNames['rail_disabled']]: disabled,
		});

		if (_.isFunction(renderRail)) {
			return renderRail({ className, RangeInput: this });
		}

		return <div className={className} />;
		//</editor-fold>
	};

	renderMarks = () => {
		//<editor-fold defaultstate="collapsed" desc="renderMarks">
		return _.map(this.marks, this.renderMark);
		//</editor-fold>
	};

	renderMark = (mark, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderMark">
		const { min, max, orientation, showTrack, renderMark } = this.props;
		const percent = valueToPercent(mark.value, min, max);
		const style = axisProps[orientation].offset(percent);

		let markActive;
		if (showTrack === false) {
			markActive = this.values.indexOf(mark.value) !== -1;
		} else {
			if (this.value.length > 1) {
				markActive =
					mark.value >= this.values[0] &&
					mark.value <= this.values[this.values.length - 1];
			} else {
				markActive = mark.value <= this.values[0];
			}
		}

		const markClassName = _g.classNames(this.classNames['mark'], {
			[this.classNames['mark_active']]: markActive,
		});

		const markLabelClassName = _g.classNames(this.classNames['markLabel'], {
			[this.classNames['markLabel_horizontal']]: orientation === 'horizontal',
			[this.classNames['markLabel_vertical']]: orientation === 'vertical',
			[this.classNames['markLabel_active']]: markActive,
		});

		if (_.isFunction(renderMark)) {
			return renderMark({
				markClassName,
				markLabelClassName,
				style,
				index,
				mark,
				RangeInput: this,
			});
		}

		return (
			<Fragment key={mark.value}>
				<span style={style} data-index={index} className={markClassName} />
				{mark.label != null ? (
					<span data-index={index} style={style} className={markLabelClassName}>
						{mark.label}
					</span>
				) : null}
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		this.classNames = _g.getClassNames(styles, this.props.classNames);

		const { orientation, disabled, theme } = this.props;

		const className = _g.classNames(
			this.classNames['wrapper'],
			this.classNames[`wrapper_${theme}`],
			{ [this.classNames['wrapper_horizontal']]: orientation === 'horizontal' },
			{ [this.classNames['wrapper_vertical']]: orientation === 'vertical' },
			{ [this.classNames['wrapper_disabled']]: disabled },
		);

		return (
			<div
				ref={this.wrapperNode}
				className={className}
				onMouseDown={this.onMouseDown}>
				{this.renderRail()}
				{this.renderTrack()}
				{this.renderThumbs()}
				{this.renderMarks()}
			</div>
		);
	}
}

RangeInput.propTypes = propTypes;

RangeInput.defaultProps = defaultProps;

export default RangeInput;
