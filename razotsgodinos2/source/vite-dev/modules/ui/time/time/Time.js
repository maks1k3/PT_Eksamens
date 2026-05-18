import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import 'moment-timezone';

const propTypes = {
	timeZone: PropTypes.string, //Australia/Sydney|Europe/Riga|America/New_York
	format: PropTypes.string, // valid moment.js time format default is 24hours
	live: PropTypes.bool, //if true time will update every second
};

const defaultProps = {
	timeZone: 'Europe/Riga',
	format: 'HH:mm:ss',
	live: true,
};

class Time extends Component {
	constructor(props) {
		super(props);

		this.mounted = false;
		this.interval = null;

		this.state = {
			time: this.getTime(),
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		const { live } = this.props;
		if (live) {
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

	startInterval = () => {
		//<editor-fold defaultstate="collapsed" desc="startInterval">
		if (this.interval === null) {
			this.interval = setInterval(() => this.onTick(), 1000);
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
			this.setState({
				time: this.getTime(),
			});
		}
		//</editor-fold>
	};

	getTime = () => {
		//<editor-fold defaultstate="collapsed" desc="getTime">
		const { timeZone, format } = this.props;
		return moment.tz(timeZone).format(format);
		//</editor-fold>
	};

	render() {
		const { time } = this.state;

		return time;
	}
}

Time.propTypes = propTypes;

Time.defaultProps = defaultProps;

export default Time;
