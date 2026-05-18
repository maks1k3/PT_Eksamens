import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Map from 'ui/maps/google/components/map';
import Marker from 'ui/maps/google/components/marker';

const title = 'Marker: customization';

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
		lat: 56.95096612859509,
		lng: 24.136962890625,
	}}>
	<Marker
		draggable={true}
		icon="https://maps.google.com/mapfiles/kml/shapes/library_maps.png"
		label="This is marker"
		onClick={({ Map, Marker, event }) => {
			console.log('onClick:', { Map, Marker, event });
		}}
		onDragend={({ Map, Marker, event }) => {
			console.log('onDragend:', { Map, Marker, event });
		}}
		onMouseOver={({ Map, Marker, event }) => {
			console.log('onMouseOver:', { Map, Marker, event });
		}}
		onRecenter={({ Map, Marker, event }) => {
			console.log('onRecenter:', { Map, Marker, event });
		}}
		position={{ lat: 56.95096612859509, lng: 24.136962890625 }}
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
				style={{ height: '400px', width: '100%', position: 'relative' }}
				zoom={14}
				initialCenter={{
					lat: 56.95096612859509,
					lng: 24.136962890625,
				}}>
				<Marker
					draggable={true}
					icon="https://maps.google.com/mapfiles/kml/shapes/library_maps.png"
					label="This is marker"
					onClick={({ Map, Marker, event }) => {
						console.log('onClick:', { Map, Marker, event });
					}}
					onDragend={({ Map, Marker, event }) => {
						console.log('onDragend:', { Map, Marker, event });
					}}
					onMouseOver={({ Map, Marker, event }) => {
						console.log('onMouseOver:', { Map, Marker, event });
					}}
					onRecenter={({ Map, Marker, event }) => {
						console.log('onRecenter:', { Map, Marker, event });
					}}
					position={{ lat: 56.95096612859509, lng: 24.136962890625 }}
				/>
			</Map>
		</ExampleHolder>
	);
};

export default Example;
