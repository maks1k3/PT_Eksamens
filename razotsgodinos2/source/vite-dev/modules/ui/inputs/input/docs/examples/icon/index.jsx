import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';

const title = 'Input: icon';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';

<Input icon={{ provider: 'fa', name: 'search' }} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Input icon={{ provider: 'fa', name: 'search' }} />
		</ExampleHolder>
	);
};

export default Example;
