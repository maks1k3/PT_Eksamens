import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'Button: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Button from 'ui/controls/button';

<Button title="Disabled" disabled={true} />
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
				title="Disabled"
				disabled={true}
				onClick={({ event, Button }) => {
					console.log({
						onDisabledClick: {
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
