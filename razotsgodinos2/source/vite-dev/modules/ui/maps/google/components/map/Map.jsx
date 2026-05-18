import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from '../WithLocale';

import CircleLoader from 'ui/animation/spinners/circle_loader';
import ScriptsLoader from 'utils/ScriptsLoader';

import MapContext from '../MapContext';

import evtNames from '../eventNames';

const propTypes = {
	showLoader: PropTypes.bool,

	style: PropTypes.object,
	className: PropTypes.string,

	apiKey: PropTypes.string,
	lang: PropTypes.string,
	libraries: PropTypes.array,
	version: PropTypes.string,

	zoom: PropTypes.number,
	initialCenter: PropTypes.object,
	center: PropTypes.object,
	centerAroundCurrentLocation: PropTypes.bool,
	mapType: PropTypes.string,
	maxZoom: PropTypes.number,
	minZoom: PropTypes.number,
	clickableIcons: PropTypes.bool,
	disableDefaultUI: PropTypes.bool,
	zoomControl: PropTypes.bool,
	mapTypeControl: PropTypes.bool,
	scaleControl: PropTypes.bool,
	streetViewControl: PropTypes.bool,
	panControl: PropTypes.bool,
	rotateControl: PropTypes.bool,
	scrollwheel: PropTypes.bool,
	draggable: PropTypes.bool,
	keyboardShortcuts: PropTypes.bool,
	disableDoubleClickZoom: PropTypes.bool,
	noClear: PropTypes.bool,
	styles: PropTypes.array,
	gestureHandling: PropTypes.string,

	children: PropTypes.node,
};

evtNames.forEach(
	e => (propTypes[`on${_.upperFirst(_.camelCase(e))}`] = PropTypes.func),
);

const defaultProps = {
	showLoader: true,

	libraries: ['places', 'visualization'],
	version: '3',

	zoom: 14,
	initialCenter: {
		lat: 56.5515474,
		lng: 21.0388763,
	},
	center: {},
	centerAroundCurrentLocation: false,
	mapType: 'roadmap',
};

const makeCancelable = promise => {
	let hasCanceled_ = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then(
			val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
		);
		promise.catch(
			error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)),
		);
	});

	return {
		promise: wrappedPromise,
		cancel() {
			hasCanceled_ = true;
		},
	};
};

const mapStyle = {
	position: 'absolute',
	width: '100%',
	height: '100%',
	gestureHandling: 'auto',
};

