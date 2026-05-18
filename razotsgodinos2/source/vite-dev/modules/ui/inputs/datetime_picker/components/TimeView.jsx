import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object.isRequired,

	viewDate: PropTypes.object.isRequired,
	selectedDate: PropTypes.any,
	setTime: PropTypes.func.isRequired,
	timeFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
		.isRequired,
	dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
		.isRequired,
	showView: PropTypes.func.isRequired,
	timeConstraints: PropTypes.object.isRequired,
};

const defaultProps = {};

const getInitialState = () => {
	return {
		counters: [],
		daypart: false,
		hours: '0',
		milliseconds: '000',
		minutes: '00',
		seconds: '00',
	};
};

class TimeView extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState();
		this.padValues = {
			hours: 1,
			minutes: 2,
			seconds: 2,
			milliseconds: 3,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		let me = this;
		me.timeConstraints = {
			hours: {
				min: 0,
				max: 23,
				step: 1,
			},
			minutes: {
				min: 0,
				max: 59,
				step: 1,
			},
			seconds: {
				min: 0,
				max: 59,
				step: 1,
			},
			milliseconds: {
				min: 0,
				max: 999,
				step: 1,
			},
		};
		['hours', 'minutes', 'seconds', 'milliseconds'].forEach(function (type) {
			Object.assign(me.timeConstraints[type], me.props.timeConstraints[type]);
		});
		this.setState(this.calculateState(this.props));
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps !== this.props) {
			this.setState(this.calculateState(this.props));
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	calculateState = (props) => {
		//<editor-fold defaultstate="collapsed" desc="calculateState">
		let date = props.selectedDate || props.viewDate,
			format = props.timeFormat,
			counters = [];

		if (format.toLowerCase().indexOf('h') !== -1) {
			counters.push('hours');
			if (format.indexOf('m') !== -1) {
				counters.push('minutes');
				if (format.indexOf('s') !== -1) {
					counters.push('seconds');
				}
			}
		}

		let daypart = false;
		if (
			this.state !== null &&
			this.props.timeFormat.toLowerCase().indexOf(' a') !== -1
		) {
			if (this.props.timeFormat.indexOf(' A') !== -1) {
				daypart = this.state.hours >= 12 ? 'PM' : 'AM';
			} else {
				daypart = this.state.hours >= 12 ? 'pm' : 'am';
			}
		}

		return {
			hours: date.format('H'),
			minutes: date.format('mm'),
			seconds: date.format('ss'),
			milliseconds: date.format('SSS'),
			daypart: daypart,
			counters: counters,
		};
		//</editor-fold>
	};

	updateMilli = (e) => {
		//<editor-fold defaultstate="collapsed" desc="updateMilli">
		let milli = parseInt(e.target.value, 10);

		//if ( milli === e.target.value && milli >= 0 && milli < 1000 ) {

		this.props.setTime('milliseconds', milli);
		this.setState({ milliseconds: milli });
		//}
		//</editor-fold>
	};

	onStartClicking = (action, type) => {
		//<editor-fold defaultstate="collapsed" desc="onStartClicking">
		const me = this;

		return function () {
			const update = {};
			update[type] = me[action](type);
			me.setState(update);

			me.timer = setTimeout(function () {
				me.increaseTimer = setInterval(function () {
					update[type] = me[action](type);
					me.setState(update);
				}, 70);
			}, 500);

			me.mouseUpListener = function () {
				clearTimeout(me.timer);
				clearInterval(me.increaseTimer);
				me.props.setTime(type, me.state[type]);
				document.body.removeEventListener('mouseup', me.mouseUpListener);
			};

			document.body.addEventListener('mouseup', me.mouseUpListener);
		};
		//</editor-fold>
	};

	toggleDayPart = (type) => {
		// type is always 'hours'
		//<editor-fold defaultstate="collapsed" desc="toggleDayPart">
		let value = parseInt(this.state[type], 10) + 12;
		if (value > this.timeConstraints[type].max) {
			value =
				this.timeConstraints[type].min +
				(value - (this.timeConstraints[type].max + 1));
		}

		return this.pad(type, value);
		//</editor-fold>
	};

	increase = (type) => {
		//<editor-fold defaultstate="collapsed" desc="increase">
		let value =
			parseInt(this.state[type], 10) + this.timeConstraints[type].step;
		if (value > this.timeConstraints[type].max) {
			value =
				this.timeConstraints[type].min +
				(value - (this.timeConstraints[type].max + 1));
		}
		return this.pad(type, value);
		//</editor-fold>
	};

	decrease = (type) => {
		//<editor-fold defaultstate="collapsed" desc="decrease">
		let value =
			parseInt(this.state[type], 10) - this.timeConstraints[type].step;
		if (value < this.timeConstraints[type].min) {
			value =
				this.timeConstraints[type].max +
				1 -
				(this.timeConstraints[type].min - value);
		}
		return this.pad(type, value);
		//</editor-fold>
	};

	pad = (type, value) => {
		//<editor-fold defaultstate="collapsed" desc="pad">
		let str = value + '';
		while (str.length < this.padValues[type]) {
			str = '0' + str;
		}
		return str;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderHeader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		const { classNames, showView, dateFormat, selectedDate, viewDate } =
			this.props;
		if (!dateFormat) {
			return null;
		}

		let date = selectedDate || viewDate;

		return (
			<thead>
				<tr>
					<th
						className={classNames['rdtSwitch']}
						colSpan="4"
						onClick={() => {
							showView('days');
						}}>
						{date.format(dateFormat)}
					</th>
				</tr>
			</thead>
		);
		//</editor-fold>
	};

	renderCounter = (type) => {
		//<editor-fold defaultstate="collapsed" desc="renderCounter">
		const { classNames } = this.props;
		if (type !== 'daypart') {
			let value = this.state[type];
			if (
				type === 'hours' &&
				this.props.timeFormat.toLowerCase().indexOf(' a') !== -1
			) {
				value = ((value - 1) % 12) + 1;

				if (value === 0) {
					value = 12;
				}
			}

			return (
				<div key={type} className={classNames['rdtCounter']}>
					<span
						onMouseDown={this.onStartClicking('increase', type)}
						className={classNames['rdtBtn']}>
						▲
					</span>
					<div className={classNames['rdtCount']}>{value}</div>
					<span
						onMouseDown={this.onStartClicking('decrease', type)}
						className={classNames['rdtBtn']}>
						▼
					</span>
				</div>
			);
		}
		return null;
		//</editor-fold>
	};

	renderDayPart = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDayPart">
		const { classNames } = this.props;

		const { daypart } = this.state;

		return (
			<div key="dayPart" className={classNames['rdtCounter']}>
				<span
					className={classNames['rdtBtn']}
					onMouseDown={this.onStartClicking('toggleDayPart', 'hours')}>
					▲
				</span>
				<div className={classNames['rdtCount']}>{daypart}</div>
				<span
					className={classNames['rdtBtn']}
					onMouseDown={this.onStartClicking('toggleDayPart', 'hours')}>
					▼
				</span>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const { classNames } = this.props;

		const counters = [];

		map(this.state.counters, (c) => {
			if (counters.length) {
				counters.push(
					<div
						key={'sep' + counters.length}
						className={classNames['rdtCounterSeparator']}>
						:
					</div>,
				);
			}
			counters.push(this.renderCounter(c));
		});

		if (this.state.daypart !== false) {
			counters.push(this.renderDayPart());
		}

		if (
			this.state.counters.length === 3 &&
			this.props.timeFormat.indexOf('S') !== -1
		) {
			counters.push(
				<div key={'sep5'} className={classNames['rdtCounterSeparator']}>
					:
				</div>,
			);
			counters.push(
				<div
					key="m"
					className={`${classNames['rdtCounter']} ${classNames['rdtMilli']}`}>
					<input
						value={this.state.milliseconds}
						type="text"
						onChange={this.updateMilli}
					/>
				</div>,
			);
		}

		return (
			<div className={classNames['rdtTime']}>
				<table>
					{this.renderHeader()}
					<tbody>
						<tr>
							<td>
								<div className={classNames['rdtCounters']}>{counters}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

TimeView.propTypes = propTypes;

TimeView.defaultProps = defaultProps;

export default TimeView;
