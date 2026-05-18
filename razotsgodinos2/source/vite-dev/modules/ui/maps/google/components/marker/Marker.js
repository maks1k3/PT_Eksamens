import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithMapContext from '../WithMapContext';

const evtNames = ['click', 'mouseover', 'recenter', 'dragend'];

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
	position: PropTypes.object,
	icon: PropTypes.any,
	draggable: PropTypes.bool,
	label: PropTypes.string,

	//from hoc
	mapContext: PropTypes.object,
};
evtNames.forEach(
	e => (propTypes[`on${_.upperFirst(_.camelCase(e))}`] = PropTypes.func),
);

const defaultProps = {};

class Marker extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.markerPromise = wrappedPromise();
		this.renderMarker();
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (
			this.props.mapContext !== prevProps.mapContext ||
			this.props.position !== prevProps.position
		) {
			if (this.marker) {
				this.marker.setMap(null);
			}
			this.renderMarker();
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		if (this.marker) {
			this.marker.setMap(null);
		}
		//</editor-fold>
	}

	/* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

	renderMarker = () => {
		//<editor-fold defaultstate="collapsed" desc="renderMarker">
		let { position, icon, label, draggable } = this.props;

		const map = this.props.mapContext.Map.map;
		const google = this.props.mapContext.Map.google;

		if (!google) {
			return null;
		}

		let pos = position;
		if (!(pos instanceof google.maps.LatLng)) {
			position = new google.maps.LatLng(pos.lat, pos.lng);
		}

		const pref = {
			map: map,
			position: position,
			icon: icon,
			label: label,
			draggable: draggable,
		};
		this.marker = new google.maps.Marker(pref);

		evtNames.forEach(e => {
			this.marker.addListener(e, this.handleEvent(e));
		});

		this.markerPromise.resolve(this.marker);
		//</editor-fold>
	};

	getMarker = () => {
		//<editor-fold defaultstate="collapsed" desc="getMarker">
		return this.markerPromise;
		//</editor-fold>
	};

	handleEvent = evt => {
		//<editor-fold defaultstate="collapsed" desc="handleEvent">

		return e => {
			const evtName = `on${_.upperFirst(_.camelCase(evt))}`;

			if (this.props[evtName]) {
				this.props[evtName]({
					Map: this.props.mapContext.Map,
					Marker: this,
					event: e,
				});
			}
		};
		//</editor-fold>
	};

	render() {
		return null;
	}
}

Marker.propTypes = propTypes;

Marker.defaultProps = defaultProps;

Marker = WithMapContext(Marker);

export default Marker;
