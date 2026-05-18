import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import Input from 'ui/inputs/input';
import Dropdown from 'ui/controls/dropdown';

import YearsView from './components/YearsView';
import MonthsView from './components/MonthsView';
import DaysView from './components/DaysView';
import TimeView from './components/TimeView';

import styles from './DateTimePicker.module.less';
import { forEach, get, isFunction, isUndefined, toString } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	value: PropTypes.any,
	valueId: PropTypes.any,

	placeholder: PropTypes.string,

	// controlled: PropTypes.bool,
	// readonly: PropTypes.bool,
	disabled: PropTypes.bool,
	clearable: PropTypes.bool,

	showInput: PropTypes.bool,
	InputProps: PropTypes.object,
	DropdownProps: PropTypes.object,

	//formats
	dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	timeFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

	isValidDate: PropTypes.func,

	opened: PropTypes.bool,
	viewMode: PropTypes.oneOf(['years', 'months', 'days', 'time']),

	//closeOnSelect: PropTypes.bool,
	closeOnTab: PropTypes.bool,
	closeOnOutsideClick: PropTypes.bool,
	timeConstraints: PropTypes.object,

	//renderers
	renderDay: PropTypes.func,
	renderMonth: PropTypes.func,
	renderYear: PropTypes.func,

	renderYears: PropTypes.func,
	renderMonths: PropTypes.func,
	renderDays: PropTypes.func,
	renderTime: PropTypes.func,

	utc: PropTypes.bool,
	locale: PropTypes.string,
	strictParsing: PropTypes.bool,

	icon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),

	//callbacks
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onChange: PropTypes.func,
	onViewModeChange: PropTypes.func,
	onBlur: PropTypes.func,

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

	dateFormat: 'YYYY-MM-DD',
	timeFormat: 'HH:mm:ss',

	showInput: true,

	opened: false,

	//closeOnSelect: false,
	closeOnTab: true,
	closeOnOutsideClick: true,
	timeConstraints: {},

	utc: false,
	locale: 'en',
	strictParsing: true,

	showValidationError: false,
};

