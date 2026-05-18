import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Checkbox from 'ui/inputs/checkbox';

const title = 'Checkbox: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Checkbox from 'ui/inputs/checkbox';

<Checkbox />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Checkbox />
		</ExampleHolder>
	);
};

export default Example;
