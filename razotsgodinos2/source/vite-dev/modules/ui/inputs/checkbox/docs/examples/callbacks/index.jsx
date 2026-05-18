import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Checkbox from 'ui/inputs/checkbox';

const title = 'Checkbox: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Checkbox from 'ui/inputs/checkbox';

<Checkbox
	onChange={({ value, Checkbox }) => {
		console.log('onChange:', { value, Checkbox });
	}}
	onFocus={({ value, event, Checkbox }) => {
		console.log('onFocus:', { value, event, Checkbox });
	}}
	onBlur={({ value, event, Checkbox }) => {
		console.log('onBlur:', { value, event, Checkbox });
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
			<Checkbox
				onChange={({ value, Checkbox }) => {
					console.log('onChange:', { value, Checkbox });
				}}
				onFocus={({ value, event, Checkbox }) => {
					console.log('onFocus:', { value, event, Checkbox });
				}}
				onBlur={({ value, event, Checkbox }) => {
					console.log('onBlur:', { value, event, Checkbox });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
