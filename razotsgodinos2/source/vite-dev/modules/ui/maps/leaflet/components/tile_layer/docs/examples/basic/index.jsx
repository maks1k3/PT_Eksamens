import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer } from 'ui/maps/leaflet';

const title = 'Leaflet TileLayer: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer } from 'ui/maps/leaflet';

<Map
	center={[51.505, -0.09]}
	zoom={13}
	style={{ height: '400px', width: '100%', position: 'relative' }}>
	<TileLayer
		attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	/>
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
				center={[51.505, -0.09]}
				zoom={13}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
			</Map>
		</ExampleHolder>
	);
};

export default Example;
