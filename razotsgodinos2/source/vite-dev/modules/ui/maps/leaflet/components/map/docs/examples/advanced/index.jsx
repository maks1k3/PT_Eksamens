import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer, Marker, Popup } from 'ui/maps/leaflet';

const title = 'Leaflet Map: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer, Marker, Popup } from 'ui/maps/leaflet';

<Map
	id="test_map"
	className="test_classname"
	whenReady={() => {
		console.log('whenReady');
	}}
	animate={true}
	center={{
		lat: 56.5047,
		lng: 21.0108,
	}}
	worldCopyJump={true}
	maxBounds={[[-90, -180], [90, 180]]}
	minZoom={2}
	maxZoom={12}
	noWrap={true}
	zoom={7}
	keyboard={true}
	dragging={true}
	scrollWheelZoom={true}
	doubleClickZoom={true}
	style={{ height: '400px', width: '100%', position: 'relative' }}>
	<TileLayer
		attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	/>
	<Marker position={[56.5047, 21.0108]}>
		<Popup>
			<span>
				A pretty CSS3 popup. <br /> Easily customizable.
			</span>
		</Popup>
	</Marker>
</Map>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Map
				id="test_map"
				className="test_classname"
				whenReady={() => {
					console.log('whenReady');
				}}
				animate={true}
				center={{
					lat: 56.5047,
					lng: 21.0108,
				}}
				worldCopyJump={true}
				maxBounds={[[-90, -180], [90, 180]]}
				minZoom={2}
				maxZoom={12}
				noWrap={true}
				zoom={7}
				keyboard={true}
				dragging={true}
				scrollWheelZoom={true}
				doubleClickZoom={true}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[56.5047, 21.0108]}>
					<Popup>
						<span>
							A pretty CSS3 popup. <br /> Easily customizable.
						</span>
					</Popup>
				</Marker>
			</Map>
		</ExampleHolder>
	);
};

export default Example;
