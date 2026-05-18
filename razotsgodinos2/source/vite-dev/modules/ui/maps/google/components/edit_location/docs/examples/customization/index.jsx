import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditLocation from 'ui/maps/google/components/edit_location';

import styles from './styles.less';

const title = 'EditLocation: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditLocation from 'ui/maps/google/components/edit_location';

<EditLocation
	classNames={styles}
	lat={56.95096612859509}
	lng={24.136962890625}
	zoom={10}
	onLocationChanged={({ lat, lng, EditLocation }) => {
		console.log('onLocationChanged:', { lat, lng, EditLocation });
	}}
	onZoomChanged={({ zoom, EditLocation }) => {
		console.log('onZoomChanged:', { zoom, EditLocation });
	}}
	AutoCompleteProps={{
		types: ['(cities)'],
	}}
	LocationMapProps={{
		MarkerProps: {
			icon:
				'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
		},
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
			<EditLocation
				classNames={styles}
				lat={56.95096612859509}
				lng={24.136962890625}
				zoom={10}
				onLocationChanged={({ lat, lng, EditLocation }) => {
					console.log('onLocationChanged:', { lat, lng, EditLocation });
				}}
				onZoomChanged={({ zoom, EditLocation }) => {
					console.log('onZoomChanged:', { zoom, EditLocation });
				}}
				AutoCompleteProps={{
					types: ['(cities)'],
				}}
				LocationMapProps={{
					MarkerProps: {
						icon:
							'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
					},
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
