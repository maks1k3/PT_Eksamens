import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

const propTypes = {
	eventTime: PropTypes.number.isRequired, //unix time stamp 1366549200
	currentTime: PropTypes.number.isRequired, //unix time stamp 1366547400

	onFinish: PropTypes.func, //callback that will fire when countdown finishes

	render: PropTypes.func.isRequired,

	translations: PropTypes.object,

	speed: PropTypes.number, //number of milliseconds
};

const defaultProps = {
	speed: 1000,
};

class Countdown extends Component {
	constructor(props) {
		super(props);

		this.interval = null;

		this.init();

		this.state = this.getDuration();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		this.startInterval();
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (
			prevProps.eventTime !== this.props.eventTime ||
			prevProps.currentTime !== this.props.currentTime
		) {
			this.stopInterval();
			this.init();
			this.setState(this.getDuration());
			this.startInterval();
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		this.stopInterval();
		//</editor-fold>
	}

	init = () => {
		//<editor-fold defaultstate="collapsed" desc="init">
		const { eventTime, currentTime } = this.props;
		let diffTime = eventTime - currentTime;
		if (diffTime < 0) {
			diffTime = 0;
			console.error({ Countdown: 'diffTime < 0' });
		}
		this.duration = moment.duration(diffTime * 1000, 'milliseconds');
		this.timestamp = currentTime;
		//</editor-fold>
	};

	startInterval = () => {
		//<editor-fold defaultstate="collapsed" desc="startInterval">
		if (this.interval === null) {
			this.interval = setInterval(() => this.onTick(), this.props.speed);
		}
		//</editor-fold>
	};

	stopInterval = () => {
		//<editor-fold defaultstate="collapsed" desc="stopInterval">
		if (this.interval !== null) {
			clearInterval(this.interval);
			this.interval = null;
		}
		//</editor-fold>
	};

	onTick = () => {
		//<editor-fold defaultstate="collapsed" desc="onTick">
		if (this.mounted) {
			const { eventTime, onFinish } = this.props;
			this.duration = moment.duration(
				this.duration - this.props.speed,
				'milliseconds',
			);

			if (this.timestamp >= eventTime) {
				this.stopInterval();
				if (_.isFunction(onFinish)) {
					onFinish();
				}
				return;
			}

			this.timestamp++;

			this.setState(this.getDuration());
		}
		//</editor-fold>
	};

	getTranslations = type => {
		//<editor-fold defaultstate="collapsed" desc="getTranslations">
		const { translations } = this.props;
		if (type === 'years') {
			return _.get(translations, 'years', {
				nom: 'year',
				gen: 'years',
				plu: 'years',
			});
		} else if (type === 'months') {
			return _.get(translations, 'months', {
				nom: 'month',
				gen: 'months',
				plu: 'months',
			});
		} else if (type === 'weeks') {
			return _.get(translations, 'weeks', {
				nom: 'week',
				gen: 'weeks',
				plu: 'weeks',
			});
		} else if (type === 'days') {
			return _.get(translations, 'days', {
				nom: 'day',
				gen: 'days',
				plu: 'days',
			});
		} else if (type === 'hours') {
			return _.get(translations, 'hours', {
				nom: 'hour',
				gen: 'hours',
				plu: 'hours',
			});
		} else if (type === 'minutes') {
			return _.get(translations, 'minutes', {
				nom: 'minute',
				gen: 'minutes',
				plu: 'minutes',
			});
		} else if (type === 'seconds') {
			return _.get(translations, 'seconds', {
				nom: 'second',
				gen: 'seconds',
				plu: 'seconds',
			});
		}
		//</editor-fold>
	};

	getDuration = () => {
		//<editor-fold defaultstate="collapsed" desc="getDuration">
		const yearsTranslations = this.getTranslations('years');
		const years = this.duration.years();
		const yearsTitle = _g.units(years, yearsTranslations);
		const asYears = _.round(this.duration.asYears());
		const asYearsTitle = _g.units(asYears, yearsTranslations);

		const monthsTranslations = this.getTranslations('months');
		const months = this.duration.months();
		const monthsTitle = _g.units(months, monthsTranslations);
		const asMonths = _.round(this.duration.asMonths());
		const asMonthsTitle = _g.units(asMonths, monthsTranslations);

		const weeksTranslations = this.getTranslations('weeks');
		const weeks = this.duration.weeks();
		const weeksTitle = _g.units(weeks, weeksTranslations);
		const asWeeks = _.round(this.duration.asWeeks());
		const asWeeksTitle = _g.units(asWeeks, weeksTranslations);

		const daysTranslations = this.getTranslations('days');
		const days = this.duration.days();
		const daysTitle = _g.units(days, daysTranslations);
		const asDays = _.round(this.duration.asDays());
		const asDaysTitle = _g.units(asDays, daysTranslations);

		const hoursTranslations = this.getTranslations('hours');
		const hours = this.duration.hours();
		const hoursTitle = _g.units(hours, hoursTranslations);
		const asHours = _.round(this.duration.asHours());
		const asHoursTitle = _g.units(asHours, hoursTranslations);

		const minutesTranslations = this.getTranslations('minutes');
		const minutes = this.duration.minutes();
		const minutesTitle = _g.units(minutes, minutesTranslations);
		const asMinutes = _.round(this.duration.asMinutes());
		const asMinutesTitle = _g.units(asMinutes, minutesTranslations);

		const secondsTranslations = this.getTranslations('seconds');
		const seconds = this.duration.seconds();
		const secondsTitle = _g.units(seconds, secondsTranslations);
		const asSeconds = _.round(this.duration.asSeconds());
		const asSecondsTitle = _g.units(asSeconds, secondsTranslations);

		return {
			years,
			yearsTitle,
			asYears,
			asYearsTitle,
			months,
			monthsTitle,
			asMonths,
			asMonthsTitle,
			weeks,
			weeksTitle,
			asWeeks,
			asWeeksTitle,
			days,
			daysTitle,
			asDays,
			asDaysTitle,
			hours,
			hoursTitle,
			asHours,
			asHoursTitle,
			minutes,
			minutesTitle,
			asMinutes,
			asMinutesTitle,
			seconds,
			secondsTitle,
			asSeconds,
			asSecondsTitle,
		};
		//</editor-fold>
	};

	render() {
		const { render } = this.props;

		const {
			years,
			yearsTitle,
			asYears,
			asYearsTitle,
			months,
			monthsTitle,
			asMonths,
			asMonthsTitle,
			weeks,
			weeksTitle,
			asWeeks,
			asWeeksTitle,
			days,
			daysTitle,
			asDays,
			asDaysTitle,
			hours,
			hoursTitle,
			asHours,
			asHoursTitle,
			minutes,
			minutesTitle,
			asMinutes,
			asMinutesTitle,
			seconds,
			secondsTitle,
			asSeconds,
			asSecondsTitle,
		} = this.state;

		return render({
			years,
			yearsTitle,
			asYears,
			asYearsTitle,
			months,
			monthsTitle,
			asMonths,
			asMonthsTitle,
			weeks,
			weeksTitle,
			asWeeks,
			asWeeksTitle,
			days,
			daysTitle,
			asDays,
			asDaysTitle,
			hours,
			hoursTitle,
			asHours,
			asHoursTitle,
			minutes,
			minutesTitle,
			asMinutes,
			asMinutesTitle,
			seconds,
			secondsTitle,
			asSeconds,
			asSecondsTitle,
		});
	}
}

Countdown.propTypes = propTypes;

Countdown.defaultProps = defaultProps;

Countdown = WithLocale(Countdown);

export default Countdown;
