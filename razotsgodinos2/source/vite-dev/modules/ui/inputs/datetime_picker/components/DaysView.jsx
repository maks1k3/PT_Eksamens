import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { capitalize, map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object.isRequired,

	viewDate: PropTypes.object.isRequired,
	selectedDate: PropTypes.any,
	addTime: PropTypes.func.isRequired,
	subtractTime: PropTypes.func.isRequired,
	showView: PropTypes.func.isRequired,

	updateOn: PropTypes.string.isRequired,
	setDate: PropTypes.func.isRequired,
	updateSelectedDate: PropTypes.func.isRequired,

	timeFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
		.isRequired,

	isValidDate: PropTypes.func,
	renderDay: PropTypes.func,
};

const defaultProps = {};

class DaysView extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Get a list of the days of the week
	 * depending on the current locale
	 * @return {array} A list with the shortname of the days
	 */
	getDaysOfWeek = (locale) => {
		//<editor-fold defaultstate="collapsed" desc="getDaysOfWeek">
		let days = locale._weekdaysMin,
			first = locale.firstDayOfWeek(),
			dow = [],
			i = 0;

		days.forEach(function (day) {
			dow[(7 + i++ - first) % 7] = day;
		});

		return dow;
		//</editor-fold>
	};

	renderDays = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDays">
		const { classNames } = this.props;
		let date = this.props.viewDate,
			selected = this.props.selectedDate && this.props.selectedDate.clone(),
			prevMonth = date.clone().subtract(1, 'months'),
			currentYear = date.year(),
			currentMonth = date.month(),
			weeks = [],
			days = [],
			renderer = this.props.renderDay || this.renderDay,
			isValid = this.props.isValidDate || this.alwaysValidDate,
			classes,
			isDisabled,
			dayProps,
			currentDate;

		// Go to the last week of the previous month
		prevMonth.date(prevMonth.daysInMonth()).startOf('week');
		let lastDay = prevMonth.clone().add(42, 'd');

		while (prevMonth.isBefore(lastDay)) {
			classes = `${classNames['rdtDay']} rdtDay`;
			currentDate = prevMonth.clone();

			if (
				(prevMonth.year() === currentYear &&
					prevMonth.month() < currentMonth) ||
				prevMonth.year() < currentYear
			)
				classes += ` ${classNames['rdtOld']} rdtOld`;
			else if (
				(prevMonth.year() === currentYear &&
					prevMonth.month() > currentMonth) ||
				prevMonth.year() > currentYear
			)
				classes += ` ${classNames['rdtNew']} rdtNew`;

			if (selected && prevMonth.isSame(selected, 'day'))
				classes += ` ${classNames['rdtActive']} rdtActive`;

			if (prevMonth.isSame(moment(), 'day'))
				classes += ` ${classNames['rdtToday']} rdtToday`;

			isDisabled = !isValid(currentDate, selected);
			if (isDisabled) classes += ` ${classNames['rdtDisabled']} rdtDisabled`;

			dayProps = {
				key: prevMonth.format('M_D'),
				'data-value': prevMonth.date(),
				className: classes,
			};

			if (!isDisabled) dayProps.onClick = this.updateSelectedDate;

			days.push(renderer(dayProps, currentDate, selected));

			if (days.length === 7) {
				weeks.push(<tr key={prevMonth.format('M_D')}>{days}</tr>);
				days = [];
			}

			prevMonth.add(1, 'd');
		}

		return weeks;
		//</editor-fold>
	};

	updateSelectedDate = (event) => {
		//<editor-fold defaultstate="collapsed" desc="updateSelectedDate">
		this.props.updateSelectedDate(event, true);
		//</editor-fold>
	};

	renderDay = (props, currentDate) => {
		//<editor-fold defaultstate="collapsed" desc="renderDay">
		return <td {...props}>{currentDate.date()}</td>;
		//</editor-fold>
	};

	renderFooter = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFooter">
		const { classNames, showView } = this.props;
		if (!this.props.timeFormat) {
			return null;
		}

		const date = this.props.selectedDate || this.props.viewDate;

		return (
			<tfoot>
				<tr>
					<td
						className={classNames['rdtTimeToggle']}
						onClick={() => {
							showView('time');
						}}
						colSpan="7">
						{date.format(this.props.timeFormat)}
					</td>
				</tr>
			</tfoot>
		);
		//</editor-fold>
	};

	alwaysValidDate = () => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		return 1;
		//</editor-fold>
	};

	renderDaysOfWeek = (locale) => {
		//<editor-fold defaultstate="collapsed" desc="renderDaysOfWeek">
		const { classNames } = this.props;

		const days = map(this.getDaysOfWeek(locale), (day, index) => {
			return (
				<th key={day + index} className={classNames['dow']}>
					{day}
				</th>
			);
		});
		return <tr>{days}</tr>;
		//</editor-fold>
	};

	render() {
		const { classNames, viewDate, subtractTime, addTime, showView } =
			this.props;
		const date = viewDate;
		const locale = date.localeData();

		return (
			<div className={classNames['rdtDays']}>
				<table>
					<thead>
						<tr>
							<th
								className={classNames['rdtPrev']}
								onClick={() => {
									subtractTime(1, 'months');
								}}>
								<span>‹</span>
							</th>
							<th
								className={classNames['rdtSwitch']}
								data-value={viewDate.month()}
								colSpan="5"
								onClick={() => {
									showView('months');
								}}>
								{capitalize(locale.months(date)) + ' ' + date.year()}
							</th>
							<th
								className={classNames['rdtNext']}
								onClick={() => {
									addTime(1, 'months');
								}}>
								<span>›</span>
							</th>
						</tr>
						{this.renderDaysOfWeek(locale)}
					</thead>
					<tbody>{this.renderDays()}</tbody>
					{this.renderFooter()}
				</table>
			</div>
		);
	}
}

DaysView.propTypes = propTypes;

DaysView.defaultProps = defaultProps;

export default DaysView;