class Map extends Component {
	constructor(props) {
		super(props);
		this.mapNode = React.createRef();

		const { initialCenter } = this.props;

		this.state = {
			loading: true,
			ready: false,
			currentLocation: {
				lat: initialCenter.lat,
				lng: initialCenter.lng,
			},
			context: {
				Map: this,
			},
		};
		this.listeners = {};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { centerAroundCurrentLocation } = this.props;

		if (centerAroundCurrentLocation) {
			if (navigator && navigator.geolocation) {
				this.geoPromise = makeCancelable(
					new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(resolve, reject);
					}),
				);

				this.geoPromise.promise
					.then(pos => {
						const coords = pos.coords;
						this.setState({
							currentLocation: {
								lat: coords.latitude,
								lng: coords.longitude,
							},
						});
					})
					.catch(e => e);
			}
		}

		this.loadScripts();
		//</editor-fold>
	}

	componentDidUpdate(prevProps, prevState) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

		if (this.props.zoom !== prevProps.zoom) {
			this.map.setZoom(this.props.zoom);
		}
		if (this.props.center !== prevProps.center) {
			this.setState({
				currentLocation: this.props.center,
			});
		}
		if (prevState.currentLocation !== this.state.currentLocation) {
			this.recenterMap();
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">

		if (this.google) {
			if (this.geoPromise) {
				this.geoPromise.cancel();
			}

			Object.keys(this.listeners).forEach(e => {
				this.google.maps.event.removeListener(this.listeners[e]);
			});
		}

		//</editor-fold>
	}

	onScriptsLoaded = () => {
		//<editor-fold defaultstate="collapsed" desc="onScriptsLoaded">
		this.init();
		//</editor-fold>
	};

	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	loadScripts = () => {
		//<editor-fold defaultstate="collapsed" desc="loadScripts">
		const { apiKey, lang, libraries, version } = this.props;
		let _apiKey = apiKey;
		let _lang = lang;

		if (_.isUndefined(_apiKey)) {
			if (!_.isUndefined(store)) {
				_apiKey = _.get(store.getState(), 'configuration.googleMaps.key');
			}
		}

		if (_.isUndefined(_lang)) {
			if (!_.isUndefined(store)) {
				_lang = _.get(store.getState(), 'configuration.googleMaps.lang');
			}
		}

		const params = $.param({
			key: _apiKey,
			language: _lang,
			libraries: libraries.join(','),
			version: version,
		});

		const url = `https://maps.googleapis.com/maps/api/js?${params}`;

		ScriptsLoader.load({
			js: {
				GoogleMaps: url,
			},
			onLoad: this.onScriptsLoaded,
		});
		//</editor-fold>
	};

	init = () => {
		//<editor-fold defaultstate="collapsed" desc="init">
		this.google = window.google;
		const maps = this.google.maps;

		const node = this.mapNode.current;
		const { currentLocation } = this.state;
		const center = new maps.LatLng(currentLocation.lat, currentLocation.lng);

		const mapTypeIds = this.google.maps.MapTypeId || {};
		const mapTypeFromProps = String(this.props.mapType).toUpperCase();

		const mapConfig = {
			mapTypeId: mapTypeIds[mapTypeFromProps],
			center: center,
			zoom: this.props.zoom,
			maxZoom: this.props.maxZoom,
			minZoom: this.props.minZoom,
			clickableIcons: this.props.clickableIcons,
			disableDefaultUI: this.props.disableDefaultUI,
			zoomControl: this.props.zoomControl,
			mapTypeControl: this.props.mapTypeControl,
			scaleControl: this.props.scaleControl,
			streetViewControl: this.props.streetViewControl,
			panControl: this.props.panControl,
			rotateControl: this.props.rotateControl,
			scrollwheel: this.props.scrollwheel,
			draggable: this.props.draggable,
			keyboardShortcuts: this.props.keyboardShortcuts,
			disableDoubleClickZoom: this.props.disableDoubleClickZoom,
			noClear: this.props.noClear,
			styles: this.props.styles,
			gestureHandling: this.props.gestureHandling,
		};

		Object.keys(mapConfig).forEach(key => {
			// Allow to configure mapConfig with 'false'
			if (_.isUndefined(mapConfig[key])) {
				delete mapConfig[key];
			}
		});

		this.map = new maps.Map(node, mapConfig);
		maps.event.trigger(this.map, 'ready');

		evtNames.forEach(e => {
			this.listeners[e] = this.map.addListener(e, this.handleEvent(e));
		});

		this.setState({
			ready: true,
			loading: false,
		});
		//</editor-fold>
	};

	handleEvent = evtName => {
		//<editor-fold defaultstate="collapsed" desc="handleEvent">
		let timeout;
		const handlerName = `on${_.upperFirst(_.camelCase(evtName))}`;

		return e => {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			timeout = setTimeout(() => {
				if (this.props[handlerName]) {
					this.props[handlerName]({ Map: this, event: e });
				}
			}, 0);
		};
		//</editor-fold>
	};

	recenterMap = () => {
		//<editor-fold defaultstate="collapsed" desc="recenterMap">
		const map = this.map;

		const google = this.google;
		const maps = google.maps;

		if (!google) return;

		if (map) {
			let center = this.state.currentLocation;
			if (!(center instanceof google.maps.LatLng)) {
				center = new google.maps.LatLng(center.lat, center.lng);
			}
			map.panTo(center);
			//map.setCenter(center);
			maps.event.trigger(map, 'recenter');
		}
		//</editor-fold>
	};

	restyleMap = () => {
		//<editor-fold defaultstate="collapsed" desc="restyleMap">
		if (this.map) {
			const google = this.google;
			google.maps.event.trigger(this.map, 'resize');
		}
		//</editor-fold>
	};

	/* ========================================================================*
  *
  *                     Renderers
  *
  * ========================================================================*/

	renderLoader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLoader">
		const { loading } = this.state;
		const { showLoader } = this.props;

		if (!showLoader) {
			return null;
		}

		if (!loading) {
			return null;
		}
		return <CircleLoader pageCenter={true} />;
		//</editor-fold>
	};

	renderChildren = () => {
		//<editor-fold defaultstate="collapsed" desc="renderChildren">
		const { ready } = this.state;

		if (!ready) {
			return null;
		}

		const { children } = this.props;

		if (!children) {
			return null;
		}

		return (
			<MapContext.Provider value={this.state.context}>
				{children}
			</MapContext.Provider>
		);
		//</editor-fold>
	};

	render() {
		const { style, className } = this.props;
		return (
			<div className={className} style={style}>
				{this.renderLoader()}
				<div ref={this.mapNode} style={mapStyle} />
				{this.renderChildren()}
			</div>
		);
	}
}

Map.propTypes = propTypes;

Map.defaultProps = defaultProps;

Map = WithLocale(Map);

export default Map;
