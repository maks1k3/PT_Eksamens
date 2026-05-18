import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/maps/google/components/autocomplete';

const title = 'Google AutoComplete: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/maps/google/components/autocomplete';

<AutoComplete
	onLocationChange={({ location, place, AutoComplete }) => {
		console.log('onLocationChange:', {
			location,
			place,
			AutoComplete,
		});
	}}
	onChange={({ value }) => {
		console.log('onChange:', {
			value,
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
			<AutoComplete
				onLocationChange={({ location, place, AutoComplete }) => {
					console.log('onLocationChange:', {
						location,
						place,
						AutoComplete,
					});
				}}
				onChange={({ value }) => {
					console.log('onChange:', {
						value,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
