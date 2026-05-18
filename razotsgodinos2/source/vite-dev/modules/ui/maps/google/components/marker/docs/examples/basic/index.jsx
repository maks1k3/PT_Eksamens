import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Map from 'ui/maps/google/components/map';
import Marker from 'ui/maps/google/components/marker';

const title = 'Marker: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Map from 'ui/maps/google/components/map';		
import Marker from 'ui/maps/google/components/marker';

<Map
	style={{ height: '400px', width: '100%', position: 'relative' }}
	zoom={14}
	initialCenter={{
		lat: 37.774929,
		lng: -122.419416,
	}}>
	<Marker position={{ lat: 37.778519, lng: -122.40564 }} />
	<Marker position={{ lat: 37.759703, lng: -122.428093 }} />
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
				style={{ height: '400px', width: '100%', position: 'relative' }}
				zoom={14}
				initialCenter={{
					lat: 37.774929,
					lng: -122.419416,
				}}>
				<Marker position={{ lat: 37.778519, lng: -122.40564 }} />
				<Marker position={{ lat: 37.759703, lng: -122.428093 }} />
			</Map>
		</ExampleHolder>
	);
};

export default Example;
