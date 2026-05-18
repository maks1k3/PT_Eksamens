import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'Button: icon';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Button from 'ui/controls/button';

<Button
	title="Button with icon"
	icon={{
		provider: 'icomoon',
		name: 'atom',
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
				title="Button with icon"
				icon={{
					provider: 'icomoon',
					name: 'atom',
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
