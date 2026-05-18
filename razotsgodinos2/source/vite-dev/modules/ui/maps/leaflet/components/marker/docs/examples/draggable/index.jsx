import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer, Marker, Popup } from 'ui/maps/leaflet';

const title = 'Leaflet Marker: draggable';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer, Marker, Popup } from 'ui/maps/leaflet';

class Test extends Component {
	constructor(props) {
		super(props);

		this.marker = React.createRef();

		this.state = {
			center: {
				lat: 51.505,
				lng: -0.09,
			},
			marker: {
				lat: 51.505,
				lng: -0.09,
			},
			zoom: 13,
			draggable: true,
		};
	}

	toggleDraggable = () => {
		//<editor-fold defaultstate="collapsed" desc="toggleDraggable">
		this.setState({
			draggable: !this.state.draggable,
		});
		//</editor-fold>
	};

	updatePosition = () => {
		//<editor-fold defaultstate="collapsed" desc="updatePosition">
		const { lat, lng } = this.marker.current.leafletElement.getLatLng();
		this.setState({
			marker: { lat, lng },
		});
		//</editor-fold>
	};

	render() {
		const position = [this.state.center.lat, this.state.center.lng];
		const markerPosition = [this.state.marker.lat, this.state.marker.lng];

		return (
			<Map
				center={position}
				zoom={this.state.zoom}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Marker
					ref={this.marker}
					draggable={this.state.draggable}
					onDrag={e => {
						console.log('onDrag:', { e });
					}}
					onDragend={e => {
						console.log('onDragend:', { e });
						this.updatePosition();
					}}
					onDragstart={e => {
						console.log('onDragstart:', { e });
					}}
					onMovestart={e => {
						console.log('onMovestart:', { e });
					}}
					opacity={0.8}
					title="This is title"
					position={markerPosition}>
					<Popup minWidth={90}>
						<span onClick={this.toggleDraggable}>
							{this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
						</span>
					</Popup>
				</Marker>
			</Map>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.marker = React.createRef();

		this.state = {
			center: {
				lat: 51.505,
				lng: -0.09,
			},
			marker: {
				lat: 51.505,
				lng: -0.09,
			},
			zoom: 13,
			draggable: true,
		};
	}

	toggleDraggable = () => {
		//<editor-fold defaultstate="collapsed" desc="toggleDraggable">
		this.setState({
			draggable: !this.state.draggable,
		});
		//</editor-fold>
	};

	updatePosition = () => {
		//<editor-fold defaultstate="collapsed" desc="updatePosition">
		const { lat, lng } = this.marker.current.leafletElement.getLatLng();
		this.setState({
			marker: { lat, lng },
		});
		//</editor-fold>
	};

	render() {
		const position = [this.state.center.lat, this.state.center.lng];
		const markerPosition = [this.state.marker.lat, this.state.marker.lng];

		return (
			<Map
				center={position}
				zoom={this.state.zoom}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Marker
					ref={this.marker}
					draggable={this.state.draggable}
					onDrag={e => {
						console.log('onDrag:', { e });
					}}
					onDragend={e => {
						console.log('onDragend:', { e });
						this.updatePosition();
					}}
					onDragstart={e => {
						console.log('onDragstart:', { e });
					}}
					onMovestart={e => {
						console.log('onMovestart:', { e });
					}}
					opacity={0.8}
					title="This is title"
					position={markerPosition}>
					<Popup minWidth={90}>
						<span onClick={this.toggleDraggable}>
							{this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
						</span>
					</Popup>
				</Marker>
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
