import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithMapContext from '../WithMapContext';

const evtNames = ['click', 'mouseover', 'recenter'];

const wrappedPromise = function() {
	let wrappedPromise = {},
		promise = new Promise(function(resolve, reject) {
			wrappedPromise.resolve = resolve;
			wrappedPromise.reject = reject;
		});
	wrappedPromise.then = promise.then.bind(promise);
	wrappedPromise.catch = promise.catch.bind(promise);
	wrappedPromise.promise = promise;

	return wrappedPromise;
};

const propTypes = {
	positions: PropTypes.array,
	gradient: PropTypes.array,
	radius: PropTypes.number,
	opacity: PropTypes.number,

	//from hoc
	mapContext: PropTypes.object,
};

evtNames.forEach(
	e => (propTypes[`on${_.upperFirst(_.camelCase(e))}`] = PropTypes.func),
);

const defaultProps = {
	radius: 20,
	opacity: 0.2,
};

class HeatMap extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.heatMapPromise = wrappedPromise();
		this.renderHeatMap();
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (
			this.props.mapContext !== prevProps.mapContext ||
			this.props.positions !== prevProps.positions
		) {
			if (this.heatMap) {
				this.heatMap.setMap(null);
				this.renderHeatMap();
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		if (this.heatMap) {
			this.heatMap.setMap(null);
		}
		//</editor-fold>
	}

	/* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

	handleEvent = evt => {
		//<editor-fold defaultstate="collapsed" desc="handleEvent">
		return e => {
			const evtName = `on${_.upperFirst(_.camelCase(evt))}`;
			if (this.props[evtName]) {
				this.props[evtName]({
					Map: this.props.mapContext.Map,
					HeatMap: this,
					event: e,
				});
			}
		};
		//</editor-fold>
	};

	getHeatMap = () => {
		//<editor-fold defaultstate="collapsed" desc="getHeatMap">
		return this.heatMapPromise;
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

	renderHeatMap = () => {
		//<editor-fold defaultstate="collapsed" desc="renderHeatMap">

		const map = this.props.mapContext.Map.map;
		const google = this.props.mapContext.Map.google;

		let { positions, gradient, radius, opacity } = this.props;

		if (!google) {
			return null;
		}

		positions = positions.map(pos => {
			return new google.maps.LatLng(pos.lat, pos.lng);
		});

		const pref = {
			map: map,
			data: positions,
		};

		this.heatMap = new google.maps.visualization.HeatmapLayer(pref);

		this.heatMap.set('gradient', gradient);

		this.heatMap.set('radius', radius);

		this.heatMap.set('opacity', opacity);

		evtNames.forEach(e => {
			this.heatMap.addListener(e, this.handleEvent(e));
		});

		this.heatMapPromise.resolve(this.heatMap);
		//</editor-fold>
	};

	render() {
		return null;
	}
}

HeatMap.propTypes = propTypes;

HeatMap.defaultProps = defaultProps;

HeatMap = WithMapContext(HeatMap);

export default HeatMap;
