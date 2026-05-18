import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Map from 'ui/maps/google/components/map';
import Marker from 'ui/maps/google/components/marker';
import InfoWindow from 'ui/maps/google/components/info_window';

const title = 'InfoWindow: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Map from 'ui/maps/google/components/map';
import Marker from 'ui/maps/google/components/marker';
import InfoWindow from 'ui/maps/google/components/info_window';

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfoWindow: false,
			activeMarker: {},
			selectedPlace: '',
		};
	}

	onMarkerClick = ({ Map, Marker, event }) => {
		//<editor-fold defaultstate="collapsed" desc="onMarkerClick">

		this.setState({
			selectedPlace: Marker.props.label,
			activeMarker: Marker.marker,
			showInfoWindow: true,
		});
		//</editor-fold>
	};

	onInfoWindowClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onInfoWindowClose">
		this.setState({
			showInfoWindow: false,
			activeMarker: null,
		});
		//</editor-fold>
	};

	onMapClicked = () => {
		//<editor-fold defaultstate="collapsed" desc="onMapClicked">
		if (this.state.showInfoWindow) {
			this.setState({
				showInfoWindow: false,
				activeMarker: null,
			});
		}
		//</editor-fold>
	};

	render() {
		const { selectedPlace, activeMarker, showInfoWindow } = this.state;

		return (
			<Map
				style={{ height: '400px', width: '100%', position: 'relative' }}
				zoom={14}
				onClick={this.onMapClicked}
				initialCenter={{
					lat: 37.774929,
					lng: -122.419416,
				}}>
				<Marker
					label="SOMA"
					onClick={this.onMarkerClick}
					position={{ lat: 37.778519, lng: -122.40564 }}
				/>
				<Marker
					label="Dolores park"
					onClick={this.onMarkerClick}
					position={{ lat: 37.759703, lng: -122.428093 }}
				/>

				<InfoWindow
					marker={activeMarker}
					visible={showInfoWindow}
					onClose={this.onInfoWindowClose}>
					<div>
						<h1>{selectedPlace}</h1>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfoWindow: false,
			activeMarker: {},
			selectedPlace: '',
		};
	}

	onMarkerClick = ({ Map, Marker, event }) => {
		//<editor-fold defaultstate="collapsed" desc="onMarkerClick">

		this.setState({
			selectedPlace: Marker.props.label,
			activeMarker: Marker.marker,
			showInfoWindow: true,
		});
		//</editor-fold>
	};

	onInfoWindowClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onInfoWindowClose">
		this.setState({
			showInfoWindow: false,
			activeMarker: null,
		});
		//</editor-fold>
	};

	onMapClicked = () => {
		//<editor-fold defaultstate="collapsed" desc="onMapClicked">
		if (this.state.showInfoWindow) {
			this.setState({
				showInfoWindow: false,
				activeMarker: null,
			});
		}
		//</editor-fold>
	};

	render() {
		const { selectedPlace, activeMarker, showInfoWindow } = this.state;

		return (
			<Map
				style={{ height: '400px', width: '100%', position: 'relative' }}
				zoom={14}
				onClick={this.onMapClicked}
				initialCenter={{
					lat: 37.774929,
					lng: -122.419416,
				}}>
				<Marker
					label="SOMA"
					onClick={this.onMarkerClick}
					position={{ lat: 37.778519, lng: -122.40564 }}
				/>
				<Marker
					label="Dolores park"
					onClick={this.onMarkerClick}
					position={{ lat: 37.759703, lng: -122.428093 }}
				/>

				<InfoWindow
					marker={activeMarker}
					visible={showInfoWindow}
					onClose={this.onInfoWindowClose}>
					<div>
						<h1>{selectedPlace}</h1>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Test />
		</ExampleHolder>
	);
};

export default Example;
