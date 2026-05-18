import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditLocation from 'ui/maps/google/components/edit_location';

const title = 'EditLocation: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditLocation from 'ui/maps/google/components/edit_location';

<EditLocation
	lat={56.95096612859509}
	lng={24.136962890625}
	zoom={10}
	onLocationChanged={({ lat, lng, EditLocation }) => {
		console.log('onLocationChanged:', { lat, lng, EditLocation });
	}}
	onZoomChanged={({ zoom, EditLocation }) => {
		console.log('onZoomChanged:', { zoom, EditLocation });
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
				lat={56.95096612859509}
				lng={24.136962890625}
				zoom={10}
				onLocationChanged={({ lat, lng, EditLocation }) => {
					console.log('onLocationChanged:', { lat, lng, EditLocation });
				}}
				onZoomChanged={({ zoom, EditLocation }) => {
					console.log('onZoomChanged:', { zoom, EditLocation });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
