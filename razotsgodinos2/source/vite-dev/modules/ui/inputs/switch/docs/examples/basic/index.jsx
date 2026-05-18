import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Switch from 'ui/inputs/switch';

const title = 'Switch: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Switch from 'ui/inputs/switch';

<Switch />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Switch />
		</ExampleHolder>
	);
};

export default Example;