class DateTimePicker extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();

		this.blurred = false;
		this.inputChanged = false;

		const initialState = this.getStateFromProps(this.props);

		initialState.viewMode = this.props.dateFormat
			? this.props.viewMode || initialState.updateOn || 'days'
			: 'time';

		this.value = initialState.value + '';

		const state = {
			value: this.value,
			valueId: null,
			opened: this.props.opened,
			viewMode: 'days',
			inputFormat: '',
			selectedDate: null,
			updateOn: 'days',
			viewDate: null,
		};

		this.state = { ...state, ...initialState };

		this.allowedSetTime = ['hours', 'minutes', 'seconds', 'milliseconds'];
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

		const formats = this.getFormats(prevProps);

		if (
			prevProps.value !== this.props.value ||
			formats.datetime !== this.getFormats(this.props).datetime
		) {
			updatedState = this.getStateFromProps(this.props);
		}

		// if (updatedState.opened === undefined) {
		// 	if (this.props.closeOnSelect && this.state.viewMode !== 'time') {
		// 		updatedState.opened = false;
		// 	} else {
		// 		updatedState.opened = this.state.opened;
		// 	}
		// }

		if (prevProps.locale !== this.props.locale) {
			if (this.state.viewDate) {
				const updatedViewDate = this.state.viewDate
					.clone()
					.locale(this.props.locale);
				updatedState.viewDate = updatedViewDate;
			}
			if (this.state.selectedDate) {
				const updatedSelectedDate = this.state.selectedDate
					.clone()
					.locale(this.props.locale);
				updatedState.selectedDate = updatedSelectedDate;
				updatedState.value = updatedSelectedDate.format(formats.datetime);
				this.value = updatedSelectedDate.format(formats.datetime) + '';
			}
		}

		if (prevProps.utc !== this.props.utc) {
			if (this.props.utc) {
				if (this.state.viewDate)
					updatedState.viewDate = this.state.viewDate.clone().utc();
				if (this.state.selectedDate) {
					updatedState.selectedDate = this.state.selectedDate.clone().utc();
					updatedState.value = updatedState.selectedDate.format(
						formats.datetime,
					);
					this.value = updatedState.selectedDate.format(formats.datetime) + '';
				}
			} else {
				if (this.state.viewDate)
					updatedState.viewDate = this.state.viewDate.clone().local();
				if (this.state.selectedDate) {
					updatedState.selectedDate = this.state.selectedDate.clone().local();
					updatedState.value = updatedState.selectedDate.format(
						formats.datetime,
					);
					this.value = updatedState.selectedDate.format(formats.datetime) + '';
				}
			}
		}

		if (prevProps.valueId !== this.props.valueId) {
			this.setValue(this.props.value);
		}

		if (!isUndefined(prevProps.value) && prevProps.value !== this.props.value) {
			if (this.value !== this.props.value) {
				const _value = toString(this.props.value);

				updatedState.value = _value;
				updatedState.valueId = _g.generateShortId();
			}
		}

		forEach(['opened', 'viewMode'], (key) => {
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
			const updatedState = this.getStateFromProps({
				...this.props,
				value: value,
			});
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
		//<editor-fold defaultstate="collapsed" desc="formatNumber">
		value = toString(value);

		return value;
		//</editor-fold>
	};

	getStateFromProps = (props) => {
		//<editor-fold defaultstate="collapsed" desc="getStateFromProps">
		const formats = this.getFormats(props);
		const date = toString(props.value);
		let selectedDate, viewDate, updateOn, value;

		if (date && typeof date === 'string') {
			selectedDate = this.localMoment(date, formats.datetime);
		} else if (date) {
			selectedDate = this.localMoment(date);
		}

		if (selectedDate && !selectedDate.isValid()) {
			selectedDate = null;
		}

		viewDate = selectedDate
			? selectedDate.clone().startOf('month')
			: this.localMoment().startOf('month');

		updateOn = this.getUpdateOn(formats);

		if (selectedDate) {
			value = selectedDate.format(formats.datetime);
		} else if (date.isValid && !date.isValid()) {
			value = '';
		} else {
			value = date || '';
		}

		return {
			updateOn: updateOn,
			inputFormat: formats.datetime,
			viewDate: viewDate,
			selectedDate: selectedDate,
			value: value,
			opened: props.opened,
		};
		//</editor-fold>
	};

	getFormats = (props) => {
		//<editor-fold defaultstate="collapsed" desc="getFormats">
		const formats = {
			date: props.dateFormat || '',
			time: props.timeFormat || '',
		};
		const locale = this.localMoment(props.date, null, props).localeData();

		if (formats.date === true) {
			formats.date = locale.longDateFormat('L');
		} else if (this.getUpdateOn(formats) !== 'days') {
			formats.time = '';
		}

		if (formats.time === true) {
			formats.time = locale.longDateFormat('LT');
		}

		formats.datetime =
			formats.date && formats.time
				? formats.date + ' ' + formats.time
				: formats.date || formats.time;

		return formats;
		//</editor-fold>
	};

	localMoment = (date, format, props) => {
		//<editor-fold defaultstate="collapsed" desc="localMoment">
		props = props || this.props;
		const momentFn = props.utc ? moment.utc : moment;
		const m = momentFn(date, format, props.strictParsing);
		if (props.locale) {
			m.locale(props.locale);
		}

		return m;
		//</editor-fold>
	};

	getUpdateOn = (formats) => {
		//<editor-fold defaultstate="collapsed" desc="getUpdateOn">
		if (formats.date.match(/[lLD]/)) {
			return 'days';
		} else if (formats.date.indexOf('M') !== -1) {
			return 'months';
		} else if (formats.date.indexOf('Y') !== -1) {
			return 'years';
		}

		return 'days';
		//</editor-fold>
	};

	showView = (view) => {
		//<editor-fold defaultstate="collapsed" desc="showView">
		if (this.state.viewMode !== view) {
			this.setState({ viewMode: view });
			this.onViewModeChange(view);
		}
		//</editor-fold>
	};

	setDate = (type) => {
		//<editor-fold defaultstate="collapsed" desc="setDate">
		const nextViews = {
			month: 'days',
			year: 'months',
		};

		return (e) => {
			const value = parseInt(e.target.getAttribute('data-value'), 10);
			const date = this.state.viewDate.clone()[type](value);

			this.setState({
				viewDate: date.startOf(type),
				viewMode: nextViews[type],
			});
			this.onViewModeChange(nextViews[type]);
		};
		//</editor-fold>
	};

	addTime = (amount, type, toSelected) => {
		//<editor-fold defaultstate="collapsed" desc="addTime">
		return this.updateTime('add', amount, type, toSelected);
		//</editor-fold>
	};

	subtractTime = (amount, type, toSelected) => {
		//<editor-fold defaultstate="collapsed" desc="subtractTime">
		return this.updateTime('subtract', amount, type, toSelected);
		//</editor-fold>
	};

	updateTime = (op, amount, type, toSelected) => {
		//<editor-fold defaultstate="collapsed" desc="updateTime">
		const update = {};
		const date = toSelected ? 'selectedDate' : 'viewDate';

		update[date] = this.state[date].clone()[op](amount, type);
		this.setState(update);
		//</editor-fold>
	};

	setTime = (type, value) => {
		//<editor-fold defaultstate="collapsed" desc="setTime">
		let index = this.allowedSetTime.indexOf(type) + 1,
			state = this.state,
			date = (state.selectedDate || state.viewDate).clone(),
			nextType;

		// It is needed to set all the time properties
		// to not to reset the time
		date[type](value);
		for (; index < this.allowedSetTime.length; index++) {
			nextType = this.allowedSetTime[index];
			date[nextType](date[nextType]());
		}

		this.setState({
			selectedDate: date,
			value: date.format(state.inputFormat),
		});
		this.value = date.format(state.inputFormat) + '';
		this.onChange(date);
		//</editor-fold>
	};

	updateSelectedDate = (e, close) => {
		//<editor-fold defaultstate="collapsed" desc="updateSelectedDate">
		let target = e.target,
			modifier = 0,
			viewDate = this.state.viewDate,
			currentDate = this.state.selectedDate || viewDate,
			date;

		if (target.className.indexOf('rdtDay') !== -1) {
			if (target.className.indexOf('rdtNew') !== -1) modifier = 1;
			else if (target.className.indexOf('rdtOld') !== -1) modifier = -1;

			date = viewDate
				.clone()
				.month(viewDate.month() + modifier)
				.date(parseInt(target.getAttribute('data-value'), 10));
		} else if (target.className.indexOf('rdtMonth') !== -1) {
			date = viewDate
				.clone()
				.month(parseInt(target.getAttribute('data-value'), 10))
				.date(currentDate.date());
		} else if (target.className.indexOf('rdtYear') !== -1) {
			date = viewDate
				.clone()
				.month(currentDate.month())
				.date(currentDate.date())
				.year(parseInt(target.getAttribute('data-value'), 10));
		}

		date
			.hours(currentDate.hours())
			.minutes(currentDate.minutes())
			.seconds(currentDate.seconds())
			.milliseconds(currentDate.milliseconds());

		this.value = date.format(this.state.inputFormat) + '';

		this.setState(
			{
				selectedDate: date,
				viewDate: date.clone().startOf('month'),
				value: date.format(this.state.inputFormat),
			},
			() => {
				this.onChange(date);

				if (this.props.timeFormat === false) {
					this.onClose();
				}

				// const opened = !(this.props.closeOnSelect && close);
				//
				// if (!opened) {
				// 	this.onClose();
				// }
			},
		);
		//</editor-fold>
	};

	openCalendar = () => {
		//<editor-fold defaultstate="collapsed" desc="openCalendar">
		const { opened } = this.state;

		if (opened) {
			return;
		}

		this.onOpen();
		//</editor-fold>
	};

	closeCalendar = () => {
		//<editor-fold defaultstate="collapsed" desc="closeCalendar">
		const { opened } = this.state;

		if (!opened) {
			return;
		}

		this.onClose();

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
					onOpen({ DateTimePicker: this });
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
					onClose({ DateTimePicker: this });
				}
			},
		);
		//</editor-fold>
	};

	onChange = () => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, onBlur } = this.props;

		if (isFunction(onChange)) {
			onChange({
				value: this.value,
				DateTimePicker: this,
				debounce: true,
			});
		}

		if (this.blurred && isFunction(onBlur)) {
			this.blurred = false;
			onBlur({ value: this.value, DateTimePicker: this });
		}

		//</editor-fold>
	};

	onInputChange = ({ value: inputValue }) => {
		//<editor-fold defaultstate="collapsed" desc="onInputChange">
		let value = inputValue,
			localMoment = this.localMoment(value, this.state.inputFormat),
			update = { value: value };

		this.value = value + '';

		if (localMoment.isValid()) {
			update.selectedDate = localMoment;
			update.viewDate = localMoment.clone().startOf('month');
		} else {
			update.selectedDate = null;
		}

		this.inputChanged = true;

		return this.setState(update, () => {
			this.onChange(localMoment.isValid() ? localMoment : this.state.value);
		});
		//</editor-fold>
	};

	onViewModeChange = (mode) => {
		//<editor-fold defaultstate="collapsed" desc="onViewModeChange">
		const { onViewModeChange } = this.props;

		if (isFunction(onViewModeChange)) {
			onViewModeChange({ mode, DateTimePicker: this });
		}
		//</editor-fold>
	};

	onFocus = () => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		this.openCalendar();
		//</editor-fold>
	};

	onBlur = ({ event, Input }) => {
		//<editor-fold defaultstate="collapsed" desc="onBlur">

		const { onBlur, InputProps } = this.props;

		this.blurred = true;

		if (isFunction(get(InputProps, 'onBlur'))) {
			InputProps.onBlur({ value: this.value, event, Input });
		}

		if (isFunction(onBlur) && this.inputChanged) {
			this.inputChanged = false;
			onBlur({ value: this.value, DateTimePicker: this });
		}

		//</editor-fold>
	};

	onKeyDown = ({ key }) => {
		//<editor-fold defaultstate="collapsed" desc="onKeyDown">
		const { closeOnTab } = this.props;
		if (key === 'Tab' && closeOnTab) {
			this.closeCalendar();
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderInput = () => {
		//<editor-fold defaultstate="collapsed" desc="renderInput">
		const {
			showInput,
			InputProps,
			disabled,
			placeholder,
			clearable,
			icon,
			showValidationError,
		} = this.props;

		if (!showInput) {
			return null;
		}

		const { value, valueId } = this.state;

		return (
			<Input
				ref={this.input}
				icon={icon}
				placeholder={placeholder}
				value={value}
				valueId={valueId}
				onSearch={this.onInputChange}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyDown}
				autoComplete="off"
				disabled={disabled}
				clearable={clearable}
				showValidationError={showValidationError}
				{...InputProps}
			/>
		);
		//</editor-fold>
	};

	renderCalendarHolder = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCalendarHolder">
		return (
			<div className={classNames['rdtPicker']}>
				{this.renderCalendar(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderCalendar = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCalendar">
		const { renderYears, renderMonths, renderDays, renderTime } = this.props;

		const {
			isValidDate,
			renderYear,
			renderMonth,
			renderDay,
			dateFormat,
			timeFormat,
			timeConstraints,
		} = this.props;

		const { viewMode, viewDate, selectedDate, updateOn } = this.state;

		if (viewMode === 'years') {
			if (isFunction(renderYears)) {
				return renderYears({
					classNames,
					viewDate,
					selectedDate,
					addTime: this.addTime,
					subtractTime: this.subtractTime,
					showView: this.showView,
					updateOn,
					setDate: this.setDate,
					updateSelectedDate: this.updateSelectedDate,
					isValidDate,
					renderYear,
				});
			}
			return (
				<YearsView
					classNames={classNames}
					viewDate={viewDate}
					selectedDate={selectedDate}
					addTime={this.addTime}
					subtractTime={this.subtractTime}
					showView={this.showView}
					updateOn={updateOn}
					setDate={this.setDate}
					updateSelectedDate={this.updateSelectedDate}
					isValidDate={isValidDate}
					renderYear={renderYear}
				/>
			);
		} else if (viewMode === 'months') {
			if (isFunction(renderMonths)) {
				return renderMonths({
					classNames,
					viewDate,
					selectedDate,
					addTime: this.addTime,
					subtractTime: this.subtractTime,
					showView: this.showView,
					updateOn,
					setDate: this.setDate,
					updateSelectedDate: this.updateSelectedDate,
					isValidDate,
					renderMonth,
				});
			}
			return (
				<MonthsView
					classNames={classNames}
					viewDate={viewDate}
					selectedDate={selectedDate}
					addTime={this.addTime}
					subtractTime={this.subtractTime}
					showView={this.showView}
					updateOn={updateOn}
					setDate={this.setDate}
					updateSelectedDate={this.updateSelectedDate}
					isValidDate={isValidDate}
					renderMonth={renderMonth}
				/>
			);
		} else if (viewMode === 'days') {
			if (isFunction(renderDays)) {
				return renderDays({
					classNames,
					viewDate,
					selectedDate,
					addTime: this.addTime,
					subtractTime: this.subtractTime,
					showView: this.showView,
					updateOn,
					setDate: this.setDate,
					updateSelectedDate: this.updateSelectedDate,
					isValidDate,
					renderDay,
					timeFormat,
				});
			}
			return (
				<DaysView
					classNames={classNames}
					viewDate={viewDate}
					selectedDate={selectedDate}
					addTime={this.addTime}
					subtractTime={this.subtractTime}
					showView={this.showView}
					updateOn={updateOn}
					setDate={this.setDate}
					updateSelectedDate={this.updateSelectedDate}
					isValidDate={isValidDate}
					renderDay={renderDay}
					timeFormat={timeFormat}
				/>
			);
		} else if (viewMode === 'time') {
			if (isFunction(renderTime)) {
				return renderTime({
					classNames,
					viewDate,
					selectedDate,
					setTime: this.setTime,
					timeFormat,
					dateFormat,
					showView: this.showView,
					timeConstraints,
				});
			}
			return (
				<TimeView
					classNames={classNames}
					viewDate={viewDate}
					selectedDate={selectedDate}
					setTime={this.setTime}
					timeFormat={timeFormat}
					dateFormat={dateFormat}
					showView={this.showView}
					timeConstraints={timeConstraints}
				/>
			);
		}
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { disabled, closeOnOutsideClick, DropdownProps } = this.props;
		const { opened } = this.state;

		return (
			<Dropdown
				{...DropdownProps}
				align="auto"
				getTriggerRef={this.getTriggerRef}
				renderTrigger={this.renderInput}
				content={this.renderCalendarHolder(classNames)}
				opened={disabled ? false : opened}
				onClose={this.closeCalendar}
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

DateTimePicker.propTypes = propTypes;

DateTimePicker.defaultProps = defaultProps;

DateTimePicker = WithLocale(DateTimePicker);

export default DateTimePicker;
