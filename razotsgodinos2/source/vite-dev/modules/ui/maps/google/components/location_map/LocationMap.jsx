import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Map from 'ui/maps/google/components/map';
import Marker from 'ui/maps/google/components/marker';

const propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
	zoom: PropTypes.number,

	onLocationChanged: PropTypes.func,
	onZoomChanged: PropTypes.func,

	MarkerProps: PropTypes.object,
	MapProps: PropTypes.object,
};

const defaultProps = {
	lat: 0,
	lng: 0,
	zoom: 14,
};

class LocationMap extends Component {
	constructor(props) {
		super(props);
		this.map = React.createRef();

		const { lat, lng, zoom } = this.props;
		this.state = {
			lat: lat,
			lng: lng,
			zoom: zoom,
		};
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		const updatedState = {};

		_.forEach(['lat', 'lng', 'zoom'], key => {
			if (
				!_.isUndefined(prevProps[key]) &&
				prevProps[key] !== this.props[key]
			) {
				if (this.state[key] !== this.props[key]) {
					updatedState[key] = this.props[key];
				}
			}
		});

		if (!_g.isEmpty(updatedState)) {
			this.setState(updatedState);
		}
		//</editor-fold>
	}

	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	getLocation = () => {
		//<editor-fold defaultstate="collapsed" desc="getLocation">
		const { lat, lng, zoom } = this.state;

		return { lat, lng, zoom };
		//</editor-fold>
	};

	onZoomChanged = ({ Map }) => {
		//<editor-fold defaultstate="collapsed" desc="onZoomChanged">

		const zoom = Map.map.getZoom();

		this.setState({ zoom });

		const { onZoomChanged } = this.props;

		if (_.isFunction(onZoomChanged)) {
			onZoomChanged({ zoom, LocationMap: this });
		}
		//</editor-fold>
	};

	updatePosition = ({ event }) => {
		//<editor-fold defaultstate="collapsed" desc="updatePosition">
		const lat = event.latLng.lat();
		const lng = event.latLng.lng();

		this.setState({
			lat,
			lng,
		});

		const { onLocationChanged } = this.props;

		if (_.isFunction(onLocationChanged)) {
			onLocationChanged({ lat, lng, LocationMap: this });
		}
		//</editor-fold>
	};

	render() {
		const { MapProps, MarkerProps } = this.props;
		const { lat, lng, zoom } = this.state;

		return (
			<Map
				ref={this.map}
				initialCenter={{ lat, lng }}
				center={{ lat, lng }}
				zoom={zoom}
				style={{ height: '400px', width: '100%', position: 'relative' }}
				lang="en"
				gestureHandling="greedy" //allow to zoom with scrollwheel without ctrl
				onZoomChanged={this.onZoomChanged}
				{...MapProps}>
				<Marker
					draggable={true}
					onDragend={this.updatePosition}
					position={{ lat, lng }}
					{...MarkerProps}
				/>
			</Map>
		);
	}
}

LocationMap.propTypes = propTypes;

LocationMap.defaultProps = defaultProps;

export default LocationMap;
