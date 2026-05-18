import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer, Marker } from 'ui/maps/leaflet';
import Leaflet from 'leaflet';

const title = 'Leaflet Marker: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer, Marker } from 'ui/maps/leaflet';
import Leaflet from 'leaflet';

const myIcon = Leaflet.icon({
	iconUrl: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
	iconSize: [32, 32],
	// iconAnchor: [22, 94],
	// popupAnchor: [-3, -76],
	//shadowUrl: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
	//shadowSize: [68, 95],
	//shadowAnchor: [22, 94],
});

<Map
	center={{
		lat: 56.5047,
		lng: 21.0108,
	}}
	zoom={10}
	keyboard={true}
	dragging={true}
	scrollWheelZoom={true}
	doubleClickZoom={true}
	style={{ height: '400px', width: '100%', position: 'relative' }}>
	<TileLayer
		attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	/>
	<Marker position={[56.5047, 21.0108]} icon={myIcon} />
</Map>
  `,
};

const myIcon = Leaflet.icon({
	iconUrl: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
	iconSize: [32, 32],
	// iconAnchor: [22, 94],
	// popupAnchor: [-3, -76],
	//shadowUrl: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
	//shadowSize: [68, 95],
	//shadowAnchor: [22, 94],
});

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Map
				center={{
					lat: 56.5047,
					lng: 21.0108,
				}}
				zoom={10}
				keyboard={true}
				dragging={true}
				scrollWheelZoom={true}
				doubleClickZoom={true}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[56.5047, 21.0108]} icon={myIcon} />
			</Map>
		</ExampleHolder>
	);
};

export default Example;
