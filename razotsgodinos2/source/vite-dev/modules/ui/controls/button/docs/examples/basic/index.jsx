import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'Button: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Button from 'ui/controls/button';

<Button
	title="Click me"
	onClick={({ event, Button }) => {
		console.log({
			onClick: {
				event,
				Button,
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
			<Button
				title="Click me"
				onClick={({ event, Button }) => {
					console.log({
						onClick: {
							event,
							Button,
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
