import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ArrowClock.less';

const propTypes = {
	classNames: PropTypes.object,

	time: PropTypes.object.isRequired, //moment instance
	live: PropTypes.bool, //if true time will update every second

	size: PropTypes.number,
	color: PropTypes.string,
	showSeconds: PropTypes.bool,
};

const defaultProps = {
	classNames: {},

	live: true,

	size: 100,
	color: '#000',
	showSeconds: true,
};

class ArrowClock extends Component {
	constructor(props) {
		super(props);

		this.interval = null;

		const { time } = props;
		this.time = time;

		this.state = {
			seconds: this.time.seconds(),
			minutes: this.time.minutes(),
			hours: this.time.hours(),
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { live } = this.props;
		if (live) {
			this.startInterval();
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.stopInterval();
		//</editor-fold>
	}

	/* ========================================================================*
   *
   *                     Events
   *
   * ========================================================================*/

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
		this.time.add(1, 'second');

		this.setState({
			seconds: this.time.seconds(),
			minutes: this.time.minutes(),
			hours: this.time.hours(),
		});
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

	renderClock = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderClock">
		const { seconds, minutes, hours } = this.state;

		const { color, showSeconds } = this.props;

		const second = 'rotate(' + seconds * 6 + ', 50, 50)';
		const minute = 'rotate(' + minutes * 6 + ', 50, 50)';
		const hour = 'rotate(' + (hours * 30 + minutes / 2) + ', 50, 50)';

		return (
			<svg className={classNames['wrapper']} viewBox="0 0 100 100">
				<circle
					className={classNames['face']}
					cx="50"
					cy="50"
					r="48"
					stroke={color}
				/>
				<circle
					className={classNames['center']}
					cx="50"
					cy="50"
					r="5"
					stroke={color}
				/>
				<g className={classNames['hands']}>
					<rect
						className={classNames['hour']}
						x="50"
						y="24"
						width="1"
						height="20"
						transform={hour}
						fill={color}
						stroke={color}
					/>
					<rect
						className={classNames['minute']}
						x="50"
						y="15"
						width="1"
						height="30"
						transform={minute}
						fill={color}
						stroke={color}
					/>
					{showSeconds && (
						<line
							className="ArrowClock__second"
							x1="50"
							y1="45"
							x2="50"
							y2="16"
							transform={second}
							fill={color}
							stroke={color}
						/>
					)}
				</g>
				<g className={classNames['ticks']} transform="translate(50,50)">
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(0)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(30)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(60)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(90)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(120)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(150)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(180)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(210)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(240)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(270)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(300)"
						fill={color}
						stroke={color}
					/>
					<line
						className={classNames['hour-tick']}
						x1="0"
						x2="0"
						y1="40"
						y2="45"
						transform="rotate(330)"
						fill={color}
						stroke={color}
					/>
				</g>
			</svg>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { size } = this.props;

		const style = {
			width: `${size}px`,
			height: `${size}px`,
		};

		return <div style={style}>{this.renderClock(classNames)}</div>;
	}
}

ArrowClock.propTypes = propTypes;

ArrowClock.defaultProps = defaultProps;

export default ArrowClock;
