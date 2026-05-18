import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash-es';

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

	isValidDate: PropTypes.func,
	renderMonth: PropTypes.func,
};

const defaultProps = {};

class MonthsView extends Component {
	constructor(props) {
		super(props);
	}

	renderMonths = () => {
		//<editor-fold defaultstate="collapsed" desc="renderMonths">
		const { classNames } = this.props;
		let date = this.props.selectedDate,
			month = this.props.viewDate.month(),
			year = this.props.viewDate.year(),
			rows = [],
			i = 0,
			months = [],
			renderer = this.props.renderMonth || this.renderMonth,
			isValid = this.props.isValidDate || this.alwaysValidDate,
			classes,
			props,
			currentMonth,
			isDisabled,
			noOfDaysInMonth,
			daysInMonth,
			validDay,
			// Date is irrelevant because we're only interested in month
			irrelevantDate = 1;

		while (i < 12) {
			classes = `${classNames['rdtMonth']} rdtMonth`;
			currentMonth = this.props.viewDate
				.clone()
				.set({ year: year, month: i, date: irrelevantDate });

			noOfDaysInMonth = currentMonth.endOf('month').format('D');
			daysInMonth = Array.from({ length: noOfDaysInMonth }, function (e, i) {
				return i + 1;
			});

			validDay = daysInMonth.find(function (d) {
				let day = currentMonth.clone().set('date', d);
				return isValid(day);
			});

			isDisabled = validDay === undefined;

			if (isDisabled) classes += ` ${classNames['rdtDisabled']}`;

			if (date && i === date.month() && year === date.year())
				classes += ` ${classNames['rdtActive']}`;

			props = {
				key: i,
				'data-value': i,
				className: classes,
			};

			if (!isDisabled)
				props.onClick =
					this.props.updateOn === 'months'
						? this.updateSelectedMonth
						: this.props.setDate('month');

			months.push(renderer(props, i, year, date && date.clone()));

			if (months.length === 4) {
				rows.push(<tr key={month + '_' + rows.length}>{months}</tr>);
				months = [];
			}

			i++;
		}

		return rows;
		//</editor-fold>
	};

	updateSelectedMonth = (event) => {
		//<editor-fold defaultstate="collapsed" desc="updateSelectedMonth">
		this.props.updateSelectedDate(event);
		//</editor-fold>
	};

	renderMonth = (props, month) => {
		//<editor-fold defaultstate="collapsed" desc="renderMonth">
		const localMoment = this.props.viewDate;
		const monthStr = localMoment
			.localeData()
			.monthsShort(localMoment.month(month));
		const strLength = 3;
		// Because some months are up to 5 characters long, we want to
		// use a fixed string length for consistency
		const monthStrFixedLength = monthStr.substring(0, strLength);
		return <td {...props}>{capitalize(monthStrFixedLength)}</td>;
		//</editor-fold>
	};

	alwaysValidDate = () => {
		//<editor-fold defaultstate="collapsed" desc="alwaysValidDate">
		return 1;
		//</editor-fold>
	};

	render() {
		const { viewDate, classNames, subtractTime, showView, addTime } =
			this.props;

		return (
			<div className={classNames['rdtMonths']}>
				<table>
					<thead>
						<tr>
							<th
								className={classNames['rdtPrev']}
								onClick={() => {
									subtractTime(1, 'years');
								}}>
								<span>‹</span>
							</th>
							<th
								className={classNames['rdtSwitch']}
								colSpan="2"
								data-value={viewDate.year()}
								onClick={() => {
									showView('years');
								}}>
								{viewDate.year()}
							</th>
							<th
								className={classNames['rdtNext']}
								onClick={() => {
									addTime(1, 'years');
								}}>
								<span>›</span>
							</th>
						</tr>
					</thead>
				</table>
				<table>
					<tbody>{this.renderMonths()}</tbody>
				</table>
			</div>
		);
	}
}

MonthsView.propTypes = propTypes;

MonthsView.defaultProps = defaultProps;

export default MonthsView;
