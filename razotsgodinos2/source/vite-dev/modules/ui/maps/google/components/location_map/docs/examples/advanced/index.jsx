import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import LocationMap from 'ui/maps/google/components/location_map';

const title = 'LocationMap: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import LocationMap from 'ui/maps/google/components/location_map';

<LocationMap
	MarkerProps={{
		icon:
			'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
	}}
	MapProps={{
		style: { height: '600px', width: '100%', position: 'relative' },
	}}
	lat={56.95096612859509}
	lng={24.136962890625}
	zoom={7}
	onLocationChanged={({ lat, lng, LocationMap }) => {
		console.log({
			onLocationChanged: {
				lat,
				lng,
				LocationMap,
			},
		});
	}}
	onZoomChanged={({ zoom, LocationMap }) => {
		console.log({
			onZoomChanged: {
				zoom,
				LocationMap,
			},
		});
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
			<LocationMap
				MarkerProps={{
					icon:
						'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
				}}
				MapProps={{
					style: { height: '600px', width: '100%', position: 'relative' },
				}}
				lat={56.95096612859509}
				lng={24.136962890625}
				zoom={7}
				onLocationChanged={({ lat, lng, LocationMap }) => {
					console.log({
						onLocationChanged: {
							lat,
							lng,
							LocationMap,
						},
					});
				}}
				onZoomChanged={({ zoom, LocationMap }) => {
					console.log({
						onZoomChanged: {
							zoom,
							LocationMap,
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
