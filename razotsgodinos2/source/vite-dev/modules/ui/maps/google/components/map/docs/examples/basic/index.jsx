import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Map from 'ui/maps/google/components/map';

const title = 'Map: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Map from 'ui/maps/google/components/map';

<Map
	style={{ height: '400px', width: '100%', position: 'relative' }}
	zoom={14}
	initialCenter={{
		lat: 37.774929,
		lng: -122.419416,
	}}
/>
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
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
