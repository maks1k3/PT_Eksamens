import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

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
	renderYear: PropTypes.func,
};

const defaultProps = {};

class YearsView extends Component {
	constructor(props) {
		super(props);
	}

	renderYears = year => {
		//<editor-fold defaultstate="collapsed" desc="renderYears">
		const { classNames } = this.props;
		let years = [],
			i = -1,
			rows = [],
			renderer = this.props.renderYear || this.renderYear,
			selectedDate = this.props.selectedDate,
			isValid = this.props.isValidDate || this.alwaysValidDate,
			classes,
			props,
			currentYear,
			isDisabled,
			noOfDaysInYear,
			daysInYear,
			validDay,
			// Month and date are irrelevant here because
			// we're only interested in the year
			irrelevantMonth = 0,
			irrelevantDate = 1;

		year--;
		while (i < 11) {
			classes = `${classNames['rdtYear']} rdtYear`;
			currentYear = this.props.viewDate
				.clone()
				.set({ year: year, month: irrelevantMonth, date: irrelevantDate });

			// Not sure what 'rdtOld' is for, commenting out for now as it's not working properly
			// if ( i === -1 | i === 10 )
			// classes += ' rdtOld';

			noOfDaysInYear = currentYear.endOf('year').format('DDD');
			daysInYear = Array.from({ length: noOfDaysInYear }, function(e, i) {
				return i + 1;
			});

			validDay = daysInYear.find(function(d) {
				let day = currentYear.clone().dayOfYear(d);
				return isValid(day);
			});

			isDisabled = validDay === undefined;

			if (isDisabled) classes += ` ${classNames['rdtDisabled']}`;

			if (selectedDate && selectedDate.year() === year)
				classes += ` ${classNames['rdtActive']}`;

			props = {
				key: year,
				'data-value': year,
				className: classes,
			};

			if (!isDisabled)
				props.onClick =
					this.props.updateOn === 'years'
						? this.updateSelectedYear
						: this.props.setDate('year');

			years.push(renderer(props, year, selectedDate && selectedDate.clone()));

			if (years.length === 4) {
				rows.push(<tr key={i}>{years}</tr>);
				years = [];
			}

			year++;
			i++;
		}

		return rows;
		//</editor-fold>
	};

	updateSelectedYear = event => {
		//<editor-fold defaultstate="collapsed" desc="updateSelectedYear">
		const { updateSelectedDate } = this.props;
		updateSelectedDate(event);
		//</editor-fold>
	};

	renderYear = (props, year) => {
		//<editor-fold defaultstate="collapsed" desc="renderYear">
		return <td {...props}>{year}</td>;
		//</editor-fold>
	};

	alwaysValidDate = () => {
		//<editor-fold defaultstate="collapsed" desc="alwaysValidDate">
		return 1;
		//</editor-fold>
	};

	render() {
		const {
			viewDate,
			classNames,
			subtractTime,
			showView,
			addTime,
		} = this.props;

		const year = parseInt(viewDate.year() / 10, 10) * 10;

		return (
			<div className={classNames['rdtYears']}>
				<table>
					<thead>
						<tr>
							<th
								className={classNames['rdtPrev']}
								onClick={() => {
									subtractTime(10, 'years');
								}}>
								<span>‹</span>
							</th>
							<th
								className={classNames['rdtSwitch']}
								colSpan="2"
								onClick={() => {
									showView('years');
								}}>
								{year + '-' + (year + 9)}
							</th>
							<th
								className={classNames['rdtNext']}
								onClick={() => {
									addTime(10, 'years');
								}}>
								<span>›</span>
							</th>
						</tr>
					</thead>
				</table>
				<table>
					<tbody>{this.renderYears(year)}</tbody>
				</table>
			</div>
		);
	}
}

YearsView.propTypes = propTypes;

YearsView.defaultProps = defaultProps;

export default YearsView;
