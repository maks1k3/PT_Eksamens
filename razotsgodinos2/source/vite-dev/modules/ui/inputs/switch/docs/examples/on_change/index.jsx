import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Switch from 'ui/inputs/switch';

const title = 'Switch: onChange';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Switch from 'ui/inputs/switch';

<Switch
	onChange={({ value, Switch }) => {
		console.log('onChange:', { value, Switch });
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
			<Switch
				onChange={({ value, Switch }) => {
					console.log('onChange:', { value, Switch });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
